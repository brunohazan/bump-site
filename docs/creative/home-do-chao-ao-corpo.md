# BUMP Home — Direção criativa “Do chão ao corpo”

Status: protótipo navegável v0.1 implementado, ainda não aprovado para substituir a Home
Data: 13/08/2026
Entradas: vídeo de referência United Cargo + guia básico de estilo BUMP

## Checkpoint navegável v0.1

- Rota isolada: `/conceito-home`.
- Indexação: `noindex` e `nofollow` via metadata da rota.
- Home publicada: preservada sem alterações.
- Escopo implementado: Hero, mudança de terreno, compressão conceitual, controle e seção final de continuidade.
- Identidade aplicada: preto, branco e Amarelo Citrus `#D3FF1A`; Montserrat como fonte de corpo e fallback temporário de display enquanto a Horizon licenciada não está disponível.
- Assets: somente imagens BUMP já hospedadas; nenhuma fotografia de banco foi introduzida neste checkpoint.
- Acessibilidade de movimento: composição dedicada para mobile e versão estática completa em `prefers-reduced-motion`.
- Auditoria visual: desktop `1440×1000`, mobile `390×844` e reduced motion `390×844`, sem overflow horizontal; shell global oculto somente durante o conceito.
- Validação técnica: ESLint, TypeScript, build de produção e `git diff --check` aprovados.

Limitações conhecidas: a compressão usa transformação visual sobre um único asset e não constitui simulação técnica; Horizon, logo vetorial, estados reais comprimido/estendido, instalação e terrenos finais continuam pendentes. A migração para `/` depende de aprovação explícita.

## Ideia central

**Toda força procura um caminho. A BUMP decide quanto dela chega ao corpo.**

A Home acompanha visualmente o impacto desde o terreno até a cabine. O amortecedor não aparece como produto isolado: ele é o protagonista que recebe, controla e devolve energia. A câmera muda de perspectiva a cada capítulo, mas a história permanece contínua.

O objetivo não é acumular efeitos. É fazer o usuário sentir que percorreu o sistema de suspensão e entendeu, sem aula técnica, por que o corpo chega diferente ao fim do dia.

## O princípio aprendido com a referência

O site United Cargo usa objetos da operação para conduzir o scroll: globo, guindaste, caminhão, navio e avião. A adaptação BUMP usa objetos e forças próprias do produto:

- terreno;
- roda;
- impacto;
- haste;
- pistão e fluido;
- carroceria;
- corpo;
- recuperação do equipamento.

Cada objeto deve conduzir ao próximo capítulo, e não apenas decorar a seção atual.

## Jornada proposta

### 0. Prólogo — antes do impacto

Tela quase preta. Uma linha Amarelo Citrus desenha o perfil do terreno. Som, se usado, deve ser opcional e nunca iniciar automaticamente.

A câmera está baixa, próxima do chão. Conforme o usuário inicia o scroll, a textura do terreno ganha profundidade e a picape entra na cena.

Copy preservada:

- `Conforto que`
- `faz o corpo`
- `chegar inteiro.`

CTA continua visível sem depender da animação.

### 1. O terreno muda

A câmera acompanha a roda. Asfalto, costela de vaca, cascalho, barro e carga surgem como placas de cenário, não como carrossel tradicional.

Frase de transição: **O chão muda. A força continua procurando caminho.**

Interação:

- desktop: deslocamento lateral do terreno enquanto a roda permanece no eixo;
- mobile: cortes curtos entre três terrenos, sem parallax contínuo.

### 2. Compressão

A câmera entra na caixa de roda. O amortecedor assume o centro da tela e permanece pinned por um único capítulo.

O scroll controla uma compressão visual limitada:

1. roda sobe;
2. haste entra;
3. corpo da picape se desloca menos;
4. onda de impacto perde amplitude.

Copy: **O que para aqui não precisa chegar em você.**

Não representar medidas, curso ou dinâmica como simulação científica sem dados de engenharia. A cena é explicativa e deve ser identificada como visualização.

### 3. Dentro do amortecedor

Mudança de perspectiva: macro lateral para corte técnico abstrato. Partículas ou linhas mostram o fluido atravessando o pistão. A cor Amarelo Citrus marca apenas energia, labels e pontos de decisão.

Capítulos curtos:

- pressão;
- fluido;
- dissipação térmica;
- retorno.

A estética deve ser mecânica e precisa, evitando interface de videogame ou hologramas genéricos.

### 4. O corpo sente o resultado

A câmera sai do produto e chega à cabine. Em vez de mostrar uma pessoa genérica sorrindo, usamos uma visualização de duas ondas:

- impacto vindo do chão;
- impacto reduzido depois do amortecimento.

A headline da seção pode formar uma máscara pela qual a estrada continua passando.

Mensagem: **Conforto também é produtividade, atenção e corpo inteiro no fim do dia.**

### 5. Um acerto para cada rotina

O amortecedor central se transforma conforme o usuário escolhe:

- urbano e conforto;
- carga e agro;
- terra e trilha;
- viagem longa;
- projeto extremo.

O cenário, a altura visual da carga e a textura do terreno mudam. O componente atual `UseSelector` fornece a lógica, mas a apresentação deve virar uma cena contínua.

### 6. Anatomia das linhas

As seis linhas surgem ao redor de um eixo comum, como respostas diferentes para forças diferentes. Não usar grid de catálogo como primeira leitura.

Interação desktop:

- uma linha entra no centro;
- as demais permanecem como silhuetas laterais;
- benefício, uso e ficha mínima acompanham a troca.

Mobile:

- trilho horizontal com snap;
- produto inteiro sempre visível;
- sem rotação 3D obrigatória.

### 7. O tempo volta para a fábrica

A haste vira uma linha de tempo. O odômetro avança até o caso de `400 mil km` e então a câmera desmonta o produto em três etapas:

1. inspeção;
2. recuperação;
3. retorno ao trabalho.

Ressalva obrigatória: o caso é factual e não representa garantia universal de quilometragem.

### 8. Epílogo — recompor e configurar

As peças retornam ao conjunto completo. A câmera se afasta e revela novamente a picape, agora em outro terreno.

CTA: **Montar para o meu chão.**

O configurador recebe contexto de uso quando uma opção já foi escolhida durante a narrativa.

## Linguagem visual do guia oficial

- Base dominante: preto `#000000`.
- Texto prioritário: branco `#FFFFFF`.
- Amarelo Citrus `#D3FF1A`: energia, labels, curso, foco e CTA; nunca como preenchimento constante de toda cena.
- Seções brancas: usadas como “clarão” ou respiro entre capítulos densos, seguindo o manual.
- Títulos: Horizon quando o arquivo licenciado estiver disponível.
- Subtítulos e corpo: Montserrat.

A passagem preto → branco → Amarelo Citrus pode cumprir a função de mudança radical de cenário observada na referência, sem copiar sua identidade azul/logística.

## Uso de imagens de banco free

Aprovado para **concept art e cenários ambientais**, com estas regras:

### Pode usar

- macro de asfalto, cascalho, barro e poeira;
- estradas e paisagens sem marca concorrente evidente;
- chuva, partículas, fumaça e placas de textura;
- interiores e silhuetas usados apenas como atmosfera;
- elementos que serão substituídos na produção final.

### Não pode representar como real

- fábrica BUMP;
- fundador, equipe ou cliente;
- instalação do produto;
- produto BUMP;
- depoimento ou caso de uso atribuído;
- teste técnico, certificação ou resultado medido.

### Controle de licença

Para cada asset, registrar em um manifesto:

- arquivo local;
- autor;
- plataforma;
- URL original;
- licença na data do download;
- data de download;
- necessidade de crédito;
- uso temporário ou final.

Fontes preferenciais para pesquisa: Unsplash, Pexels, Pixabay e Wikimedia Commons. A licença deve ser verificada no item específico; o nome da plataforma sozinho não basta.

## Estratégia técnica

### Protótipo 1 — animatic sem dependência nova

- imagens em camadas;
- produto PNG/WebP recortado;
- CSS transforms e `IntersectionObserver`;
- SVG para ondas, labels e curso;
- uma única cena sticky longa: compressão/retorno;
- trocas de perspectiva por cortes e máscaras.

Objetivo: validar narrativa, timing e sensação antes de investir em 3D.

### Protótipo 2 — produção avançada

Somente após aprovação do animatic e recebimento de assets:

- sequência renderizada ou vídeo curto para compressão;
- Canvas para partículas do fluido, se necessário;
- WebGL/3D apenas se houver modelo confiável do amortecedor e ganho visual comprovado;
- nenhuma técnica avançada pode bloquear conteúdo, CTA ou scroll normal.

## Mobile

Mobile não será uma redução da cena desktop.

- máximo de uma cena pinned curta;
- cortes de câmera em vez de parallax longo;
- produto sempre reconhecível;
- nenhum texto dependente de posição absoluta frágil;
- preload mínimo;
- imagem estática completa em `prefers-reduced-motion`;
- CTA e conteúdo disponíveis sem JavaScript.

## Orçamento de performance inicial

- poster do Hero: até aproximadamente 250 KB em mobile;
- mídia animada acima da dobra: evitar; quando aprovada, oferecer formatos modernos e fallback;
- sequência principal: preferir vídeo/WebM a dezenas de PNGs;
- não carregar cenas abaixo da dobra antes da proximidade do viewport;
- manter LCP abaixo de 2,5 s e CLS abaixo de 0,1 como gates de produção.

## Assets necessários para o protótipo convincente

Prioridade alta:

1. amortecedor isolado em alta resolução, estendido;
2. amortecedor isolado comprimido ou sequência de compressão;
3. detalhe da haste, reservatório e fixações;
4. roda/caixa de roda com BUMP instalado;
5. picape em pelo menos três terrenos;
6. arquivo e licença da Horizon;
7. logo vetorial oficial.

Prioridade posterior:

- fábrica;
- fundador e equipe;
- processo de desmontagem e recuperação;
- áudio mecânico opcional;
- modelo 3D ou render técnico.

## Direções alternativas

### Anatomia do impacto

Mais técnica e abstrata. Foco em corte do amortecedor, ondas e engenharia. Menor dependência de fotografia de campo.

### O chão muda

Mais cinematográfica e ambiental. Foco em terrenos, câmera e picape. Exige fotografia ou vídeo muito melhor.

### Recomendação

Usar **Do chão ao corpo** como direção principal, combinando ambiente e engenharia. Ela conecta diretamente produto, terreno, conforto e a headline já aprovada, sem transformar a BUMP em marca genérica de aventura.

## Próximo gate

Antes de implementar a nova Home em produção:

1. receber ou definir os assets prioritários;
2. confirmar Horizon e licença;
3. montar storyboard de 8 cenas;
4. produzir animatic navegável de Hero + Terreno + Compressão;
5. validar com o cliente a intensidade de movimento;
6. somente então expandir o sistema para a Home completa.
