#!/usr/bin/env python3
"""
Sistema Automatizado de Geração de Artigos para o Blog GPS
Baseado nas Sinapses do Agent Brain

Este script gera automaticamente artigos advertorials para o mini blog
usando hooks, técnicas de copy e estruturas encontradas nas sinapses.
"""

import os
import json
import requests
from datetime import datetime, timedelta
import random
import uuid

class GPSBlogGenerator:
    def __init__(self):
        self.hooks = [
            "Por que ninguém tá falando sobre {tema}?",
            "{sistema} é tão bom pra {beneficio} que é literalmente proibido",
            "Quer saber o segredo pra {resultado}?",
            "5 formas de {acao}, e a 4ª é a melhor",
            "Eu perdi meu {item} e aqui tá o que aconteceu",
            "{numero} brasileiros descobriram isso e as companhias entraram em pânico"
        ]
        
        self.dopamine_phrases = [
            "Joga seu Google Flights no lixo",
            "Nunca vi economia assim",
            "Você não vai acreditar",
            "Pare tudo que você tá fazendo",
            "As agências não querem que você saiba disso",
            "Teste agora. Senão vai se arrepender",
            "Até minha mãe não acreditou"
        ]
        
        self.temas_passagens = [
            "passagens ultra econômicas para Dubai",
            "voos executivos por preço de econômica", 
            "sistema que encontra erro de preço em passagens",
            "método para viajar gastando menos que passagem nacional",
            "brecha contratual das companhias aéreas",
            "acordos secretos entre empresas de aviação",
            "tarifas fixas que só agentes conhecem",
            "passagens que custam só as taxas de embarque"
        ]
        
        self.destinos_populares = [
            {"destino": "Paris", "preco_normal": "R$ 5.200", "preco_gps": "R$ 890"},
            {"destino": "Nova York", "preco_normal": "R$ 4.800", "preco_gps": "R$ 1.200"},
            {"destino": "Londres", "preco_normal": "R$ 4.600", "preco_gps": "R$ 1.100"},
            {"destino": "Dubai", "preco_normal": "R$ 6.200", "preco_gps": "R$ 1.400"},
            {"destino": "Tóquio", "preco_normal": "R$ 7.800", "preco_gps": "R$ 1.800"},
            {"destino": "Barcelona", "preco_normal": "R$ 4.900", "preco_gps": "R$ 950"}
        ]
        
        self.casos_sucesso = [
            {"nome": "Maria Silva", "cidade": "São Paulo", "economia": "R$ 8.400", "destino": "Europa"},
            {"nome": "João Santos", "cidade": "Rio de Janeiro", "economia": "R$ 6.200", "destino": "EUA"},
            {"nome": "Ana Costa", "cidade": "Belo Horizonte", "economia": "R$ 9.800", "destino": "Ásia"},
            {"nome": "Pedro Lima", "cidade": "Brasília", "economia": "R$ 7.600", "destino": "Europa"},
            {"nome": "Carla Ferreira", "cidade": "Porto Alegre", "economia": "R$ 5.900", "destino": "América do Sul"}
        ]

    def gerar_hook(self, tema_especifico=None):
        """Gera um hook baseado nas sinapses do Agent Brain"""
        hook_template = random.choice(self.hooks)
        
        # Personaliza o hook com dados específicos
        if "{tema}" in hook_template:
            tema = tema_especifico or random.choice(self.temas_passagens)
            return hook_template.format(tema=tema)
        elif "{sistema}" in hook_template:
            return hook_template.format(
                sistema="Sistema GPS", 
                beneficio="encontrar passagens baratas"
            )
        elif "{resultado}" in hook_template:
            return hook_template.format(resultado="viajar gastando 90% menos")
        elif "{acao}" in hook_template:
            return hook_template.format(acao="encontrar passagens baratas")
        elif "{numero}" in hook_template:
            numero = random.choice(["347", "892", "1.240", "2.156"])
            return hook_template.format(numero=numero)
        else:
            return hook_template

    def gerar_conteudo_advertorial(self, hook, destino_data, caso_sucesso):
        """Gera conteúdo advertorial usando estrutura invisível das sinapses"""
        
        # Frase de dopamina aleatória
        frase_dopamina = random.choice(self.dopamine_phrases)
        
        # Calcula percentual de economia
        preco_normal = int(destino_data["preco_normal"].replace("R$ ", "").replace(".", ""))
        preco_gps = int(destino_data["preco_gps"].replace("R$ ", "").replace(".", ""))
        economia_pct = round(((preco_normal - preco_gps) / preco_normal) * 100)
        
        conteudo = f"""
<p><strong>ATENÇÃO:</strong> {frase_dopamina}</p>

<p>Uma descoberta que pode revolucionar suas viagens acaba de vir à tona. E o que você está prestes a descobrir vai mudar completamente a forma como você compra passagens aéreas.</p>

<p>{hook}</p>

<p>A resposta está em algo que as companhias aéreas fazem de tudo para esconder: <strong>lotes contratuais de passagens que elas são obrigadas por lei a vender com desconto massivo</strong>.</p>

<div class="price-comparison">
    <div class="price-before">
        <h4>Buscadores Tradicionais</h4>
        <div class="price-value old">{destino_data["preco_normal"]}</div>
        <p>São Paulo → {destino_data["destino"]}</p>
    </div>
    <div class="price-after">
        <h4>Sistema GPS</h4>
        <div class="price-value new">{destino_data["preco_gps"]}</div>
        <p>Mesmo voo, mesma classe</p>
        <div class="savings">{economia_pct}% DE ECONOMIA</div>
    </div>
</div>

<h3>A descoberta que mudou tudo</h3>

<p>Tudo começou quando a especialista Larissa Colares percebeu uma diferença absurda: o mesmo voo que custava {destino_data["preco_normal"]} no Google Flights aparecia por apenas {destino_data["preco_gps"]} em sistemas profissionais.</p>

<p>"Era impossível ser coincidência. Tinha algo acontecendo nos bastidores que o consumidor comum não sabia", conta Larissa.</p>

<div class="testimonial">
    <div class="testimonial-header">
        <div class="testimonial-avatar">{caso_sucesso["nome"][:2]}</div>
        <div>
            <strong>{caso_sucesso["nome"]}</strong><br>
            <small>{caso_sucesso["cidade"]}</small>
        </div>
    </div>
    <div class="testimonial-text">
        "Economizei {caso_sucesso["economia"]} na minha viagem para {caso_sucesso["destino"]} usando o Sistema GPS. 
        É a diferença entre viajar ou não viajar. Recomendo para toda família!"
    </div>
</div>

<h3>Por que as companhias escondem isso?</h3>

<p>A resposta é simples: <strong>lucro</strong>. Quanto mais você paga, maior a margem de lucro delas.</p>

<p>Esses lotes ultraeconômicos existem por obrigação contratual - são acordos comerciais entre companhias para compartilhamento de voos. Mas elas não fazem questão de divulgá-los.</p>

<p>{random.choice(self.dopamine_phrases)}</p>

<p>O Sistema GPS foi desenvolvido justamente para democratizar esse acesso, integrando as mesmas ferramentas profissionais que agentes de viagem usam em uma interface simples.</p>

<h3>Janela de oportunidade limitada</h3>

<p>Segundo fontes do setor, as companhias já estão pressionando para restringir esse tipo de acesso novamente apenas aos profissionais credenciados.</p>

<p>"Sempre que um sistema assim fica popular demais, eles encontram uma forma de bloquear", alerta Larissa. "Por isso, quem tem interesse precisa agir rapidamente".</p>
"""
        
        return conteudo

    def gerar_artigo_completo(self):
        """Gera um artigo advertorial completo"""
        destino = random.choice(self.destinos_populares)
        caso = random.choice(self.casos_sucesso)
        
        # Personaliza hook com o destino
        tema_personalizado = f"passagens para {destino['destino']} por {destino['preco_gps']}"
        hook = self.gerar_hook(tema_personalizado)
        
        # Gera título SEO otimizado
        titulo_opcoes = [
            f"Como conseguir passagem para {destino['destino']} por apenas {destino['preco_gps']}",
            f"Método secreto: {destino['destino']} por {destino['preco_gps']} em vez de {destino['preco_normal']}",
            f"Brecha legal permite viajar para {destino['destino']} gastando {destino['preco_gps']}",
            f"Sistema GPS revela: {destino['destino']} por {destino['preco_gps']} (companhias odeiam isso)"
        ]
        
        titulo = random.choice(titulo_opcoes)
        
        # Gera conteúdo
        conteudo = self.gerar_conteudo_advertorial(hook, destino, caso)
        
        # Meta description otimizada
        economia_pct = round(((int(destino["preco_normal"].replace("R$ ", "").replace(".", "")) - 
                             int(destino["preco_gps"].replace("R$ ", "").replace(".", ""))) / 
                            int(destino["preco_normal"].replace("R$ ", "").replace(".", ""))) * 100)
        
        meta_description = f"Descubra como viajar para {destino['destino']} por {destino['preco_gps']}. Método revolucionário economiza {economia_pct}%. Sistema que companhias querem esconder"
        
        return {
            "titulo": titulo,
            "hook": hook,
            "meta_description": meta_description,
            "conteudo": conteudo,
            "destino": destino,
            "caso_sucesso": caso,
            "data_criacao": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "filename": f"artigo-{datetime.now().strftime('%Y-%m-%d')}-{uuid.uuid4().hex[:8]}.html"
        }

    def salvar_artigo_html(self, artigo, diretorio="blog-principal"):
        """Salva o artigo como HTML completo"""
        
        template_html = f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="{artigo['meta_description']}">
    <title>{artigo['titulo']}</title>
    
    <style>
        /* Reutiliza CSS do projeto existente */
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        
        body {{
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8f9fa;
        }}
        
        .container {{
            max-width: 800px;
            margin: 0 auto;
            background: white;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }}
        
        .header {{
            background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
            color: white;
            padding: 2rem;
            text-align: center;
        }}
        
        .headline {{
            font-size: 2.2rem;
            font-weight: bold;
            line-height: 1.3;
            margin-bottom: 1rem;
        }}
        
        .content {{
            padding: 2rem;
        }}
        
        .content p {{
            margin-bottom: 1.5rem;
            font-size: 1.1rem;
        }}
        
        .content h3 {{
            font-size: 1.6rem;
            margin: 2rem 0 1rem 0;
            color: #1f2937;
        }}
        
        .price-comparison {{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin: 2rem 0;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            overflow: hidden;
        }}
        
        .price-before, .price-after {{
            padding: 2rem;
            text-align: center;
        }}
        
        .price-before {{
            background: #fef2f2;
        }}
        
        .price-after {{
            background: #f0fdf4;
        }}
        
        .price-value {{
            font-size: 2.2rem;
            font-weight: bold;
            margin: 0.5rem 0;
        }}
        
        .price-value.old {{
            color: #dc2626;
            text-decoration: line-through;
        }}
        
        .price-value.new {{
            color: #16a34a;
        }}
        
        .savings {{
            background: #22c55e;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-weight: bold;
            display: inline-block;
            margin-top: 1rem;
        }}
        
        .testimonial {{
            background: #f9fafb;
            border-radius: 12px;
            padding: 2rem;
            margin: 2rem 0;
            border: 1px solid #e5e7eb;
        }}
        
        .testimonial-header {{
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1rem;
        }}
        
        .testimonial-avatar {{
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #6366f1;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
        }}
        
        .testimonial-text {{
            font-style: italic;
            font-size: 1.1rem;
            line-height: 1.6;
        }}
        
        .cta-final {{
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
            color: white;
            padding: 3rem 2rem;
            text-align: center;
            margin: 3rem 0 0 0;
        }}
        
        .cta-button {{
            display: inline-block;
            background: white;
            color: #ef4444;
            padding: 1rem 2rem;
            border-radius: 50px;
            text-decoration: none;
            font-size: 1.2rem;
            font-weight: bold;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }}
        
        @media (max-width: 768px) {{
            .price-comparison {{
                grid-template-columns: 1fr;
            }}
            
            .headline {{
                font-size: 1.8rem;
            }}
        }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="headline">{artigo['titulo']}</h1>
        </div>
        
        <div class="content">
            {artigo['conteudo']}
            
            <div class="cta-final">
                <h3>Acesso Liberado Por Tempo Limitado</h3>
                <p>Veja como encontrar essas passagens ultraeconômicas antes que o acesso seja restringido</p>
                <a href="#" class="cta-button" onclick="alert('Redirecionando para Sistema GPS...')">
                    QUERO ACESSAR O SISTEMA GPS
                </a>
            </div>
        </div>
    </div>
</body>
</html>"""
        
        filepath = os.path.join(diretorio, artigo["filename"])
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(template_html)
            
        return filepath

    def executar_geracao_automatica(self):
        """Executa a geração automática de um novo artigo"""
        print("🤖 Iniciando geração automática de artigo...")
        
        # Gera artigo
        artigo = self.gerar_artigo_completo()
        
        # Salva arquivo HTML
        filepath = self.salvar_artigo_html(artigo)
        
        # Log da operação
        log_data = {
            "timestamp": datetime.now().isoformat(),
            "titulo": artigo["titulo"],
            "hook": artigo["hook"],
            "filename": artigo["filename"],
            "destino": artigo["destino"]["destino"],
            "economia": f"{artigo['destino']['preco_normal']} → {artigo['destino']['preco_gps']}",
            "caso_sucesso": artigo["caso_sucesso"]["nome"]
        }
        
        # Salva log
        log_file = "logs/auto-generation.jsonl"
        os.makedirs("logs", exist_ok=True)
        with open(log_file, 'a', encoding='utf-8') as f:
            f.write(json.dumps(log_data, ensure_ascii=False) + '\n')
        
        print(f"✅ Artigo gerado: {artigo['titulo']}")
        print(f"📄 Arquivo: {filepath}")
        print(f"🎯 Hook: {artigo['hook']}")
        print(f"💰 Economia: {artigo['destino']['preco_normal']} → {artigo['destino']['preco_gps']}")
        
        return artigo

if __name__ == "__main__":
    generator = GPSBlogGenerator()
    artigo = generator.executar_geracao_automatica()
    
    print("\\n🎉 Artigo gerado com sucesso usando sinapses do Agent Brain!")
    print("🔄 Configure cron job para executar automaticamente:")
    print("   0 */6 * * * cd /path/to/project && python3 scripts/auto-blog-generator.py")