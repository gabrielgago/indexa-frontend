# Quick Start - Indexa

Guia rápido para começar a usar o Indexa em menos de 5 minutos!

## Para Usuários

### Windows

1. **Download**
   - Baixe o instalador MSI da [página de releases](https://github.com/gabrielgago/indexa-frontend/releases)
   - `Indexa_0.1.0_x64_en-US.msi`

2. **Instalação**
   - Execute o arquivo MSI
   - Siga o assistente de instalação
   - Clique em "Finalizar"

3. **Primeiro Uso**
   ```
   1. Abra o Indexa
   2. Clique em "Adicionar Pasta"
   3. Selecione uma pasta (ex: C:\Users\Você\Documents)
   4. Clique em "Salvar Configurações"
   5. Digite algo na busca
   6. Pronto! 🎉
   ```

### Linux

1. **Download**
   - AppImage: `Indexa_0.1.0_amd64.AppImage`
   - DEB: `indexa_0.1.0_amd64.deb`

2. **Instalação**
   
   **AppImage:**
   ```bash
   chmod +x Indexa_0.1.0_amd64.AppImage
   ./Indexa_0.1.0_amd64.AppImage
   ```

   **DEB (Ubuntu/Debian):**
   ```bash
   sudo dpkg -i indexa_0.1.0_amd64.deb
   ```

3. **Primeiro Uso**
   - Igual ao Windows acima

### macOS

1. **Download**
   - Baixe o DMG: `Indexa_0.1.0_x64.dmg`

2. **Instalação**
   - Abra o DMG
   - Arraste o Indexa para Applications
   - Abra o Indexa

3. **Primeiro Uso**
   - Igual ao Windows acima

## Para Desenvolvedores

### Pré-requisitos

```bash
# Verificar instalações
node --version  # Precisa 18+
npm --version
cargo --version # Precisa 1.70+
```

### Instalação Rápida

```bash
# 1. Clonar repositório
git clone https://github.com/gabrielgago/indexa-frontend.git
cd indexa-frontend

# 2. Instalar dependências
npm install

# 3. Executar em desenvolvimento
npm run dev
```

Pronto! O aplicativo abrirá automaticamente.

### Build para Produção

```bash
npm run build
```

O instalador estará em `src-tauri/target/release/bundle/`

## Uso Básico

### 1. Configurar Pastas

```
Tela inicial → Configurações → Adicionar Pasta
```

Exemplos de pastas úteis:
- `C:\Users\Você\Documents` (Windows)
- `/home/você/documentos` (Linux)
- `/Users/você/Documents` (macOS)

### 2. Configurar Extensões

Extensões padrão já incluídas:
- Código: `js`, `ts`, `rs`, `html`, `css`
- Documentos: `txt`, `md`
- Config: `json`, `toml`, `yaml`

Para adicionar mais:
```
Configurações → Digite extensão → Adicionar
```

Exemplos úteis:
- Documentos Office: `docx`, `xlsx`, `pptx`
- Código: `py`, `java`, `cpp`, `go`
- Dados: `csv`, `xml`, `sql`

### 3. Buscar Arquivos

```
Digite na busca → Resultados aparecem automaticamente
```

Exemplos de buscas:
- `README` - Encontra READMEs
- `TODO` - Encontra TODOs no código
- `config` - Encontra arquivos de configuração
- `bug` - Encontra menções a bugs

### 4. Abrir Arquivos

```
Resultado → Visualizar Arquivo
```

O arquivo abre no aplicativo padrão do sistema.

## Dicas Rápidas

### ⚡ Performance

- Adicione apenas pastas necessárias
- Use filtros de extensão específicos
- Evite indexar pastas grandes (ex: C:\)

### 🔍 Busca Eficiente

- Use termos específicos
- Busca é case-insensitive
- Busca em nome E conteúdo do arquivo

### ⌨️ Atalhos

- `Ctrl+Shift+I` - Abrir DevTools (para debug)
- `Esc` - Limpar busca
- `Tab` - Navegar entre elementos

## Troubleshooting Rápido

### "Nenhuma pasta configurada"

**Solução:** Configure pelo menos uma pasta nas Configurações

### Busca muito lenta

**Solução:** Reduza número de pastas ou adicione filtros de extensão

### Arquivo não abre

**Solução:** Configure um aplicativo padrão para a extensão no SO

## Recursos

- **Documentação Completa:** [README.md](README.md)
- **Guia de Build:** [BUILD.md](BUILD.md)
- **Exemplos:** [EXEMPLOS.md](EXEMPLOS.md)
- **Para Devs:** [DEVELOPER.md](DEVELOPER.md)
- **Issues:** [GitHub Issues](https://github.com/gabrielgago/indexa-frontend/issues)

## Próximos Passos

Depois de dominar o básico:

1. ✅ Explore as configurações avançadas
2. ✅ Experimente diferentes combinações de busca
3. ✅ Configure atalhos do sistema para o Indexa
4. ✅ Contribua com o projeto!

## Contribuir

Quer ajudar a melhorar o Indexa?

```bash
# 1. Fork o projeto
# 2. Crie uma branch
git checkout -b feature/minha-feature

# 3. Faça suas mudanças
# 4. Commit
git commit -m 'Adiciona feature incrível'

# 5. Push
git push origin feature/minha-feature

# 6. Abra um Pull Request
```

Veja [DEVELOPER.md](DEVELOPER.md) para mais detalhes.

## Suporte

Precisa de ajuda?

- 📖 Leia a [documentação](README.md)
- 🐛 Reporte bugs nas [Issues](https://github.com/gabrielgago/indexa-frontend/issues)
- 💬 Inicie uma [Discussion](https://github.com/gabrielgago/indexa-frontend/discussions)
- ⭐ Dê uma estrela no projeto!

## Roadmap

Próximas features planejadas:

- [ ] Tema escuro
- [ ] Histórico de buscas
- [ ] Atalhos customizáveis
- [ ] Preview de imagens/PDFs
- [ ] Indexação em background

Acompanhe o progresso no [CHANGELOG.md](CHANGELOG.md)

---

**Pronto para começar? Baixe agora e comece a buscar! 🚀**
