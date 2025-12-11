# Exemplo de Uso - Indexa

Este documento demonstra como usar o Indexa após a instalação.

## Primeira Execução

### 1. Configuração Inicial

Ao abrir o Indexa pela primeira vez, você será direcionado automaticamente para a tela de Configurações.

**Passo 1: Adicionar Pastas**
```
1. Clique em "Adicionar Pasta"
2. Navegue até a pasta que deseja indexar (ex: C:\Users\SeuUsuario\Documents)
3. Selecione a pasta
4. Repita para adicionar mais pastas
```

**Passo 2: Configurar Extensões**
```
O aplicativo já vem com extensões padrão:
- txt, md, rs, js, ts, html, css, json, toml, yaml

Para adicionar mais extensões:
1. Digite a extensão (sem o ponto) no campo de texto
2. Clique em "Adicionar"
3. Para remover, clique no X ao lado da extensão
```

**Passo 3: Salvar**
```
Clique em "Salvar Configurações"
```

### 2. Realizando Buscas

**Busca Simples**
```
1. Na tela principal, digite no campo "O que você está procurando?"
2. A busca começa automaticamente enquanto você digita
3. Resultados aparecem em tempo real
```

**Exemplos de Busca:**
- `README` - Encontra todos os arquivos com "README" no nome
- `function` - Encontra arquivos que contêm a palavra "function"
- `TODO` - Encontra TODOs em seu código
- `erro` - Encontra logs ou arquivos com "erro"

### 3. Visualizando Resultados

Cada resultado mostra:
- **Ícone**: Extensão do arquivo (ex: TXT, MD, JS)
- **Nome**: Nome completo do arquivo
- **Caminho**: Localização completa no disco
- **Preview**: Primeiras linhas do arquivo
- **Highlight**: Linha onde o termo foi encontrado

### 4. Abrindo Arquivos

```
Clique em "Visualizar Arquivo" para abrir o arquivo no aplicativo padrão:
- .txt → Notepad ou editor de texto padrão
- .js → VS Code (se configurado como padrão)
- .pdf → Adobe Reader ou visualizador PDF padrão
- .jpg → Visualizador de imagens padrão
```

## Casos de Uso

### Caso 1: Desenvolvedor procurando código

**Cenário**: Você precisa encontrar onde definiu uma função específica.

```
Configuração:
- Pastas: C:\projetos
- Extensões: js, ts, jsx, tsx, py, java, rs

Busca: "calculateTotal"

Resultado: Encontra todos os arquivos que contêm essa função
```

### Caso 2: Busca em documentação

**Cenário**: Procurar informações em arquivos de documentação.

```
Configuração:
- Pastas: C:\Users\Você\Documents
- Extensões: md, txt, pdf, docx

Busca: "instalação"

Resultado: Encontra documentos com instruções de instalação
```

### Caso 3: Encontrar logs de erro

**Cenário**: Procurar erros em arquivos de log.

```
Configuração:
- Pastas: C:\logs
- Extensões: log, txt

Busca: "ERROR"

Resultado: Mostra todos os logs com erros
```

### Caso 4: Buscar notas pessoais

**Cenário**: Encontrar anotações sobre um projeto.

```
Configuração:
- Pastas: C:\Users\Você\Notas
- Extensões: md, txt

Busca: "reunião cliente"

Resultado: Encontra suas anotações sobre reuniões
```

## Dicas e Truques

### 1. Organização de Pastas

**Recomendação**: Adicione apenas pastas relevantes
```
✅ Bom:
- C:\projetos\projeto-atual
- C:\Users\Você\Documents\Trabalho

❌ Evite:
- C:\ (muitos arquivos, busca lenta)
- C:\Windows (arquivos de sistema)
```

### 2. Seleção de Extensões

**Recomendação**: Seja específico
```
✅ Bom:
Para desenvolvimento web: html, css, js, jsx, ts, tsx
Para dados: json, xml, csv, yaml

❌ Evite:
Todas as extensões (deixar vazio) - busca pode ser lenta
```

### 3. Termos de Busca Eficientes

**Use termos específicos:**
```
✅ Bom:
"UserAuthentication" - específico
"TODO:" - encontra tarefas pendentes
"FIXME" - encontra código que precisa correção

❌ Evite:
"a" - muito genérico, muitos resultados
"test" - pode retornar muitos resultados
```

### 4. Lidando com Muitos Resultados

Se você recebe muitos resultados:
```
1. Use termos mais específicos
2. Reduza o número de pastas indexadas
3. Limite as extensões de arquivo
4. Use múltiplas palavras: "user authentication service"
```

## Atalhos de Teclado

Atualmente o Indexa não possui atalhos personalizados, mas você pode usar:
```
Ctrl + C - Copiar texto selecionado
Ctrl + F - Foco no campo de busca (funcionalidade do browser)
Esc - Limpar campo de busca
```

## Solução de Problemas

### "Nenhum resultado encontrado"

**Possíveis causas:**
1. Termo de busca não existe nos arquivos
2. Extensão do arquivo não está configurada
3. Pasta não está na lista de indexação

**Solução:**
1. Verifique se digitou corretamente
2. Vá em Configurações e adicione a extensão
3. Adicione a pasta onde o arquivo está

### Busca está lenta

**Possíveis causas:**
1. Muitas pastas configuradas
2. Pastas com muitos arquivos
3. Sem filtro de extensões

**Solução:**
1. Remova pastas desnecessárias
2. Seja mais específico nas pastas
3. Configure extensões específicas

### Arquivo não abre ao clicar

**Possíveis causas:**
1. Arquivo foi movido/deletado
2. Sem aplicativo padrão configurado

**Solução:**
1. Verifique se arquivo ainda existe
2. Configure um aplicativo padrão para a extensão no Windows

## Exemplos Práticos

### Exemplo 1: Buscar TODO em projeto JavaScript

```
Configuração:
Pastas: C:\projetos\meu-app
Extensões: js, jsx, ts, tsx

Busca: "TODO"

Resultado esperado:
- src/components/Header.jsx - // TODO: Add responsive design
- src/utils/api.js - // TODO: Implement error handling
- src/pages/Dashboard.tsx - // TODO: Add loading state
```

### Exemplo 2: Encontrar configurações

```
Configuração:
Pastas: C:\projetos
Extensões: json, yaml, toml, ini

Busca: "database"

Resultado esperado:
- config/app.json - configurações do banco
- docker-compose.yml - definição do database container
- settings.toml - connection string
```

### Exemplo 3: Buscar em múltiplos projetos

```
Configuração:
Pastas: 
- C:\projetos\projeto-a
- C:\projetos\projeto-b
- C:\projetos\projeto-c

Extensões: todas relevantes

Busca: "AuthService"

Resultado esperado:
Encontra implementações do AuthService em todos os projetos
```

## Feedback e Suporte

Para reportar bugs ou sugerir melhorias:
- GitHub Issues: https://github.com/gabrielgago/indexa-frontend/issues
- Documentação: Veja README.md e DEVELOPER.md

## Atualizações

O Indexa está em desenvolvimento ativo. Features futuras planejadas:
- Tema escuro
- Atalhos de teclado customizáveis
- Busca avançada com filtros
- Histórico de buscas
- Preview de imagens e PDFs
- Exportar resultados

Fique atento às atualizações!
