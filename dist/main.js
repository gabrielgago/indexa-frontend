import { invoke } from '@tauri-apps/api/core';
import { open } from '@tauri-apps/plugin-dialog';

// State
let currentConfig = {
    folders: [],
    extensions: []
};

let searchTimeout = null;

// DOM Elements
const mainScreen = document.getElementById('mainScreen');
const settingsScreen = document.getElementById('settingsScreen');
const settingsBtn = document.getElementById('settingsBtn');
const backBtn = document.getElementById('backBtn');
const searchInput = document.getElementById('searchInput');
const resultsGrid = document.getElementById('resultsGrid');
const resultsCount = document.getElementById('resultsCount');
const foldersList = document.getElementById('foldersList');
const extensionsList = document.getElementById('extensionsList');
const addFolderBtn = document.getElementById('addFolderBtn');
const addExtensionBtn = document.getElementById('addExtensionBtn');
const extensionInput = document.getElementById('extensionInput');
const saveSettingsBtn = document.getElementById('saveSettingsBtn');

// Initialize
async function init() {
    try {
        currentConfig = await invoke('get_config');
        console.log('Config loaded:', currentConfig);
        
        // Show configuration screen if no folders are configured
        if (currentConfig.folders.length === 0) {
            showSettings();
        }
    } catch (error) {
        console.error('Error loading config:', error);
        showError('Erro ao carregar configurações');
    }
}

// Navigation
function showSettings() {
    mainScreen.style.display = 'none';
    settingsScreen.style.display = 'block';
    renderSettings();
}

function showMain() {
    settingsScreen.style.display = 'none';
    mainScreen.style.display = 'block';
}

// Settings rendering
function renderSettings() {
    // Render folders
    foldersList.innerHTML = '';
    if (currentConfig.folders.length === 0) {
        foldersList.innerHTML = '<p style="color: var(--text-secondary); font-size: 14px;">Nenhuma pasta configurada</p>';
    } else {
        currentConfig.folders.forEach((folder, index) => {
            const folderItem = document.createElement('div');
            folderItem.className = 'folder-item';
            folderItem.innerHTML = `
                <span>${escapeHtml(folder)}</span>
                <button data-index="${index}" class="remove-folder-btn">
                    <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            `;
            const removeBtn = folderItem.querySelector('.remove-folder-btn');
            removeBtn.addEventListener('click', () => removeFolder(index));
            foldersList.appendChild(folderItem);
        });
    }

    // Render extensions
    extensionsList.innerHTML = '';
    if (currentConfig.extensions.length === 0) {
        extensionsList.innerHTML = '<p style="color: var(--text-secondary); font-size: 14px;">Nenhuma extensão configurada</p>';
    } else {
        currentConfig.extensions.forEach((ext, index) => {
            const extTag = document.createElement('div');
            extTag.className = 'extension-tag';
            extTag.innerHTML = `
                <span>.${escapeHtml(ext)}</span>
                <button data-index="${index}" class="remove-ext-btn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            `;
            const removeBtn = extTag.querySelector('.remove-ext-btn');
            removeBtn.addEventListener('click', () => removeExtension(index));
            extensionsList.appendChild(extTag);
        });
    }
}

// Add folder
async function addFolder() {
    try {
        const selected = await open({
            directory: true,
            multiple: false,
            title: 'Selecione uma pasta para indexar'
        });

        if (selected) {
            if (!currentConfig.folders.includes(selected)) {
                currentConfig.folders.push(selected);
                renderSettings();
            }
        }
    } catch (error) {
        console.error('Error selecting folder:', error);
        showError('Erro ao selecionar pasta');
    }
}

// Remove folder
function removeFolder(index) {
    currentConfig.folders.splice(index, 1);
    renderSettings();
}

// Add extension
function addExtension() {
    const ext = extensionInput.value.trim().toLowerCase().replace('.', '');
    if (ext && !currentConfig.extensions.includes(ext)) {
        currentConfig.extensions.push(ext);
        extensionInput.value = '';
        renderSettings();
    }
}

// Remove extension
function removeExtension(index) {
    currentConfig.extensions.splice(index, 1);
    renderSettings();
}

// Save settings
async function saveSettings() {
    try {
        await invoke('update_config', { config: currentConfig });
        console.log('Config saved');
        showMain();
        showSuccess('Configurações salvas com sucesso!');
    } catch (error) {
        console.error('Error saving config:', error);
        showError('Erro ao salvar configurações');
    }
}

// Search
async function performSearch(query) {
    if (!query || query.trim() === '') {
        resultsGrid.innerHTML = '';
        resultsCount.textContent = 'Digite algo para começar a busca';
        return;
    }

    if (currentConfig.folders.length === 0) {
        resultsGrid.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 8V12M12 16H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <h3>Configure as pastas primeiro</h3>
                <p>Vá em Configurações para adicionar pastas para buscar</p>
            </div>
        `;
        resultsCount.textContent = '';
        return;
    }

    resultsCount.textContent = 'Buscando...';
    
    try {
        const results = await invoke('search_files', { query });
        renderResults(results);
    } catch (error) {
        console.error('Error searching:', error);
        showError('Erro ao buscar arquivos');
        resultsGrid.innerHTML = '';
        resultsCount.textContent = 'Erro na busca';
    }
}

// Render results
function renderResults(results) {
    resultsGrid.innerHTML = '';
    
    if (results.length === 0) {
        resultsGrid.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <h3>Nenhum resultado encontrado</h3>
                <p>Tente usar outros termos de busca</p>
            </div>
        `;
        resultsCount.textContent = 'Nenhum resultado encontrado';
        return;
    }

    resultsCount.textContent = `${results.length} resultado${results.length !== 1 ? 's' : ''} encontrado${results.length !== 1 ? 's' : ''}`;
    
    results.forEach(result => {
        const card = createResultCard(result);
        resultsGrid.appendChild(card);
    });
}

// Create result card
function createResultCard(result) {
    const card = document.createElement('div');
    card.className = 'result-card';
    
    const ext = result.name.split('.').pop().substring(0, 3).toUpperCase();
    const preview = escapeHtml(result.preview.substring(0, 200));
    const highlight = escapeHtml(result.highlight.substring(0, 100));
    
    card.innerHTML = `
        <div class="result-header">
            <div class="result-icon">${ext}</div>
            <div class="result-info">
                <div class="result-name" title="${escapeHtml(result.name)}">${escapeHtml(result.name)}</div>
                <div class="result-path" title="${escapeHtml(result.path)}">${escapeHtml(result.path)}</div>
            </div>
        </div>
        <div class="result-preview">
            <div class="result-highlight">${highlight}</div>
        </div>
        <div class="result-actions">
            <button class="btn-view" data-file-path="${escapeHtml(result.path)}">
                <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 12S5 4 12 4C19 4 23 12 23 12S19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Visualizar Arquivo
            </button>
        </div>
    `;
    
    // Add click handler to the button
    const viewBtn = card.querySelector('.btn-view');
    viewBtn.addEventListener('click', () => {
        openFile(viewBtn.getAttribute('data-file-path'));
    });
    
    return card;
}

// Open file
async function openFile(path) {
    try {
        await invoke('open_file', { path });
    } catch (error) {
        console.error('Error opening file:', error);
        showError('Erro ao abrir arquivo');
    }
}

// Utility functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showError(message) {
    // Simple error display - could be enhanced with a toast notification
    console.error(message);
    alert(message);
}

function showSuccess(message) {
    // Simple success display - could be enhanced with a toast notification
    console.log(message);
    alert(message);
}

// Event listeners
settingsBtn.addEventListener('click', showSettings);
backBtn.addEventListener('click', showMain);

searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        performSearch(e.target.value);
    }, 300);
});

addFolderBtn.addEventListener('click', addFolder);
addExtensionBtn.addEventListener('click', addExtension);

extensionInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addExtension();
    }
});

saveSettingsBtn.addEventListener('click', saveSettings);

// Initialize app
init();
