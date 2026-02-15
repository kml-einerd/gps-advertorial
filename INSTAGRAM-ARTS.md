# 🎨 Instagram Arts - Sistema GPS

## Geração Automática de Artes com Gemini 3 Pro

### 📋 Como Usar

**Gerar arte específica:**
```bash
node scripts/generate-instagram-art.js <template>
```

**Gerar todas as artes:**
```bash
node scripts/generate-instagram-art.js all
```

### 🎯 Templates Disponíveis

| Template | Arquivo | Descrição |
|----------|---------|-----------|
| `sistema-gps` | `insta-sistema-gps.png` | Arte principal do Sistema GPS - gradiente azul/roxo |
| `economia-garantida` | `insta-economia-garantida.png` | Foco na economia de 93% - vermelho/dourado |
| `brecha-legal` | `insta-brecha-legal.png` | Ângulo investigativo - azul escuro/amarelo |
| `lari-especialista` | `insta-lari-especialista.png` | Perfil da Lari como especialista - rosa/roxo |
| `ultimas-vagas` | `insta-ultimas-vagas.png` | Senso de urgência - laranja/vermelho |
| `depoimentos` | `insta-depoimentos.png` | Social proof e testemunhos - branco/azul/dourado |
| `europa-barata` | `insta-europa-barata.png` | Foco em Europa por R$ 700 - azul europeu |
| `tutorial` | `insta-tutorial.png` | Arte educativa - gradiente azul claro |

### ✅ Artes Já Geradas

- [x] `insta-sistema-gps.png` (1.3MB) ✅
- [x] `insta-economia-garantida.png` (1.8MB) ✅  
- [x] `insta-ultimas-vagas.png` (1.7MB) ✅
- [ ] `insta-brecha-legal.png`
- [ ] `insta-lari-especialista.png`
- [ ] `insta-depoimentos.png`
- [ ] `insta-europa-barata.png`
- [ ] `insta-tutorial.png`

### 🔧 Configuração Técnica

- **Modelo:** gemini-3-pro-image-preview
- **API Key:** AIzaSyAPJ59MMxWbpkRYnj8Lgb5acyJp5jAwCVc
- **Resolução:** 1K (1080x1080 otimizado para Instagram)
- **Formato:** PNG com alta qualidade
- **Localização:** `assets/images/insta-*.png`

### 📱 Estratégia de Uso

**Postagem Sequencial:**
1. **Semana 1:** `sistema-gps` (apresentação)
2. **Semana 2:** `economia-garantida` (benefício)
3. **Semana 3:** `brecha-legal` (curiosidade)
4. **Semana 4:** `ultimas-vagas` (urgência)
5. **Semana 5:** `depoimentos` (social proof)

**Rotação Contínua:**
- Use as artes em carrossel
- Combine com stories e reels
- Acompanhe métricas de engajamento

### 🎨 Personalização

Para criar novos templates, edite `scripts/generate-instagram-art.js`:

```javascript
'novo-template': {
    prompt: "Descrição detalhada da arte desejada...",
    filename: 'insta-novo-template.png'
}
```

### ⚡ Automação Futura

**Integração com Cron:**
- Gerar 1 arte nova por semana
- Rotacionar templates automaticamente
- Upload direto para Instagram (API futura)

---
**Atualizado:** 15/02/2026 | **Status:** ✅ Funcional