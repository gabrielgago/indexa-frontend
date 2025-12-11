# Guia do Desenvolvedor - Indexa

Este documento contém informações técnicas para desenvolvedores que desejam contribuir ou entender a arquitetura do projeto.

## Arquitetura

### Visão Geral

Indexa é uma aplicação desktop construída com:
- **Frontend**: HTML/CSS/JavaScript puro (sem frameworks)
- **Backend**: Rust com Tauri
- **Comunicação**: Tauri IPC (Inter-Process Communication)

```
┌─────────────────────────────────────┐
│         Frontend (WebView)          │
│     HTML + CSS + JavaScript         │
│                                     │
│  - Interface de Usuário             │
│  - Gerenciamento de Estado         │
│  - Chamadas à API Tauri            │
└──────────────┬──────────────────────┘
               │ Tauri IPC
               │
┌──────────────▼──────────────────────┐
│         Backend (Rust)              │
│                                     │
│  - Gerenciamento de Config          │
│  - Sistema de Busca                 │
│  - I/O de Arquivos                  │
│  - Integração com SO                │
└─────────────────────────────────────┘
```

## Estrutura de Código

### Frontend (`dist/`)

#### `index.html`
Interface principal da aplicação com duas telas:
- **Main Screen**: Busca e resultados
- **Settings Screen**: Configuração de pastas e extensões

#### `styles.css`
Design system baseado em Windows 11:
- Variáveis CSS para cores e espaçamentos
- Sistema de componentes reutilizáveis
- Responsive design
- Animações suaves

#### `main.js`
Lógica da aplicação:
- Gerenciamento de estado
- Comunicação com backend via `@tauri-apps/api`
- Renderização de componentes
- Debounce de busca (300ms)

### Backend (`src-tauri/src/`)

#### `main.rs`
Backend Rust com as seguintes responsabilidades:

**Estruturas de Dados:**
```rust
AppConfig {
    folders: Vec<String>,      // Pastas para indexar
    extensions: Vec<String>,   // Extensões permitidas
}

SearchResult {
    name: String,              // Nome do arquivo
    path: String,              // Caminho completo
    preview: String,           // Preview do conteúdo
    highlight: String,         // Linha com match
}
```

**Comandos Tauri:**
- `get_config()`: Retorna configuração atual
- `update_config(config)`: Atualiza configuração
- `search_files(query)`: Busca arquivos
- `open_file(path)`: Abre arquivo no SO

## Fluxo de Dados

### 1. Inicialização

```
App Start → init() → get_config() → Render Settings or Main
```

### 2. Busca de Arquivos

```
User Input → Debounce (300ms) → search_files(query) → 
  → WalkDir recursivo → 
  → Filtrar por extensão → 
  → Match em nome/conteúdo → 
  → Gerar preview → 
  → Retornar resultados → 
  → Renderizar cards
```

### 3. Atualização de Configuração

```
User adds folder/extension → 
  → Update local state → 
  → Render UI → 
  → save_settings() → 
  → update_config() → 
  → Persist in memory
```

## Componentes Principais

### Sistema de Busca

A busca é implementada em `search_files()`:

1. **Validação**: Verifica se query não está vazia
2. **Iteração**: Usa `WalkDir` para percorrer diretórios (max depth: 10)
3. **Filtragem**: 
   - Por tipo de arquivo (apenas files)
   - Por extensão (se configurado)
4. **Matching**:
   - Primeiro: busca no nome do arquivo
   - Segundo: busca no conteúdo (arquivos de texto)
5. **Preview**: Lê primeiras 5 linhas do arquivo
6. **Highlight**: Encontra primeira linha com match
7. **Limite**: Retorna no máximo 50 resultados

### Gerenciamento de Estado

Estado é gerenciado em dois níveis:

**Frontend (JavaScript):**
```javascript
let currentConfig = {
    folders: [],
    extensions: []
};
```

**Backend (Rust):**
```rust
struct AppState {
    config: Mutex<AppConfig>,
}
```

O estado backend é persistente durante a execução da aplicação.

## Padrões de Código

### Frontend

- **ES6+**: Use sintaxe moderna (arrow functions, const/let, async/await)
- **Sem frameworks**: JavaScript vanilla para manter simplicidade
- **Componentização**: Funções para criar elementos reutilizáveis
- **Error handling**: Try/catch em todas as operações assíncronas

### Backend

- **Rust idiomático**: Use padrões Rust (Result, Option, iterators)
- **Error handling**: Retorne `Result<T, String>` para comandos Tauri
- **Thread safety**: Use `Mutex` para estado compartilhado
- **Performance**: Use iterators e evite alocações desnecessárias

## Otimizações

### Performance

1. **Debounce de busca**: 300ms para evitar buscas excessivas
2. **Limite de resultados**: Máximo 50 resultados
3. **Profundidade limitada**: Max depth 10 níveis
4. **Preview limitado**: Apenas 5 primeiras linhas
5. **Lazy rendering**: Cards são criados sob demanda

### Tamanho do Bundle

1. **LTO habilitado**: Link-Time Optimization
2. **Strip symbols**: Remove símbolos de debug
3. **Opt-level "s"**: Otimiza para tamanho
4. **Code splitting**: Não necessário (app pequeno)

## Testes

### Testar Frontend

```bash
# Abrir em navegador (sem backend)
python -m http.server 8000
# Acesse http://localhost:8000/dist/
```

### Testar Backend

```bash
# Testes unitários Rust
cd src-tauri
cargo test
```

### Teste de Integração

```bash
# Modo desenvolvimento
npm run dev
```

## Debugging

### Frontend

1. Abra DevTools no app: `Ctrl+Shift+I` (Windows/Linux) ou `Cmd+Option+I` (Mac)
2. Console logs estão disponíveis
3. Breakpoints funcionam normalmente

### Backend

1. Logs do Rust aparecem no terminal quando executando `npm run dev`
2. Use `println!()` ou `dbg!()` para debug
3. Para debug avançado, use `rust-lldb` ou `rust-gdb`

## Extensões Futuras

### Sugestões de Features

1. **Indexação em Background**
   - Worker thread para indexar arquivos
   - Cache de metadados para busca rápida
   - Atualização incremental

2. **Busca Avançada**
   - Operadores booleanos (AND, OR, NOT)
   - Busca por data de modificação
   - Busca por tamanho de arquivo
   - Regex support

3. **UI Melhorada**
   - Tema escuro/claro
   - Atalhos de teclado
   - Preview de arquivos (imagens, PDFs)
   - Drag & drop para adicionar pastas

4. **Persistência**
   - Salvar configuração em arquivo
   - Histórico de buscas
   - Favoritos

### Arquitetura para Indexação

Para implementar indexação em background:

```rust
use std::sync::Arc;
use tokio::sync::RwLock;

struct Index {
    files: Arc<RwLock<Vec<FileMetadata>>>,
}

struct FileMetadata {
    path: PathBuf,
    name: String,
    modified: SystemTime,
    content_hash: Option<String>,
}

impl Index {
    async fn build(&self, paths: &[PathBuf]) {
        // Background indexing
    }
    
    async fn search(&self, query: &str) -> Vec<SearchResult> {
        // Search in index
    }
}
```

## Contribuindo

### Processo

1. Fork o repositório
2. Crie uma branch (`git checkout -b feature/amazing-feature`)
3. Commit suas mudanças (`git commit -m 'Add amazing feature'`)
4. Push para a branch (`git push origin feature/amazing-feature`)
5. Abra um Pull Request

### Guidelines

- Escreva código limpo e bem documentado
- Mantenha o estilo consistente com o código existente
- Adicione comentários para lógica complexa
- Teste suas mudanças antes de submeter PR
- Atualize documentação se necessário

### Code Review

Pull Requests serão revisados considerando:
- Qualidade do código
- Performance
- Segurança
- Compatibilidade
- Documentação

## Recursos

### Documentação Oficial

- [Tauri Docs](https://tauri.app/)
- [Rust Book](https://doc.rust-lang.org/book/)
- [MDN Web Docs](https://developer.mozilla.org/)

### Ferramentas Úteis

- **rust-analyzer**: LSP para Rust
- **Prettier**: Formatação de código JS/CSS
- **rustfmt**: Formatação de código Rust
- **clippy**: Linter para Rust

## Licença

MIT License - veja LICENSE para detalhes.
