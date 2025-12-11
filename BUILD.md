# Guia de Compilação - Indexa

Este guia detalha como compilar o Indexa para diferentes plataformas.

## Compilação para Windows (MSI)

### Pré-requisitos

1. **Node.js 18+** - [Download](https://nodejs.org/)
2. **Rust 1.70+** - [Download](https://rustup.rs/)
3. **Microsoft C++ Build Tools** - [Download](https://visualstudio.microsoft.com/visual-cpp-build-tools/)
4. **WebView2** (geralmente já incluído no Windows 10/11)

### Passos

```bash
# 1. Instalar dependências
npm install

# 2. Compilar para release
npm run build

# 3. O instalador MSI estará em:
# src-tauri/target/release/bundle/msi/Indexa_0.1.0_x64_en-US.msi
```

### Notas Importantes

- A primeira compilação pode demorar 10-15 minutos
- Certifique-se de ter pelo menos 2GB de espaço em disco livre
- O processo de build baixa e compila todas as dependências do Rust

## Compilação para Linux (AppImage/DEB)

### Pré-requisitos

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y \
    libwebkit2gtk-4.0-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev \
    curl \
    wget \
    file

# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### Passos

```bash
# 1. Instalar dependências
npm install

# 2. Compilar para release
npm run build

# 3. Os pacotes estarão em:
# src-tauri/target/release/bundle/
```

### Configurar Targets no tauri.conf.json

Edite `src-tauri/tauri.conf.json` e altere a linha `"targets"`:

```json
"targets": ["deb", "appimage"]
```

## Compilação para macOS (DMG)

### Pré-requisitos

1. **Xcode Command Line Tools**:
   ```bash
   xcode-select --install
   ```

2. **Node.js 18+**:
   ```bash
   brew install node
   ```

3. **Rust**:
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```

### Passos

```bash
# 1. Instalar dependências
npm install

# 2. Compilar para release
npm run build

# 3. O DMG estará em:
# src-tauri/target/release/bundle/dmg/
```

### Configurar Targets no tauri.conf.json

Edite `src-tauri/tauri.conf.json` e altere a linha `"targets"`:

```json
"targets": ["dmg"]
```

## Modo Desenvolvimento

Para testar durante o desenvolvimento:

```bash
npm run dev
```

Isso iniciará o aplicativo em modo de desenvolvimento com hot-reload.

## Otimizações de Build

### Build Release Otimizado

O `Cargo.toml` já está configurado com otimizações:

```toml
[profile.release]
panic = "abort"
codegen-units = 1
lto = true
opt-level = "s"
strip = true
```

Estas configurações:
- Reduzem o tamanho do binário final
- Melhoram a performance
- Removem símbolos de debug

### Tamanho Final

- **Windows MSI**: ~15-20 MB
- **Linux AppImage**: ~20-25 MB
- **macOS DMG**: ~18-23 MB

## Troubleshooting

### Erro: "WebView2 not found" (Windows)

Instale o WebView2 Runtime:
```
https://developer.microsoft.com/microsoft-edge/webview2/
```

### Erro: "failed to run custom build command" (Linux)

Certifique-se de ter instalado todas as dependências do sistema:
```bash
sudo apt-get install -y libwebkit2gtk-4.0-dev libgtk-3-dev \
    libayatana-appindicator3-dev librsvg2-dev
```

### Build muito lento

Na primeira vez, o Rust compila todas as dependências. Builds subsequentes serão muito mais rápidos.

### Erro de memória durante build

Aumente a memória swap ou feche outros aplicativos durante a compilação.

## Build em CI/CD

### GitHub Actions (exemplo)

```yaml
name: Build

on:
  push:
    tags:
      - 'v*'

jobs:
  build-windows:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - uses: dtolnay/rust-toolchain@stable
      - run: npm install
      - run: npm run build
      - uses: actions/upload-artifact@v3
        with:
          name: windows-msi
          path: src-tauri/target/release/bundle/msi/*.msi
```

## Assinatura de Código

### Windows

Para assinar o MSI, você precisará de um certificado de code signing. Configure no `tauri.conf.json`:

```json
"windows": {
  "certificateThumbprint": "YOUR_CERT_THUMBPRINT",
  "digestAlgorithm": "sha256",
  "timestampUrl": "http://timestamp.digicert.com"
}
```

### macOS

Para distribuição na App Store ou fora dela, você precisará de um certificado Apple Developer:

```bash
# Assinar o app
codesign --deep --force --verify --verbose --sign "Developer ID Application: YOUR_NAME" ./target/release/bundle/macos/Indexa.app

# Notarizar (opcional, mas recomendado)
xcrun notarytool submit --apple-id "YOUR_EMAIL" --team-id "YOUR_TEAM_ID" --password "APP_SPECIFIC_PASSWORD" ./target/release/bundle/dmg/Indexa_0.1.0_x64.dmg
```

## Perguntas Frequentes

**Q: Posso criar um instalador universal para Windows?**
A: Sim, configure o target como `["msi", "nsis"]` no `tauri.conf.json`.

**Q: Como atualizo a versão do app?**
A: Atualize o campo `version` em `package.json` e `src-tauri/Cargo.toml`.

**Q: Posso compilar para outras plataformas?**
A: Você precisa compilar na plataforma de destino. Cross-compilation não é suportado pelo Tauri.
