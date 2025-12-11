# Design UI - Indexa

Este documento descreve o design visual da interface do usuário do Indexa.

## Paleta de Cores (Windows 11 Inspired)

```
Primary:       #0067C0  ████████  (Azul principal - botões, links)
Primary Hover: #005A9E  ████████  (Azul escuro - hover)
Secondary:     #8E8E93  ████████  (Cinza - texto secundário)
Background:    #F3F3F3  ████████  (Cinza claro - fundo da app)
Surface:       #FFFFFF  ████████  (Branco - cards, navbar)
Border:        #E5E5E5  ████████  (Cinza claro - bordas)
Text Primary:  #1F1F1F  ████████  (Quase preto - texto principal)
Text Tertiary: #8A8886  ████████  (Cinza - placeholders)
```

## Tipografia

```
Font Family: 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif
Line Height: 1.5

Tamanhos:
- Títulos grandes: 32px / 600
- Títulos médios:  20px / 600
- Títulos cards:   18px / 600
- Subtítulos:      15px / 600
- Corpo:           14px / 400-500
- Pequeno:         13px / 400
- Labels:          12px / 400
```

## Espaçamento

```
Padrão de espaçamento: múltiplos de 4px

4px   - Pequeno (gaps internos)
8px   - Médio (entre elementos relacionados)
12px  - Padrão (gaps em listas)
16px  - Grande (padding interno de cards)
20px  - Extra grande (gaps entre seções)
24px  - Seções
32px  - Containers principais
```

## Componentes

### Navbar

```
┌─────────────────────────────────────────────────────────────┐
│  🔍 Indexa                           [ ⚙️  Configurações ]   │
└─────────────────────────────────────────────────────────────┘
Height: auto
Padding: 16px 32px
Background: #FFFFFF
Border-bottom: 1px solid #E5E5E5
Sticky position at top
```

### Search Box (Main Screen)

```
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│    ╔═══════════════════════════════════════════════════╗    │
│    ║  🔍  O que você está procurando?                  ║    │
│    ╚═══════════════════════════════════════════════════╝    │
│                                                               │
└─────────────────────────────────────────────────────────────┘
Width: 720px (max, centralizado)
Height: auto
Padding: 18px 20px 18px 56px
Border-radius: 12px
Border: 2px solid #E5E5E5
Focus: Border #0067C0, Shadow aumentada
```

### Result Card

```
┌────────────────────────────────────────────────────────┐
│  ┌───┐                                                  │
│  │TXT│  README.md                                       │
│  └───┘  C:\projetos\meu-app\README.md                   │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │ # Projeto Indexa                                 │  │
│  │                                                  │  │
│  │ Este é um projeto de busca de arquivos...       │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  Highlight: "# Projeto Indexa"                          │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │          👁️  Visualizar Arquivo                  │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
Width: auto (grid adaptativo, min 400px)
Padding: 20px
Border-radius: 12px
Border: 1px solid #E5E5E5
Shadow: 0 2px 8px rgba(0,0,0,0.08)
Hover: translateY(-2px), shadow maior, border #0067C0
```

### Result Icon

```
┌─────┐
│ TXT │  40x40px
└─────┘  
Background: Linear gradient (#0067C0 → #0078D4)
Border-radius: 8px
Color: white
Font-size: 14px
Font-weight: 600
```

### Result Preview Box

```
┌──────────────────────────────────────────────────────┐
│ const searchFiles = async (query) => {               │
│   const results = await invoke('search_files', {     │
│     query                                            │
│   });                                                │
│   return results;                                    │
│ }                                                    │
└──────────────────────────────────────────────────────┘
Background: #F3F3F3
Padding: 12px
Border-radius: 6px
Font-family: 'Consolas', monospace
Font-size: 13px
Max-height: 100px
Overflow: hidden
```

### Results Grid

```
┌─────────┐  ┌─────────┐  ┌─────────┐
│ Card 1  │  │ Card 2  │  │ Card 3  │
└─────────┘  └─────────┘  └─────────┘

┌─────────┐  ┌─────────┐  ┌─────────┐
│ Card 4  │  │ Card 5  │  │ Card 6  │
└─────────┘  └─────────┘  └─────────┘

Display: grid
Grid-template-columns: repeat(auto-fill, minmax(400px, 1fr))
Gap: 20px

Responsive:
- Desktop (>768px): 2-3 colunas
- Mobile (≤768px): 1 coluna
```

### Settings Screen

```
┌─────────────────────────────────────────────────────────────┐
│  [ ← Voltar ]                                                │
│                                                               │
│  Configurações                                               │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Pastas para Indexar                                   │ │
│  │  Adicione as pastas onde você deseja buscar arquivos   │ │
│  │                                                         │ │
│  │  ┌──────────────────────────────────────────┬───┐     │ │
│  │  │ C:\projetos\meu-app                      │ X │     │ │
│  │  └──────────────────────────────────────────┴───┘     │ │
│  │                                                         │ │
│  │  [ + Adicionar Pasta ]                                 │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Extensões de Arquivo                                  │ │
│  │  Adicione as extensões que deseja indexar              │ │
│  │                                                         │ │
│  │  [.txt] [.md] [.js] [.ts] [.html] [.css]             │ │
│  │                                                         │ │
│  │  ┌──────────────────┬────────────────┐                │ │
│  │  │ Ex: pdf, docx    │ [ + Adicionar ]│                │ │
│  │  └──────────────────┴────────────────┘                │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                               │
│  [ Salvar Configurações ]                                    │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### Buttons

**Primary Button:**
```
┌──────────────────────┐
│ Salvar Configurações │
└──────────────────────┘
Background: #0067C0
Color: white
Padding: 12px 24px
Border-radius: 6px
Font-weight: 500
Hover: #005A9E
```

**Secondary Button:**
```
┌───────────────────┐
│ + Adicionar Pasta │
└───────────────────┘
Background: #F3F3F3
Color: #1F1F1F
Border: 1px solid #E5E5E5
Padding: 12px 24px
Border-radius: 6px
Hover: background #F9F9F9, border #8E8E93
```

**View File Button:**
```
┌────────────────────────┐
│ 👁️  Visualizar Arquivo │
└────────────────────────┘
Background: #0067C0
Color: white
Padding: 10px 16px
Border-radius: 6px
Width: 100%
Hover: #005A9E
```

### Extension Tags

```
┌─────┐  ┌─────┐  ┌─────┐
│.txt │  │.md x│  │.js x│
└─────┘  └─────┘  └─────┘
Background: #F3F3F3
Border: 1px solid #E5E5E5
Padding: 6px 12px
Border-radius: 6px
Font-size: 13px
```

### Empty State

```
┌─────────────────────────────────────────────────┐
│                                                   │
│                      🔍                          │
│                                                   │
│           Nenhum resultado encontrado            │
│           Tente usar outros termos de busca      │
│                                                   │
└─────────────────────────────────────────────────┘
Text-align: center
Padding: 60px 20px
Icon opacity: 0.3
Icon size: 80x80px
```

## Animações

### Fade In (Result Cards)

```css
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
Duration: 0.3s
Easing: ease
```

### Card Hover

```css
transition: all 0.2s ease
transform: translateY(-2px)
box-shadow: 0 8px 24px rgba(0,0,0,0.12)
border-color: #0067C0
```

### Button Hover

```css
transition: all 0.2s ease
background-color change
```

## Scrollbar Customizado

```
┌─┐
│▓│  Width: 12px
│░│  Track: #F3F3F3
│░│  Thumb: #E5E5E5
│░│  Thumb hover: #8E8E93
│░│  Border-radius: 6px
└─┘
```

## Layout Responsivo

### Desktop (> 768px)

```
┌───────────────────────────────────────────────┐
│ Navbar (full width)                           │
├───────────────────────────────────────────────┤
│                                               │
│    Search Box (centralizado, max 720px)      │
│                                               │
│    ┌────────┐  ┌────────┐  ┌────────┐       │
│    │ Card 1 │  │ Card 2 │  │ Card 3 │       │
│    └────────┘  └────────┘  └────────┘       │
│                                               │
└───────────────────────────────────────────────┘
Container: max-width 1400px, centrado
Padding: 32px
Grid: 2-3 colunas
```

### Mobile (≤ 768px)

```
┌─────────────────────┐
│ Navbar              │
├─────────────────────┤
│                     │
│  Search Box (full)  │
│                     │
│  ┌───────────────┐ │
│  │    Card 1     │ │
│  └───────────────┘ │
│                     │
│  ┌───────────────┐ │
│  │    Card 2     │ │
│  └───────────────┘ │
│                     │
└─────────────────────┘
Container: padding 16px
Grid: 1 coluna
Search box: full width
```

## Acessibilidade

- **Contraste**: WCAG AA compliance
- **Focus states**: Bordas visíveis em azul
- **Keyboard navigation**: Tab index apropriado
- **ARIA labels**: Em ícones e botões
- **Responsive text**: Tamanhos legíveis em mobile

## Inspiração de Design

O design do Indexa é inspirado em:

1. **Windows 11**: 
   - Bordas arredondadas (border-radius consistente)
   - Sombras suaves
   - Acento azul (#0067C0)
   - Glassmorphism sutil

2. **Microsoft Copilot**:
   - Interface limpa e minimalista
   - Search-first design
   - Cards informativos
   - Tipografia clara

3. **Fluent Design System**:
   - Depth (sombras e elevação)
   - Motion (animações suaves)
   - Material (fundos translúcidos)
   - Scale (componentes responsivos)

## Diretrizes de Design

1. **Minimalismo**: Remova tudo que não é essencial
2. **Clareza**: Hierarquia visual clara
3. **Consistência**: Padrões repetidos
4. **Feedback**: Estados de hover/focus/active
5. **Performance**: Animações suaves, 60fps
6. **Acessibilidade**: Contraste adequado, navegação por teclado
