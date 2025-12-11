# Indexa - File Search Application

Uma aplicação minimalista de busca de arquivos com interface inspirada no Windows 11 e Copilot, construída com Tauri.

## Características

- **Interface Minimalista**: Design moderno inspirado no Windows 11 e Microsoft Copilot
- **Busca em Tempo Real**: Busca instantânea enquanto você digita
- **Configuração Flexível**: Configure pastas e extensões de arquivo para indexar
- **Cards Elegantes**: Resultados exibidos em cards com preview e highlight
- **Visualização Nativa**: Abra arquivos diretamente no aplicativo padrão do sistema
- **Instalador MSI**: Distribuição simples através de instalador Windows

## Screenshots

### Tela Principal
A tela principal apresenta um campo de busca centralizado com resultados exibidos em cards elegantes.

### Tela de Configuração
Configure as pastas que deseja indexar e as extensões de arquivo suportadas.

## Tecnologias

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Rust (Tauri)
- **Busca**: Walkdir + Regex
- **Empacotamento**: Tauri (MSI para Windows)

## Pré-requisitos

Para compilar o projeto, você precisará:

- **Node.js** 18+ e npm
- **Rust** 1.70+ e Cargo
- **Sistema Operacional**: Windows, macOS ou Linux

### Dependências do Sistema (Windows)

Para compilar no Windows, instale:
- Microsoft C++ Build Tools
- WebView2 (geralmente já incluído no Windows 10/11)

### Dependências do Sistema (Linux - apenas para desenvolvimento)

```bash
sudo apt-get update
sudo apt-get install -y \
    libwebkit2gtk-4.0-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev
```

### Dependências do Sistema (macOS)

Nenhuma dependência adicional necessária além do Xcode Command Line Tools.

## Instalação e Desenvolvimento

### 1. Clonar o Repositório

```bash
git clone https://github.com/gabrielgago/indexa-frontend.git
cd indexa-frontend
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Executar em Modo Desenvolvimento

```bash
npm run dev
```

### 4. Compilar para Produção

Para criar o instalador MSI:

```bash
npm run build
```

O instalador MSI será gerado em `src-tauri/target/release/bundle/msi/`.

## Uso

### Primeira Execução

1. Ao iniciar o aplicativo pela primeira vez, você será direcionado para a tela de Configuração
2. Adicione as pastas que deseja indexar usando o botão "Adicionar Pasta"
3. Configure as extensões de arquivo que deseja buscar (ex: txt, pdf, docx)
4. Clique em "Salvar Configurações"

### Buscando Arquivos

1. Digite sua consulta no campo "O que você está procurando?"
2. Os resultados aparecem em tempo real enquanto você digita
3. Cada card exibe:
   - Nome do arquivo
   - Caminho completo
   - Preview do conteúdo
   - Linha com destaque da busca
4. Clique em "Visualizar Arquivo" para abrir o arquivo no aplicativo padrão

### Configurações

- Clique no botão "Configurações" no canto superior direito
- Adicione ou remova pastas para indexação
- Adicione ou remova extensões de arquivo
- As configurações são salvas imediatamente

## Estrutura do Projeto

```
indexa-frontend/
├── dist/                   # Frontend HTML/CSS/JS
│   ├── index.html         # Interface principal
│   ├── styles.css         # Estilos Windows 11/Copilot
│   └── main.js            # Lógica do frontend
├── src-tauri/             # Backend Rust
│   ├── src/
│   │   └── main.rs        # Backend Tauri com API de busca
│   ├── icons/             # Ícones da aplicação
│   ├── Cargo.toml         # Dependências Rust
│   └── tauri.conf.json    # Configuração do Tauri
├── package.json           # Dependências Node.js
└── README.md
```

## API do Backend

### `get_config()`
Retorna a configuração atual (pastas e extensões).

### `update_config(config: AppConfig)`
Atualiza a configuração da aplicação.

### `search_files(query: string)`
Realiza busca nos arquivos configurados.
- Busca por nome de arquivo
- Busca no conteúdo de arquivos de texto
- Retorna até 50 resultados
- Limita profundidade de busca a 10 níveis

### `open_file(path: string)`
Abre o arquivo no aplicativo padrão do sistema operacional.

## Personalização

### Modificar Cores

Edite as variáveis CSS em `dist/styles.css`:

```css
:root {
    --primary: #0067C0;
    --background: #F3F3F3;
    /* ... outras variáveis ... */
}
```

### Ajustar Limite de Resultados

Em `src-tauri/src/main.rs`, modifique:

```rust
if results.len() >= 50 {  // Altere este número
    break;
}
```

### Profundidade de Busca

Em `src-tauri/src/main.rs`, modifique:

```rust
WalkDir::new(path)
    .max_depth(10)  // Altere este número
```

## Solução de Problemas

### Erro: "Nenhuma pasta configurada"
- Vá em Configurações e adicione pelo menos uma pasta para indexar

### Busca muito lenta
- Reduza o número de pastas configuradas
- Limite as extensões de arquivo
- Reduza a profundidade de busca no código

### Instalador não foi criado
- Certifique-se de que está executando no Windows para gerar MSI
- Verifique se todas as dependências estão instaladas

## Contribuição

Contribuições são bem-vindas! Por favor:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT.

## Roadmap

- [ ] Filtros avançados de busca
- [ ] Histórico de buscas
- [ ] Atalhos de teclado
- [ ] Temas personalizáveis (claro/escuro)
- [ ] Suporte para busca em arquivos PDF e Office
- [ ] Exportar resultados de busca
- [ ] Indexação em segundo plano
- [ ] Cache de resultados

## Contato

Gabriel Gago - [@gabrielgago](https://github.com/gabrielgago)

Link do Projeto: [https://github.com/gabrielgago/indexa-frontend](https://github.com/gabrielgago/indexa-frontend)