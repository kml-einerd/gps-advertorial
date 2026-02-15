#!/usr/bin/env node
/**
 * Gerador de Artes Instagram - Sistema GPS
 * Usa Gemini 3 Pro Image Preview para criar artes 1080x1080
 */

const { execSync } = require('child_process');
const path = require('path');

const GEMINI_API_KEY = 'AIzaSyAPJ59MMxWbpkRYnj8Lgb5acyJp5jAwCVc';
const SCRIPT_PATH = '/home/agdev/.openclaw/workspace/skills/nano-banana-pro/scripts/generate_image.py';

// Templates de prompts para diferentes tipos de arte Instagram
const templates = {
    'sistema-gps': {
        prompt: "Arte Instagram profissional para Sistema GPS de Passagens: fundo gradiente azul e roxo moderno, texto chamativo 'DESCUBRA O SEGREDO DAS PASSAGENS BARATAS', avião minimalista dourado, elementos de interface tech, ícones de destinos mundiais, estilo clean e profissional, cores vibrantes azul e dourado, tipografia moderna",
        filename: 'insta-sistema-gps.png'
    },
    'economia-garantida': {
        prompt: "Arte Instagram impactante: fundo vermelho e dourado, texto grande 'ECONOMIZE ATÉ 93% EM PASSAGENS', símbolos de dinheiro e aviões, números chamativos, estilo publicitário agressivo, cores contrastantes vermelho, branco e dourado",
        filename: 'insta-economia-garantida.png'
    },
    'brecha-legal': {
        prompt: "Arte Instagram misteriosa: fundo escuro azul marinho, texto 'BRECHA LEGAL EXPOSTA', elementos de documentos e leis, atmosfera investigativa, cores azul escuro, branco e amarelo alerta, estilo jornalístico sério",
        filename: 'insta-brecha-legal.png'
    },
    'lari-especialista': {
        prompt: "Arte Instagram pessoal: fundo gradiente elegante rosa e roxo, espaço para foto da Lari, texto 'ESPECIALISTA EM VIAGENS ECONÔMICAS', elementos femininos e profissionais, estilo influencer, cores suaves e sofisticadas",
        filename: 'insta-lari-especialista.png'
    },
    'ultimas-vagas': {
        prompt: "Arte Instagram urgente: fundo laranja e vermelho vibrante, texto grande 'ÚLTIMAS VAGAS DISPONÍVEIS', cronômetro e elementos de urgência, estilo promocional intenso, cores quentes e chamativas",
        filename: 'insta-ultimas-vagas.png'
    },
    'depoimentos': {
        prompt: "Arte Instagram social proof: fundo branco limpo, espaço para depoimentos, estrelas douradas, texto 'VEJA O QUE NOSSOS CLIENTES DIZEM', estilo testemunhal profissional, cores azul e dourado",
        filename: 'insta-depoimentos.png'
    },
    'europa-barata': {
        prompt: "Arte Instagram temática: fundo com elementos da Europa (Torre Eiffel, Big Ben estilizados), texto 'EUROPA A PARTIR DE R$ 700', passaporte e carimbos, cores azul europeu e dourado",
        filename: 'insta-europa-barata.png'
    },
    'tutorial': {
        prompt: "Arte Instagram educativa: fundo gradiente azul claro, ícones de tutorial passo-a-passo, texto 'APRENDA O MÉTODO COMPLETO', elementos de ensino, estilo didático profissional",
        filename: 'insta-tutorial.png'
    }
};

// Função para gerar arte
function generateInstagramArt(templateKey) {
    const template = templates[templateKey];
    if (!template) {
        console.error(`❌ Template '${templateKey}' não encontrado!`);
        console.log('📋 Templates disponíveis:', Object.keys(templates).join(', '));
        return false;
    }
    
    const outputPath = path.join(__dirname, '../assets/images/', template.filename);
    
    try {
        console.log(`🎨 Gerando arte: ${templateKey}...`);
        
        const command = `uv run ${SCRIPT_PATH} --prompt "${template.prompt}" --filename "${outputPath}" --resolution 1K --api-key ${GEMINI_API_KEY}`;
        
        execSync(command, { stdio: 'inherit' });
        
        console.log(`✅ Arte gerada com sucesso: ${template.filename}`);
        return true;
        
    } catch (error) {
        console.error(`❌ Erro ao gerar arte: ${error.message}`);
        return false;
    }
}

// Gera todas as artes
function generateAllArts() {
    console.log('🚀 Gerando todas as artes Instagram...\n');
    
    let successCount = 0;
    const totalTemplates = Object.keys(templates).length;
    
    for (const templateKey of Object.keys(templates)) {
        if (generateInstagramArt(templateKey)) {
            successCount++;
        }
        console.log(''); // Linha em branco
    }
    
    console.log(`📊 Resultado: ${successCount}/${totalTemplates} artes geradas com sucesso!`);
    
    if (successCount === totalTemplates) {
        console.log('🎉 Todas as artes Instagram foram criadas!');
        console.log('📱 Localizadas em: assets/images/insta-*.png');
    }
}

// CLI
const args = process.argv.slice(2);

if (args.length === 0) {
    console.log('📋 Uso: node generate-instagram-art.js <template> | all');
    console.log('🎨 Templates disponíveis:');
    Object.keys(templates).forEach(key => {
        console.log(`   • ${key} → ${templates[key].filename}`);
    });
    console.log('   • all → Gera todas as artes');
} else if (args[0] === 'all') {
    generateAllArts();
} else {
    generateInstagramArt(args[0]);
}