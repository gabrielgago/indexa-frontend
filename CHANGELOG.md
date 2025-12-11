# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [0.1.0] - 2025-12-11

### Adicionado
- Interface de usuário minimalista inspirada em Windows 11 e Copilot
- Tela principal com campo de busca em tempo real
- Tela de configuração para gerenciar pastas e extensões
- Sistema de busca de arquivos em tempo real
- Cards elegantes para exibição de resultados
- Preview de conteúdo dos arquivos
- Highlight da linha com match da busca
- Botão "Visualizar Arquivo" para abrir arquivos nativamente
- Suporte para múltiplas pastas de indexação
- Filtro por extensões de arquivo configuráveis
- Limite de 50 resultados por busca
- Profundidade máxima de busca de 10 níveis
- Debounce de 300ms na busca para melhor performance
- Documentação completa (README, BUILD, DEVELOPER, EXEMPLOS)
- Configuração para build de instalador MSI
- Otimizações de release (LTO, strip, opt-level)
- Ícones placeholder para a aplicação

### Backend (Rust)
- Comando `get_config()` para obter configuração
- Comando `update_config()` para atualizar configuração
- Comando `search_files()` para busca de arquivos
- Comando `open_file()` para abrir arquivos no SO
- Sistema de gerenciamento de estado com Mutex
- Busca recursiva com WalkDir
- Suporte para busca em nome e conteúdo de arquivos
- Preview automático (5 primeiras linhas)
- Extração de highlight da busca

### Frontend (HTML/CSS/JS)
- Interface responsiva com grid adaptativo
- Debounce na busca para evitar sobrecarga
- Navegação entre telas (Main/Settings)
- Gerenciamento local de estado
- Renderização dinâmica de resultados
- Sistema de notificações (alert simples)
- Escape de HTML para segurança
- Validação de entrada

### Configuração
- Extensões padrão: txt, md, rs, js, ts, html, css, json, toml, yaml
- Janela inicial: 1000x700
- Tema baseado em Windows 11
- Build otimizado para tamanho

## [Unreleased]

### Planejado
- [ ] Tema escuro/claro
- [ ] Atalhos de teclado customizáveis
- [ ] Histórico de buscas
- [ ] Favoritos/Bookmarks
- [ ] Persistência de configuração em arquivo
- [ ] Busca avançada com operadores booleanos
- [ ] Filtros por data de modificação
- [ ] Filtros por tamanho de arquivo
- [ ] Preview de imagens inline
- [ ] Preview de PDFs
- [ ] Exportar resultados (CSV, JSON)
- [ ] Indexação em background
- [ ] Cache de resultados
- [ ] Busca por regex
- [ ] Ordenação de resultados
- [ ] Paginação de resultados
- [ ] Estatísticas de busca
- [ ] Suporte multi-idioma
- [ ] Auto-atualização

### Em Consideração
- [ ] Sincronização com serviços de nuvem
- [ ] Compartilhamento de configurações
- [ ] Plugin system
- [ ] Extensão para navegadores
- [ ] API REST local
- [ ] Mobile app (React Native?)
- [ ] Web version

## Notas de Versão

### v0.1.0 - Release Inicial

Esta é a primeira versão pública do Indexa. Inclui todas as funcionalidades básicas para uma aplicação de busca de arquivos funcional e eficiente.

**Destaques:**
- Interface moderna e minimalista
- Busca em tempo real
- Configuração flexível
- Multiplataforma (Windows, macOS, Linux)
- Instalador MSI para Windows

**Limitações Conhecidas:**
- Sem persistência de configuração (perde ao fechar)
- Busca limitada a 50 resultados
- Sem suporte para busca em PDFs/Office
- Sem indexação em background
- Preview limitado a arquivos de texto

**Próximos Passos:**
- Implementar persistência de configuração
- Adicionar tema escuro
- Melhorar performance com indexação

## Como Contribuir

Veja [DEVELOPER.md](DEVELOPER.md) para detalhes sobre como contribuir com o projeto.

## Histórico de Mudanças

Para ver o histórico completo de commits, visite:
https://github.com/gabrielgago/indexa-frontend/commits/main

---

### Convenções de Versionamento

- **MAJOR**: Mudanças incompatíveis na API
- **MINOR**: Funcionalidades adicionadas de forma retrocompatível
- **PATCH**: Correções de bugs retrocompatíveis

### Categorias de Mudanças

- **Adicionado**: Para novas funcionalidades
- **Modificado**: Para mudanças em funcionalidades existentes
- **Descontinuado**: Para funcionalidades que serão removidas
- **Removido**: Para funcionalidades removidas
- **Corrigido**: Para correções de bugs
- **Segurança**: Para correções de vulnerabilidades
