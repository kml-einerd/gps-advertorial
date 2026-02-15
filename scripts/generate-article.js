#!/usr/bin/env node
/**
 * Gerador de Artigos Automatizados - Sistema GPS
 * Gera 1 artigo por dia com diferentes ângulos de vendas
 */

const fs = require('fs');
const path = require('path');

// Ângulos e hooks para artigos
const angles = [
    {
        title: "Ex-comissária de bordo revela segredos sombrios das companhias aéreas",
        hook: "O que ela descobriu vai te deixar furioso com as companhias aéreas",
        category: "DENÚNCIA",
        angle: "insider-secrets",
        image: "aeroporto-aviao.jpg"
    },
    {
        title: "Mãe de 3 filhos viaja pelo mundo gastando menos que uma ida ao shopping",
        hook: "Ela transformou R$ 500 em 5 viagens internacionais",
        category: "FAMÍLIA",
        angle: "family-travel",
        image: "familia-aeroporto.jpg"
    },
    {
        title: "Aposentado de 65 anos quebra recorde: 12 países em 6 meses com R$ 3.000",
        hook: "Método simples que está revolucionando viagens para terceira idade",
        category: "TERCEIRA IDADE",
        angle: "senior-travel", 
        image: "casal-viajando.jpg"
    },
    {
        title: "Estudante universitária 'hackeia' sistema e viaja por preço de passagem municipal",
        hook: "Brecha legal permite viagens internacionais por menos de R$ 200",
        category: "JOVENS",
        angle: "student-hack",
        image: "bagagem-aeroporto.jpg"
    },
    {
        title: "Influencer expõe como rico fica mais rico: passagens de R$ 8 mil por R$ 300",
        hook: "Elite brasileira usa método secreto para viajar 95% mais barato",
        category: "ELITE",
        angle: "luxury-secrets",
        image: "new-york-skyline.jpg"
    },
    {
        title: "Nordestina viaja para 15 países e gasta menos que uma viagem para SP",
        hook: "Do Ceará para o mundo: como ela transformou sonhos em passaporte carimbado",
        category: "NORDESTE",
        angle: "regional-success",
        image: "praia-brasil-nordeste.jpg"
    }
];

// Gera estrutura do artigo
function generateArticle(angle) {
    const today = new Date();
    const dateStr = today.toLocaleDateString('pt-BR');
    const filename = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}-${angle.angle}`;
    
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${angle.hook}">
    <title>${angle.title} - Viagem News</title>
    
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; line-height: 1.7; color: #333; background-color: #f8f9fa; }
        .container { max-width: 800px; margin: 0 auto; background: white; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
        .header { background: #1e40af; color: white; padding: 1rem; text-align: center; }
        .logo { font-size: 1.8rem; font-weight: bold; }
        .article-header { padding: 2rem; background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%); }
        .category { display: inline-block; background: #ef4444; color: white; padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.9rem; font-weight: bold; margin-bottom: 1rem; }
        .headline { font-size: 2.2rem; font-weight: bold; line-height: 1.3; margin-bottom: 1rem; color: #1f2937; }
        .subheadline { font-size: 1.2rem; color: #6b7280; margin-bottom: 1.5rem; }
        .meta { display: flex; align-items: center; gap: 1rem; font-size: 0.9rem; color: #6b7280; }
        .content { padding: 2rem; }
        .content p { margin-bottom: 1.5rem; font-size: 1.1rem; }
        .highlight-box { background: #f3f4f6; border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 4px; }
        .cta-section { background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 3rem; text-align: center; }
        .cta-button { display: inline-block; background: #fbbf24; color: #1f2937; padding: 1rem 2rem; border-radius: 30px; text-decoration: none; font-weight: bold; font-size: 1.1rem; margin-top: 1rem; transition: transform 0.3s; }
        .cta-button:hover { transform: translateY(-2px); }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">VIAGEM NEWS</div>
        </div>
        
        <div class="article-header">
            <span class="category">${angle.category}</span>
            <h1 class="headline">${angle.title}</h1>
            <p class="subheadline">${angle.hook}</p>
            <div class="meta">
                <div>Por <strong>Redação</strong> • ${dateStr} • Atualizado há 1 hora</div>
            </div>
        </div>
        
        <div class="content">
            <div style="text-align: center; margin: 2rem 0;">
                <img src="../assets/images/${angle.image}" alt="Imagem ilustrativa" style="width: 100%; max-width: 600px; height: 300px; object-fit: cover; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">
            </div>
            
            <p><strong>Brasil</strong> – Uma nova descoberta está revolucionando a forma como brasileiros viajam pelo mundo, e o que você está prestes a descobrir pode mudar completamente sua relação com viagens internacionais.</p>
            
            <p>O segredo não está em programas de milhas complicados, nem em promoções relâmpago que nunca funcionam. O que poucos sabem é que existe uma brecha legal que <strong>obriga as companhias aéreas a disponibilizar lotes de passagens com descontos de até 93%</strong>.</p>
            
            <div class="highlight-box">
                <h3>🚨 Atenção: Esta informação está causando pânico no setor aéreo</h3>
                <p>Executivos de grandes companhias aéreas estão fazendo pressão para que essa informação não se torne pública. Eles sabem que isso pode afetar drasticamente seus lucros.</p>
            </div>
            
            <h2>O Sistema Que Está Democratizando As Viagens</h2>
            <p>Larissa Colares, especialista em viagens econômicas, desenvolveu o Sistema GPS de Passagens após descobrir essa brecha legal. O sistema permite que qualquer pessoa acesse as mesmas ferramentas profissionais que agentes de viagem usam para encontrar essas passagens ultra econômicas.</p>
            
            <div style="text-align: center; margin: 2rem 0;">
                <img src="../assets/images/lari-especialista-viagens.jpg" alt="Larissa Colares, criadora do Sistema GPS" style="width: 100%; max-width: 500px; height: 250px; object-fit: cover; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">
            </div>
            
            <p>"Não é sorte nem insider trading", explica Larissa. "É puro conhecimento técnico aplicado de forma inteligente. Qualquer pessoa pode fazer isso."</p>
            
            <h2>Casos Reais De Sucesso</h2>
            <p>Os resultados falam por si só: milhares de brasileiros já economizaram centenas de milhares de reais usando essas técnicas. Famílias inteiras que nunca imaginaram poder viajar para o exterior agora fazem isso regularmente.</p>
            
            <div class="highlight-box">
                <h3>💰 Economia Comprovada</h3>
                <p>Só nos últimos 6 meses, usuários do Sistema GPS economizaram mais de <strong>R$ 2,3 milhões</strong> em passagens aéreas. A economia média por pessoa é de R$ 4.200 por viagem.</p>
            </div>
            
            <p>O mais impressionante é que essa não é uma "promoção temporária" ou "oferta por tempo limitado". É um método sistemático que funciona 365 dias por ano, porque está baseado em obrigações contratuais das próprias companhias aéreas.</p>
            
        </div>
        
        <div class="cta-section">
            <h2>🎯 Acesso Exclusivo Por Tempo Limitado</h2>
            <p>Devido à pressão das companhias aéreas, este acesso pode ser suspenso a qualquer momento. Centenas de pessoas estão descobrindo isso diariamente.</p>
            <a href="../advertorial/" class="cta-button">
                👆 QUERO ACESSO AO SISTEMA GPS
            </a>
            <p style="font-size: 0.9rem; margin-top: 1rem; opacity: 0.9;">
                ⚡ Últimas 48 vagas disponíveis
            </p>
        </div>
    </div>
</body>
</html>`;
}

// Seleciona ângulo aleatório
function getRandomAngle() {
    return angles[Math.floor(Math.random() * angles.length)];
}

// Gera e salva artigo
function createTodayArticle() {
    const angle = getRandomAngle();
    const today = new Date();
    const filename = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}-${angle.angle}.html`;
    const filepath = path.join(__dirname, '../blog-principal/', filename);
    
    // Não sobrescreve se já existe
    if (fs.existsSync(filepath)) {
        console.log(`Artigo já existe para hoje: ${filename}`);
        return;
    }
    
    const articleContent = generateArticle(angle);
    fs.writeFileSync(filepath, articleContent);
    
    console.log(`✅ Artigo gerado: ${filename}`);
    console.log(`📰 Título: ${angle.title}`);
    
    // Atualiza index do blog com novo artigo
    updateBlogIndex(filename, angle);
}

// Atualiza a lista do blog principal
function updateBlogIndex(filename, angle) {
    const indexPath = path.join(__dirname, '../blog-principal/index.html');
    let content = fs.readFileSync(indexPath, 'utf8');
    
    const today = new Date().toLocaleDateString('pt-BR');
    
    // Novo card do artigo
    const newCard = `
                    <article class="article-card">
                        <div class="article-image"><img src="../assets/images/${angle.image}" alt="${angle.title}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px;"></div>
                        <div class="article-content">
                            <span class="article-category">${angle.category}</span>
                            <h2 class="article-title">
                                <a href="${filename}">${angle.title}</a>
                            </h2>
                            <p class="article-excerpt">
                                ${angle.hook}
                            </p>
                            <div class="article-meta">
                                <span>📅 ${today}</span> • <span>⏱️ 5 min</span>
                            </div>
                        </div>
                    </article>`;
    
    // Insere o novo card no início da grid
    content = content.replace('<div class="articles-grid">', `<div class="articles-grid">${newCard}`);
    
    fs.writeFileSync(indexPath, content);
    console.log(`✅ Blog index atualizado com novo artigo`);
}

// Executa
if (require.main === module) {
    createTodayArticle();
}

module.exports = { createTodayArticle };