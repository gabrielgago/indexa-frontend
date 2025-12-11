// Prevents additional console window on Windows in release
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize};
use std::collections::HashSet;
use std::fs;
use std::path::{Path, PathBuf};
use std::sync::Mutex;
use tauri::State;
use walkdir::WalkDir;

#[derive(Debug, Clone, Serialize, Deserialize)]
struct AppConfig {
    folders: Vec<String>,
    extensions: Vec<String>,
}

impl Default for AppConfig {
    fn default() -> Self {
        Self {
            folders: Vec::new(),
            extensions: vec![
                "txt".to_string(),
                "md".to_string(),
                "rs".to_string(),
                "js".to_string(),
                "ts".to_string(),
                "html".to_string(),
                "css".to_string(),
                "json".to_string(),
                "toml".to_string(),
                "yaml".to_string(),
            ],
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
struct SearchResult {
    name: String,
    path: String,
    preview: String,
    highlight: String,
}

struct AppState {
    config: Mutex<AppConfig>,
}

#[tauri::command]
fn get_config(state: State<AppState>) -> Result<AppConfig, String> {
    let config = state.config.lock().map_err(|e| e.to_string())?;
    Ok(config.clone())
}

#[tauri::command]
fn update_config(state: State<AppState>, config: AppConfig) -> Result<(), String> {
    let mut app_config = state.config.lock().map_err(|e| e.to_string())?;
    *app_config = config;
    Ok(())
}

#[tauri::command]
fn search_files(state: State<AppState>, query: String) -> Result<Vec<SearchResult>, String> {
    if query.trim().is_empty() {
        return Ok(Vec::new());
    }

    let config = state.config.lock().map_err(|e| e.to_string())?;
    let mut results = Vec::new();
    let query_lower = query.to_lowercase();
    
    let extensions: HashSet<String> = config.extensions.iter().cloned().collect();

    for folder in &config.folders {
        let path = Path::new(folder);
        if !path.exists() {
            continue;
        }

        for entry in WalkDir::new(path)
            .max_depth(10)
            .into_iter()
            .filter_map(|e| e.ok())
        {
            if !entry.file_type().is_file() {
                continue;
            }

            let file_path = entry.path();
            let file_name = file_path
                .file_name()
                .and_then(|n| n.to_str())
                .unwrap_or("");

            // Check if file extension matches
            let extension_matches = if let Some(ext) = file_path.extension() {
                let ext_str = ext.to_str().unwrap_or("");
                extensions.is_empty() || extensions.contains(ext_str)
            } else {
                extensions.is_empty()
            };

            if !extension_matches {
                continue;
            }

            // Check if filename matches query
            if !file_name.to_lowercase().contains(&query_lower) {
                // Also search in file content for text files
                if let Ok(content) = fs::read_to_string(file_path) {
                    if !content.to_lowercase().contains(&query_lower) {
                        continue;
                    }
                } else {
                    continue;
                }
            }

            // Read preview
            let preview = read_file_preview(file_path, &query_lower);
            let highlight = extract_highlight(&preview, &query_lower);

            results.push(SearchResult {
                name: file_name.to_string(),
                path: file_path.to_string_lossy().to_string(),
                preview,
                highlight,
            });

            // Limit results
            if results.len() >= 50 {
                break;
            }
        }

        if results.len() >= 50 {
            break;
        }
    }

    Ok(results)
}

fn read_file_preview(path: &Path, _query: &str) -> String {
    match fs::read_to_string(path) {
        Ok(content) => {
            let lines: Vec<&str> = content.lines().take(5).collect();
            lines.join("\n")
        }
        Err(_) => String::from("[Binary file or unable to read]"),
    }
}

fn extract_highlight(preview: &str, query: &str) -> String {
    let lines: Vec<&str> = preview.lines().collect();
    for line in lines {
        if line.to_lowercase().contains(query) {
            return line.to_string();
        }
    }
    preview.lines().next().unwrap_or("").to_string()
}

#[tauri::command]
async fn open_file(path: String) -> Result<(), String> {
    #[cfg(target_os = "windows")]
    {
        std::process::Command::new("cmd")
            .args(["/C", "start", "", &path])
            .spawn()
            .map_err(|e| e.to_string())?;
    }
    
    #[cfg(target_os = "macos")]
    {
        std::process::Command::new("open")
            .arg(&path)
            .spawn()
            .map_err(|e| e.to_string())?;
    }
    
    #[cfg(target_os = "linux")]
    {
        std::process::Command::new("xdg-open")
            .arg(&path)
            .spawn()
            .map_err(|e| e.to_string())?;
    }
    
    Ok(())
}

fn main() {
    let app_state = AppState {
        config: Mutex::new(AppConfig::default()),
    };

    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .manage(app_state)
        .invoke_handler(tauri::generate_handler![
            get_config,
            update_config,
            search_files,
            open_file
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
