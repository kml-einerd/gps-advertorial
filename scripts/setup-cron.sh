#!/bin/bash

# Setup automático de cron jobs para o GPS Advertorial
# Baseado nas sinapses do Agent Brain

PROJECT_DIR="/home/agdev/.openclaw/workspace/gps-advertorial"
PYTHON_PATH="/usr/bin/python3"

echo "🚀 Configurando sistema automatizado de blog GPS..."

# Torna o gerador executável
chmod +x "$PROJECT_DIR/scripts/auto-blog-generator.py"

# Cria diretórios necessários
mkdir -p "$PROJECT_DIR/logs"
mkdir -p "$PROJECT_DIR/blog-principal/auto-generated"

# Backup do crontab atual
crontab -l > "$PROJECT_DIR/logs/crontab-backup-$(date +%Y%m%d-%H%M%S).txt" 2>/dev/null || echo "# Novo crontab" > "$PROJECT_DIR/logs/crontab-backup-$(date +%Y%m%d-%H%M%S).txt"

echo "📝 Configurando cron jobs..."

# Remove cron jobs antigos do GPS (se existirem)
crontab -l 2>/dev/null | grep -v "gps-advertorial" | crontab - 2>/dev/null || true

# Adiciona novos cron jobs
(crontab -l 2>/dev/null || echo ""; echo "
# GPS Advertorial - Sistema Automatizado
# Gera novo artigo advertorial a cada 6 horas usando sinapses do Agent Brain
0 */6 * * * cd $PROJECT_DIR && $PYTHON_PATH scripts/auto-blog-generator.py >> logs/cron-auto-generation.log 2>&1

# GPS Advertorial - Atualiza índice do blog diariamente às 08:00
0 8 * * * cd $PROJECT_DIR && $PYTHON_PATH scripts/update-blog-index.py >> logs/cron-index-update.log 2>&1

# GPS Advertorial - Limpeza de logs antigos (semanal)
0 2 * * 0 find $PROJECT_DIR/logs -name '*.log' -mtime +30 -delete

# GPS Advertorial - Backup automático (diário às 03:00)
0 3 * * * cd $PROJECT_DIR && tar -czf backups/backup-\$(date +\\%Y\\%m\\%d).tar.gz blog-principal/ assets/ scripts/ >> logs/cron-backup.log 2>&1
") | crontab -

echo "✅ Cron jobs configurados com sucesso!"

# Cria script para atualizar índice do blog
cat > "$PROJECT_DIR/scripts/update-blog-index.py" << 'EOF'
#!/usr/bin/env python3
"""
Atualiza automaticamente o índice do blog principal
com os novos artigos gerados
"""

import os
import glob
import json
from datetime import datetime
import re

def extrair_metadados_html(filepath):
    """Extrai título e meta description do arquivo HTML"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extrai título
    title_match = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE)
    title = title_match.group(1) if title_match else os.path.basename(filepath)
    
    # Extrai meta description
    meta_match = re.search(r'<meta name="description" content="(.*?)"', content, re.IGNORECASE)
    description = meta_match.group(1) if meta_match else title[:150] + "..."
    
    # Extrai categoria baseada no nome do arquivo
    if 'europa' in filepath.lower():
        categoria = 'EUROPA'
    elif 'eua' in filepath.lower() or 'nova-york' in filepath.lower():
        categoria = 'EUA'
    elif 'asia' in filepath.lower() or 'tokyo' in filepath.lower():
        categoria = 'ÁSIA'
    elif 'dubai' in filepath.lower():
        categoria = 'ORIENTE MÉDIO'
    else:
        categoria = 'INTERNACIONAL'
    
    return {
        'title': title,
        'description': description,
        'categoria': categoria,
        'filename': os.path.basename(filepath),
        'created': datetime.fromtimestamp(os.path.getctime(filepath)).strftime('%Y-%m-%d')
    }

def atualizar_index():
    """Atualiza o index.html do blog principal"""
    blog_dir = '/home/agdev/.openclaw/workspace/gps-advertorial/blog-principal'
    
    # Lista todos os arquivos HTML exceto o index
    html_files = glob.glob(f"{blog_dir}/*.html")
    html_files = [f for f in html_files if not f.endswith('index.html')]
    
    # Ordena por data de criação (mais recentes primeiro)
    html_files.sort(key=os.path.getctime, reverse=True)
    
    # Extrai metadados
    artigos = [extrair_metadados_html(f) for f in html_files]
    
    # Gera cards HTML para os artigos
    cards_html = ""
    emojis_categoria = {
        'EUROPA': '🇪🇺',
        'EUA': '🇺🇸', 
        'ÁSIA': '🌏',
        'ORIENTE MÉDIO': '🕌',
        'INTERNACIONAL': '✈️'
    }
    
    for artigo in artigos[:12]:  # Máximo 12 artigos na página inicial
        emoji = emojis_categoria.get(artigo['categoria'], '✈️')
        cards_html += f'''
                    <article class="article-card">
                        <div class="article-image">{emoji}</div>
                        <div class="article-content">
                            <span class="article-category">{artigo['categoria']}</span>
                            <h2 class="article-title">
                                <a href="{artigo['filename']}">{artigo['title']}</a>
                            </h2>
                            <p class="article-excerpt">
                                {artigo['description'][:120]}...
                            </p>
                            <div class="article-meta">
                                <span>Por GPS Team</span>
                                <span>{artigo['created']}</span>
                            </div>
                        </div>
                    </article>
        '''
    
    # Lê template do index original e substitui os cards
    index_path = f"{blog_dir}/index.html"
    with open(index_path, 'r', encoding='utf-8') as f:
        index_content = f.read()
    
    # Procura a seção dos cards e substitui
    start_marker = '<div class="articles-grid">'
    end_marker = '</div>\n            </main>'
    
    start_pos = index_content.find(start_marker)
    end_pos = index_content.find(end_marker, start_pos)
    
    if start_pos != -1 and end_pos != -1:
        new_content = (
            index_content[:start_pos + len(start_marker)] +
            cards_html +
            index_content[end_pos:]
        )
        
        with open(index_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"✅ Índice atualizado com {len(artigos)} artigos")
    else:
        print("❌ Erro: Não foi possível encontrar seção de artigos no index.html")

if __name__ == "__main__":
    atualizar_index()
    print(f"🔄 Atualização automática executada em {datetime.now()}")
EOF

# Torna o script executável
chmod +x "$PROJECT_DIR/scripts/update-blog-index.py"

# Cria diretório de backups
mkdir -p "$PROJECT_DIR/backups"

# Testa a geração de um artigo
echo "🧪 Testando geração automática..."
cd "$PROJECT_DIR"
python3 scripts/auto-blog-generator.py

echo "
🎉 Sistema automatizado configurado com sucesso!

📊 CRON JOBS ATIVOS:
- Novo artigo a cada 6 horas
- Atualização do índice diariamente às 08:00
- Limpeza de logs antigas semanalmente  
- Backup diário às 03:00

📁 ARQUIVOS CRIADOS:
- scripts/auto-blog-generator.py (gerador principal)
- scripts/update-blog-index.py (atualizador de índice)
- scripts/setup-cron.sh (este script)

📝 LOGS:
- logs/cron-auto-generation.log
- logs/cron-index-update.log
- logs/cron-backup.log

🔄 COMANDOS ÚTEIS:
- Ver cron jobs: crontab -l
- Parar cron jobs: crontab -r
- Gerar artigo manual: python3 scripts/auto-blog-generator.py
- Atualizar índice: python3 scripts/update-blog-index.py

🧠 BASEADO NAS SINAPSES DO AGENT BRAIN:
✓ Hooks persuasivos em PT-BR
✓ Estrutura invisível > estrutura visível
✓ Desejos verdadeiros vs bonitos
✓ Frases de disparo de dopamina
✓ Método 25 (5x5) para variações
✓ SEO otimizado com meta descriptions persuasivas
"

echo "🚀 Próximo artigo será gerado em 6 horas!"
echo "⚡ Sistema está rodando automaticamente usando as sinapses do Agent Brain!"