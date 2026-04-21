# Dashboard de Clima

Aplicação web de clima em tempo real, construída com HTML, CSS e JavaScript puro, orientada a decisão prática: quando sair, qual o risco do trajeto, como o cenário deve evoluir nas próximas horas e qual o impacto potencial para conforto e saúde.

O projeto combina leitura meteorológica tradicional (temperatura, chuva, vento) com camadas de contexto para mobilidade, exposição ambiental e confiabilidade da previsão.

## Sumário

1. [Visão geral](#visão-geral)
2. [Problema que o projeto resolve](#problema-que-o-projeto-resolve)
3. [Funcionalidades](#funcionalidades)
4. [Arquitetura e estrutura](#arquitetura-e-estrutura)
5. [Fluxo de dados e regras de negócio](#fluxo-de-dados-e-regras-de-negócio)
6. [Setup local](#setup-local)
7. [Configuração de chaves e proxy](#configuração-de-chaves-e-proxy)
8. [PWA, cache e resiliência](#pwa-cache-e-resiliência)
9. [Testes e validações](#testes-e-validações)
10. [Observabilidade](#observabilidade)
11. [Acessibilidade e UX](#acessibilidade-e-ux)
12. [Limitações conhecidas](#limitações-conhecidas)
13. [Roadmap sugerido](#roadmap-sugerido)
14. [Autor](#autor)

## Visão geral

O Dashboard de Clima foi desenhado para operar como painel de decisão rápida, não apenas como visualizador de condição atual. Isso significa que ele:

- Prioriza perguntas do mundo real (sair agora, esperar, mudar rota, ajustar modal de deslocamento).
- Exibe risco contextual, não só dados brutos.
- Usa visual dinâmico para facilitar leitura em poucos segundos.
- Mantém operação mesmo com falhas parciais de rede, por meio de cache e fallback de fontes.

## Problema que o projeto resolve

Aplicativos de clima tradicionais costumam informar o estado do tempo, mas não ajudam a tomar decisões objetivas para deslocamento, exposição ao calor/umidade e risco de chuva no curto prazo.

Este projeto resolve esse gap com três camadas:

- Camada informativa: clima atual, previsão, UV, AQI, radar.
- Camada decisória: janela segura, score de exposição, alerta de risco em deslocamento.
- Camada explicativa: confiabilidade da previsão e narrativa de fatores.

## Funcionalidades

### 1) Busca e descoberta de cidades

- Busca com sugestões em tempo real.
- Geolocalização do navegador.
- Geocodificação direta e reversa.
- Operação global com suporte de idioma da API.

### 2) Painel climático principal

- Temperatura e sensação térmica.
- Umidade, vento, rajada, pressão e visibilidade.
- Hora local, nascer e pôr do sol.
- Chance de chuva com cálculo refinado.
- Índice UV e qualidade do ar (AQI).

### 3) Compartilhamento

- Geração de resumo textual do cenário.
- Geração de imagem do card para compartilhamento.

### 4) Trânsito + clima no deslocamento

- Simulação de ETA por destino e modo.
- Reavaliação de risco por janela de partida e chegada.
- Alertas específicos para chuva e vento no intervalo da rota.
- Fallback para ETA local estimado quando Mapbox não está configurado.

### 5) Perfil de sensibilidade

O motor de risco pode ser ajustado conforme prioridade do usuário:

- Equilibrado
- Sensível ao calor
- Sensível à chuva
- Sensível ao vento
- Sensível à qualidade do ar

### 6) Janela segura de saída

- Sugere intervalo mais favorável nas próximas horas.
- Expõe confiança da estimativa.
- Considera modo de deslocamento e perfil de sensibilidade.

### 7) Confiabilidade da previsão

- Score por janela horária.
- Explicação de fatores usados.
- Leitura comparada entre sinais de resolução horária e de 3 horas.

### 8) Radar de chuva

- Mapa com overlay de precipitação.
- Sequência de frames para leitura temporal.
- Lista-resumo para consulta rápida da tendência de chuva.

### 9) Índice de exposição

Combina variáveis ambientais para estimar desconforto e risco situacional:

- Calor extremo
- Umidade crítica
- Qualidade do ar

O resultado é apresentado com score, severidade e drivers explicativos.

### 10) Insights narrativos

- Resumo por período do dia.
- Insights semanais por fator dominante.
- Cena do dia com explicação contextual.

### 11) Comparação de cidades

- Compara cidade base com cidade secundária.
- Destaca diferença de temperatura, chuva, vento, UV e AQI.

### 12) Favoritos, histórico e fuso

- Favoritos persistidos em armazenamento local.
- Histórico de pesquisas recentes.
- Painel de horários em cidades favoritas.

### 13) Modo adaptativo de interface

- Focus mobile: prioriza blocos essenciais para leitura rápida em telas menores.
- Analytic desktop: amplia visão comparativa e densidade de informação em telas maiores.

## Arquitetura e estrutura

Projeto frontend estático com JavaScript monolítico (sem framework), organizado por camadas funcionais dentro do arquivo principal.

### Estrutura de arquivos

- index.html: estrutura semântica da interface e montagem de seções.
- style.css: design system, temas, responsividade, animações e perfis visuais.
- script.js: estado global, integração com APIs, regras de negócio e renderização.
- service-worker.js: cache estático e runtime para resiliência offline.
- manifest.json: metadados da PWA.
- proxy-server.cjs: proxy opcional para esconder chave da OpenWeather.
- i18n-regression-check.cjs: validação de paridade de chaves entre idiomas.
- locales/pt-BR.json: idioma base e fallback principal.
- locales/en.json: tradução em inglês.
- locales/es.json: tradução em espanhol.
- locales/fr.json: tradução em francês.
- tests/smoke-static.cjs: smoke test estático de integridade mínima.

## Fluxo de dados e regras de negócio

1. Usuário escolhe cidade (busca ou geolocalização).
2. Frontend resolve coordenadas e consulta fontes meteorológicas.
3. Dados brutos são transformados em métricas derivadas (risco, exposição, confiabilidade).
4. Renderização atualiza painéis, alertas, radar e recomendações.
5. Preferências e estado recente são persistidos localmente para continuidade.

### Estratégias relevantes

- Cache de requests com deduplicação para reduzir chamadas redundantes.
- Fallback para dados recentes em erro transitório de rede.
- Blend de sinal de chuva em fontes distintas para melhorar assertividade.
- Degradação funcional para módulos opcionais (exemplo: ETA sem Mapbox).

## Setup local

### Pré-requisitos

- Node.js 18+ (recomendado para uso do fetch nativo no proxy).
- Um servidor HTTP local para servir arquivos estáticos.

### Execução do frontend

1. Sirva a pasta por HTTP (por exemplo, Live Server no VS Code).
2. Abra a URL local no navegador.

Observação: o carregamento de traduções em JSON depende de contexto HTTP; abrir o HTML direto via file system pode quebrar i18n e fetch de recursos.

## Configuração de chaves e proxy

O projeto suporta dois modos de operação para OpenWeather.

### Modo A: direto no cliente (simples para desenvolvimento)

- Configure API_KEY no topo de script.js.
- A chave fica visível no client-side.

### Modo B: proxy backend (recomendado)

- Defina a variável de ambiente OPENWEATHER_API_KEY.
- Inicie o proxy:

```bash
node .\proxy-server.cjs
```

- Defina a base do proxy antes de carregar script.js:

```html
<script>
  window.__WEATHER_PROXY_BASE__ = "http://localhost:8787";
</script>
```

### Endpoints expostos pelo proxy

- /api/weather
- /api/forecast
- /api/onecall
- /api/aqi
- /api/geocoding
- /api/reverse-geocoding

### Segurança

- Nunca publique chaves reais em repositórios públicos.
- Em ambiente produtivo, prefira sempre o modo proxy.

## PWA, cache e resiliência

- Manifest habilita instalação e metadados da aplicação.
- Service Worker aplica cache estático e runtime.
- Fallback offline é restrito a navegação (document requests), evitando respostas incorretas para assets de código.
- Versionamento de cache facilita invalidação de versões antigas após deploy.

## Testes e validações

### Regressão de i18n

Valida se todos os idiomas possuem as mesmas chaves do idioma base:

```bash
node .\i18n-regression-check.cjs
```

### Smoke test estático

Valida presença de blocos críticos de UI e contratos mínimos de JS/SW:

```bash
node .\tests\smoke-static.cjs
```

### Recomendação de rotina

Executar ambos os scripts antes de publicar alterações de interface, internacionalização ou cache.

## Observabilidade

- Telemetria local de eventos-chave de uso.
- Captura global de erros e unhandled rejections.
- Registro local útil para diagnóstico de regressões funcionais.

## Acessibilidade e UX

- Estrutura semântica por seções e artigos.
- Mensagens dinâmicas com aria-live.
- Leitura orientada a decisão rápida.
- Layout adaptativo por dispositivo para reduzir carga cognitiva.

## Limitações conhecidas

- Dependência de disponibilidade e cota de APIs externas.
- Cobertura de alguns dados atmosféricos pode variar por região.
- ETA de maior precisão depende da configuração do Mapbox.

## Roadmap sugerido

- Modularizar script.js em camadas (api, state, domain, ui).
- Adicionar testes funcionais de fluxo de busca e recomendação.
- Melhorar estratégia de versionamento de assets para deploy contínuo.
- Evoluir documentação de regras de score com exemplos quantitativos.

## Autor

Nunes
