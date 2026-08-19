import type { Metadata } from "next";
import type { ReactNode } from "react";
import { faqItems, productLines, useCases } from "@/lib/site-data";
import s from "./wireframe.module.css";

export const metadata: Metadata = {
  title: "Wireframe — Home BUMP (revisão)",
  description: "Wireframe anotado da Home para revisão de conteúdo, ordem e tipografia.",
  robots: { index: false, follow: false },
  alternates: { canonical: undefined },
};

/* ------------------------------------------------------------------ */
/* Helpers de anotação                                                 */
/* ------------------------------------------------------------------ */

type Tone = "display" | "h" | "lead" | "eyebrow" | "body";

function Line({
  role,
  size,
  weight,
  tone = "body",
  note,
  children,
}: {
  role: string;
  size: string;
  weight?: string;
  tone?: Tone;
  note?: string;
  children: ReactNode;
}) {
  return (
    <div className={s.line}>
      <div className={s.lineMeta}>
        <span className={s.role}>{role}</span>
        <span className={s.size}>{size}</span>
        {weight ? <span className={s.weight}>peso {weight}</span> : null}
      </div>
      <div className={s.lineText} data-tone={tone}>
        {children}
      </div>
      {note ? <p className={s.note}>{note}</p> : null}
    </div>
  );
}

function ImageBox({
  label,
  position,
  dims,
  ratio,
  note,
}: {
  label: string;
  position: string;
  dims: string;
  ratio: string;
  note?: string;
}) {
  return (
    <div className={s.imageBox}>
      <span className={s.imageTag}>IMAGEM</span>
      <strong>{label}</strong>
      <dl>
        <div>
          <dt>Posição</dt>
          <dd>{position}</dd>
        </div>
        <div>
          <dt>Dimensão sugerida</dt>
          <dd>{dims}</dd>
        </div>
        <div>
          <dt>Proporção</dt>
          <dd>{ratio}</dd>
        </div>
      </dl>
      {note ? <p>{note}</p> : null}
    </div>
  );
}

function Ctas({ items }: { items: { label: string; variant: "primary" | "ghost" | "link" }[] }) {
  return (
    <div className={s.ctas}>
      {items.map((cta) => (
        <span key={cta.label} className={s.cta} data-variant={cta.variant}>
          {cta.label}
        </span>
      ))}
    </div>
  );
}

function Section({
  order,
  name,
  role,
  tag,
  children,
}: {
  order: string;
  name: string;
  role: string;
  tag?: string;
  children: ReactNode;
}) {
  return (
    <section className={s.block}>
      <header className={s.blockHead}>
        <span className={s.order}>{order}</span>
        <div>
          <h3>{name}</h3>
          <p>{role}</p>
        </div>
        {tag ? <span className={s.tag}>{tag}</span> : null}
      </header>
      <div className={s.blockBody}>{children}</div>
    </section>
  );
}

function Connector({ label }: { label: string }) {
  return (
    <div className={s.connector}>
      <span>{label}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Página                                                              */
/* ------------------------------------------------------------------ */

export default function WireframeHomePage() {
  return (
    <main className={s.page}>
      <div className={s.shell}>
        <header className={s.docHead}>
          <p className={s.docKicker}>Documento de revisão · Wireframe</p>
          <h1 className={s.docTitle}>Home BUMP — estrutura, conteúdo e tipografia</h1>
          <p className={s.docLead}>
            Este é um <strong>esqueleto anotado</strong> da Home, na ordem real das seções. Ele existe
            para você revisar e direcionar: <strong>ordem das informações</strong>, <strong>textos</strong>,{" "}
            <strong>tamanhos de fonte</strong> e <strong>posição/dimensão das imagens</strong>. Não é o
            layout final nem o visual definitivo — cores, fundos escuros, animações e o acabamento
            cinematográfico ficam de fora de propósito, para não distrair da decisão de conteúdo.
          </p>
          <div className={s.warn}>
            Tamanhos de fonte em <b>px aproximados</b>: o site usa fonte fluida (varia com a largura da
            tela), então mostramos a faixa <b>mínimo–máximo no desktop</b> e, quando muda bastante, o
            valor no celular. Fonte de interface: <b>Montserrat</b>. Cor de destaque: Citrus{" "}
            <b>#FCF313</b> sobre preto.
          </div>
          <div className={s.legend}>
            <span className={s.legendItem}>
              <i className={`${s.swatch} ${s.swatchText}`} /> bloco de texto
            </span>
            <span className={s.legendItem}>
              <i className={`${s.swatch} ${s.swatchImg}`} /> imagem / foto
            </span>
            <span className={s.legendItem}>
              <i className={`${s.swatch} ${s.swatchCta}`} /> botão (CTA)
            </span>
          </div>
        </header>

        {/* GLOBAL: HEADER */}
        <div className={s.global}>
          <span className={s.globalTag}>Global · Cabeçalho fixo (topo, em todas as páginas)</span>
          <p className={s.docLead}>
            Logo BUMP à esquerda; menu com “Linhas” e “A BUMP” (abrem submenu), links diretos e botão de
            ação. Fica transparente sobre o Hero e ganha fundo ao rolar.
          </p>
          <div className={s.globalRow}>
            <span>Logo BUMP (≈180×53px)</span>
            <span>Linhas ▾</span>
            <span>Tecnologia</span>
            <span>Aplicações</span>
            <span>Resultados</span>
            <span>A BUMP ▾</span>
            <span>CTA: Montar meu amortecedor</span>
          </div>
        </div>

        <div className={s.flow}>
          {/* 01–04 HERO */}
          <Section
            order="01–04"
            name="HERO — “Do chão ao corpo”"
            role="Tela cheia (100vh). Abertura em 4 estágios que se sucedem ao rolar."
            tag="Foto de fundo + produto"
          >
            <p className={s.docLead}>
              O Hero ocupa a primeira tela inteira e passa por quatro estágios de texto (o restante do
              layout — foto e produto — permanece). Cada estágio troca eyebrow, título e descrição.
            </p>

            <div className={s.cols} data-cols="side">
              <div>
                <p className={s.subhead}>Estágio 01 · O chão</p>
                <Line role="Eyebrow" size="≈11px" weight="700" tone="eyebrow">
                  01 · O chão
                </Line>
                <Line role="Título H1" size="≈51–125px · celular ~36–70px" weight="900" tone="display">
                  Conforto que faz o corpo chegar inteiro.
                </Line>
                <Line role="Descrição" size="≈15–19px" tone="lead">
                  Amortecedores desenvolvidos para a sua picape, a sua carga e o seu terreno. Menos impacto
                  acumulado, mais estabilidade com peso e mais controle onde o asfalto termina.
                </Line>
                <Ctas
                  items={[
                    { label: "Montar meu amortecedor", variant: "primary" },
                    { label: "Acompanhar a força", variant: "ghost" },
                  ]}
                />
                <Line role="Apoio" size="≈10px" tone="eyebrow" note="Texto pequeno abaixo dos botões.">
                  Role para entrar no sistema
                </Line>

                <p className={s.subhead}>Estágio 02 · O terreno muda</p>
                <Line role="Título H1" size="≈51–125px" weight="900" tone="display">
                  O chão muda. A força continua.
                </Line>
                <Line role="Descrição" size="≈15–19px" tone="lead">
                  Asfalto, cascalho, barro e carga alteram a frequência do impacto. O amortecedor precisa
                  responder ao uso real.
                </Line>

                <p className={s.subhead}>Estágio 03 · Compressão</p>
                <Line role="Título H1" size="≈51–125px" weight="900" tone="display">
                  O que para aqui não precisa chegar em você.
                </Line>
                <Line role="Descrição" size="≈15–19px" tone="lead">
                  A roda sobe, a haste entra e o conjunto controla a energia antes que a carroceria repita
                  todo o movimento.
                </Line>

                <p className={s.subhead}>Estágio 04 · Controle</p>
                <Line role="Título H1" size="≈46–109px" weight="900" tone="display">
                  Pressão, fluido e retorno viram conforto.
                </Line>
                <Line role="Descrição" size="≈15–19px" tone="lead">
                  Cada conjunto é calibrado para o peso e o uso reais da picape, não para uma média de
                  catálogo. Visualização conceitual; o acerto é confirmado antes da produção.
                </Line>
              </div>

              <div>
                <ImageBox
                  label="Foto do Hero — picape em terreno irregular"
                  position="Fundo, tela inteira (full-bleed)"
                  dims="≈2000×1200px (paisagem, grande)"
                  ratio="16:9 a 2:1"
                  note="Arquivo atual: amortecedores/hero.png. Sobre ela há um leve escurecimento para leitura do texto."
                />
                <div style={{ height: ".8rem" }} />
                <ImageBox
                  label="Amortecedor (produto) — Linha Premium"
                  position="Centro/direita, sobreposto à foto"
                  dims="≈48% da largura (desktop) · ~88% (celular)"
                  ratio="Vertical (produto sem fundo)"
                  note="Aparece com halo e escala de EXTENSÃO ↔ COMPRESSÃO ao lado."
                />
                <p className={s.subhead}>Trilho de estágios (lateral)</p>
                <div className={s.chips}>
                  <span className={s.chipItem}>01 O chão</span>
                  <span className={s.chipItem}>02 O terreno muda</span>
                  <span className={s.chipItem}>03 Compressão</span>
                  <span className={s.chipItem}>04 Controle</span>
                </div>
              </div>
            </div>
          </Section>

          <Connector label="Ponte de energia · 04 Controle → 05 O corpo (transição principal)" />

          {/* 05 O CORPO */}
          <Section order="05" name="O CORPO" role="A promessa central: acerto sob medida. Fundo claro.">
            <Line role="Código da seção" size="≈10px" weight="800" tone="eyebrow">
              05 · O corpo
            </Line>
            <Line role="Título H2" size="≈56–152px · celular ~48–91px" weight="900" tone="display">
              A última peça do sistema não é de metal.
            </Line>
            <Line
              role="Parágrafo"
              size="≈18–24px (1ª linha em negrito, maior)"
              tone="lead"
              note="A frase inicial em negrito funciona como abre-olhos do parágrafo."
            >
              <strong>Não existe uma pressão única para toda picape.</strong> Seu uso não é igual ao de
              outra picape, e seu amortecedor também não deveria ser. A BUMP calibra construção, pressão e
              curso para o peso, a altura e a rotina reais: menos impacto acumulado no corpo, mais
              estabilidade com carga e mais controle quando o asfalto termina.
            </Line>
            <p className={s.subhead}>Provas / números (faixa de confiança)</p>
            <div className={s.grid}>
              {[
                ["13+", "anos de fábrica"],
                ["2 anos", "contra vazamento"],
                ["Sob medida", "veículo e uso"],
                ["Brasil", "produção própria"],
                ["Envio", "nacional"],
              ].map(([a, b]) => (
                <div key={b} className={s.cell}>
                  <strong>{a}</strong>
                  <span>{b}</span>
                </div>
              ))}
            </div>
            <p className={s.note}>Números em ≈27–48px; rótulos em ≈10px maiúsculas.</p>
          </Section>

          <Connector label="Conector com picape animada percorrendo a estrada (05 → 06)" />

          {/* 06 USO */}
          <Section
            order="06"
            name="O USO DEFINE O ACERTO"
            role="Seletor de rotina: troca cena, produto e ponto de partida."
            tag="Foto de fundo + produto"
          >
            <Line role="Código da seção" size="≈10px" weight="800" tone="eyebrow">
              06 · O uso define o acerto
            </Line>
            <Line role="Título H2" size="≈48–120px" weight="900" tone="display">
              Qual chão repete no seu corpo todo dia?
            </Line>
            <Line role="Apoio" size="≈17px" tone="lead">
              Escolha a rotina. A cena, o produto e o ponto de partida mudam juntos.
            </Line>

            <p className={s.subhead}>Abas de uso (clicáveis)</p>
            <div className={s.chips}>
              {useCases.map((u, i) => (
                <span key={u.id} className={s.chipItem} data-active={i === 0}>
                  {u.number} {u.label}
                </span>
              ))}
              <span className={s.chipItem}>05 Projeto especial ↗</span>
            </div>

            <div className={s.cols} data-cols="side">
              <div>
                <p className={s.subhead}>Cena ativa (exemplo: Urbano → Performance)</p>
                <Line role="Rótulo" size="≈10px" tone="eyebrow">
                  Recomendado para Urbano e conforto
                </Line>
                <Line role="Título H3 (linha)" size="≈64–144px · celular ~32–45px" weight="900" tone="display">
                  Performance
                </Line>
                <Line role="Descrição" size="≈15px" tone="body">
                  Conforto diário, estabilidade e menos fadiga no fim do expediente. O acerto equilibrado
                  para quem trabalha durante a semana e não quer limitar a picape quando o chão muda.
                </Line>
                <Line role="Nota de investimento" size="≈11.5px" tone="body">
                  O investimento é definido após confirmar veículo, linha e configuração. O valor final é
                  apresentado no orçamento técnico.
                </Line>
                <Ctas
                  items={[
                    { label: "Montar essa linha", variant: "primary" },
                    { label: "Ver detalhes ↗", variant: "link" },
                  ]}
                />
              </div>
              <div>
                <ImageBox
                  label="Foto de cenário (muda por aba)"
                  position="Fundo da cena, tela inteira"
                  dims="≈1600×900px por rotina (urbano/agro/trilha/rally)"
                  ratio="16:9"
                  note="Arquivos: ram1500 / ranger / hilux / triton (banco_web_800)."
                />
                <div style={{ height: ".8rem" }} />
                <ImageBox
                  label="Amortecedor da linha recomendada"
                  position="Sobreposto, canto inferior direito"
                  dims="≈42% largura (desktop) · ~105% (celular)"
                  ratio="Vertical (sem fundo)"
                />
              </div>
            </div>
          </Section>

          {/* MARCAS */}
          <Section order="—" name="MARCAS COMPATÍVEIS" role="Faixa fina com logos rolando (marquee).">
            <Line role="Rótulo" size="≈9px" weight="800" tone="eyebrow">
              Picapes que encontram seu acerto
            </Line>
            <p className={s.subhead}>Logos (≈72×44px cada, em movimento horizontal)</p>
            <div className={s.chips}>
              {["Toyota", "Ford", "Chevrolet", "Mitsubishi", "Nissan", "Volkswagen", "RAM", "Jeep"].map(
                (b) => (
                  <span key={b} className={s.chipItem}>
                    {b}
                  </span>
                ),
              )}
            </div>
          </Section>

          <Connector label="Conector (marcas → engenharia)" />

          {/* 07 ENGENHARIA */}
          <Section order="07" name="DENTRO DO AMORTECEDOR" role="Engenharia em 4 pontos. Fundo escuro.">
            <div className={s.cols} data-cols="side">
              <div>
                <Line role="Código da seção" size="≈10px" weight="800" tone="eyebrow">
                  07 · Dentro do amortecedor
                </Line>
                <Line role="Título H2" size="≈48–96px" weight="900" tone="display">
                  A engenharia só termina quando chega ao corpo.
                </Line>
                <p className={s.subhead}>4 itens técnicos (título ≈24–42px · texto ≈14px)</p>
                {[
                  ["01", "Corpo duplo + monotubo", "Mais volume de fluido, proteção externa e resposta consistente quando a jornada se estende."],
                  ["02", "Haste de 20 mm", "Aço temperado e construção preparada para o trabalho mecânico do conjunto."],
                  ["03", "Pressão sob medida", "Veículo, carga, altura e uso orientam o acerto. Não existe uma pressão única para toda picape."],
                  ["04", "Recuperável", "O equipamento pode voltar à fábrica para desmontagem, inspeção e recuperação."],
                ].map(([n, t, d]) => (
                  <div key={n} className={s.line}>
                    <div className={s.lineMeta}>
                      <span className={s.role}>Item {n}</span>
                    </div>
                    <div className={s.lineText} data-tone="h">
                      {t}
                    </div>
                    <div className={s.lineText} data-tone="body" style={{ marginTop: ".2rem" }}>
                      {d}
                    </div>
                  </div>
                ))}
                <Ctas items={[{ label: "Entender toda a engenharia ↗", variant: "link" }]} />
              </div>
              <div>
                <ImageBox
                  label="Vista técnica do amortecedor"
                  position="Metade da seção (esquerda no desktop)"
                  dims="≈50% da largura da seção"
                  ratio="Vertical, girado ~7°"
                  note="Com anel animado de fluido e legenda PRESSÃO → FLUIDO → RETORNO."
                />
              </div>
            </div>
          </Section>

          <Connector label="Conector (engenharia → linhas)" />

          {/* 08 LINHAS */}
          <Section
            order="08"
            name="ANATOMIA DAS LINHAS"
            role="Carrossel das 6 linhas de produto. Fundo claro."
            tag="Produto por linha"
          >
            <Line role="Código da seção" size="≈10px" weight="800" tone="eyebrow">
              08 · Anatomia das linhas
            </Line>
            <Line role="Título H2" size="≈48–120px" weight="900" tone="display">
              Seis respostas. A força nunca é a mesma.
            </Line>

            <div className={s.cols} data-cols="side">
              <div>
                <p className={s.subhead}>Cartão da linha ativa (ex.: Performance)</p>
                <Line role="Badge" size="≈10px" tone="eyebrow">
                  Mais vendida
                </Line>
                <Line role="Nome (H3)" size="≈56–112px · celular ~34–60px" weight="900" tone="display">
                  Performance
                </Line>
                <Line role="Headline" size="≈20px" tone="h">
                  Conforto no asfalto sem perder firmeza na estrada.
                </Line>
                <Line role="Descrição" size="≈15px" tone="body">
                  O acerto equilibrado para quem trabalha durante a semana e não quer limitar a picape
                  quando o chão muda.
                </Line>
                <Ctas items={[{ label: "Explorar a linha ↗", variant: "link" }]} />
              </div>
              <div>
                <ImageBox
                  label="Amortecedor da linha (troca no carrossel)"
                  position="Centro do palco, com setas ← →"
                  dims="≈48% largura (desktop) · ~90% (celular)"
                  ratio="Vertical (sem fundo)"
                  note="Código da linha (ex.: BP-01) no canto superior."
                />
              </div>
            </div>

            <p className={s.subhead}>Índice das 6 linhas (rodapé da seção)</p>
            <div className={s.chips}>
              {productLines.map((l) => (
                <span key={l.slug} className={s.chipItem}>
                  {l.code} · {l.shortName}
                </span>
              ))}
            </div>
          </Section>

          <Connector label="Conector (linhas → resultados)" />

          {/* 09 RESULTADOS */}
          <Section order="09" name="O TEMPO VOLTA PARA A FÁBRICA" role="Prova de durabilidade. Fundo Citrus.">
            <Line role="Selo" size="≈9px" tone="eyebrow">
              CASO REAL · NÃO É GARANTIA UNIVERSAL
            </Line>
            <Line role="Número (odômetro)" size="≈80–240px · celular ~24vw" weight="900" tone="display">
              400.000 km
            </Line>
            <Line role="Código da seção" size="≈10px" weight="800" tone="eyebrow">
              09 · O tempo volta para a fábrica
            </Line>
            <Line role="Título H2" size="≈43–88px" weight="900" tone="display">
              Não virou descarte. Voltou ao trabalho.
            </Line>
            <Line role="Parágrafo" size="≈17px" tone="lead">
              Um equipamento real foi desmontado, inspecionado, recuperado e devolvido ao uso. O caso
              comprova a lógica recuperável da construção. Não promete a mesma quilometragem para toda
              aplicação.
            </Line>
            <Ctas items={[{ label: "Ver o caso com contexto ↗", variant: "link" }]} />
            <p className={s.subhead}>Ciclo recuperável (4 passos)</p>
            <div className={s.chips}>
              {["01 Desmontar", "02 Inspecionar", "03 Recuperar", "04 Retornar"].map((x) => (
                <span key={x} className={s.chipItem}>
                  {x}
                </span>
              ))}
            </div>
          </Section>

          <Connector label="Conector (resultados → autoridade)" />

          {/* 10 AUTORIDADE */}
          <Section order="10" name="AUTORIDADE COM AUTORIA" role="Cristian, o especialista. Dois cartões.">
            <Line role="Código da seção" size="≈10px" weight="800" tone="eyebrow">
              10 · Autoridade com autoria
            </Line>
            <Line role="Título H2" size="≈48–120px" weight="900" tone="display">
              Cristian: piloto antes de fabricante, especialista à frente do projeto.
            </Line>
            <div className={s.cols} data-cols="2">
              <div>
                <Line role="Rótulo" size="≈9px" tone="eyebrow">
                  CENÁRIO DE APLICAÇÃO
                </Line>
                <Line role="H3" size="≈37–64px" weight="900" tone="h">
                  Experiência que virou método.
                </Line>
                <Line role="Parágrafo" size="≈14px" tone="body">
                  Cristian levou o que sentia no volante para a engenharia e para a fábrica. É ele quem
                  define como cada conjunto responde ao peso, à altura e ao terreno informados.
                </Line>
                <Ctas items={[{ label: "Conhecer a história ↗", variant: "link" }]} />
              </div>
              <div>
                <Line role="Rótulo" size="≈9px" tone="eyebrow">
                  EVIDÊNCIA DECLARADA · LIMITES EXPLÍCITOS
                </Line>
                <Line role="H3" size="≈37–64px" weight="900" tone="h">
                  A fábrica continua depois da escolha.
                </Line>
                <Line role="Parágrafo" size="≈14px" tone="body">
                  Produção própria no Brasil, projeto sob medida, 2 anos contra vazamento e construção que
                  pode voltar à fábrica para recuperação.
                </Line>
                <Ctas items={[{ label: "Ver evidências ↗", variant: "link" }]} />
              </div>
            </div>
            <p className={s.note}>
              Sem foto obrigatória aqui hoje — se houver retrato do Cristian/fábrica, este é o ponto natural.
            </p>
          </Section>

          <Connector label="Conector (autoridade → CTA final)" />

          {/* 11 CTA FINAL */}
          <Section
            order="11"
            name="CTA FINAL — O PRÓXIMO CHÃO"
            role="Chamada de conversão. Tela cheia com foto."
            tag="Foto de fundo"
          >
            <div className={s.cols} data-cols="side">
              <div>
                <Line role="Código da seção" size="≈10px" weight="800" tone="eyebrow">
                  11 · O próximo chão
                </Line>
                <Line role="Título H2" size="≈56–136px · celular ~45–75px" weight="900" tone="display">
                  A estrada pode continuar ruim. Seu corpo não precisa repetir tudo.
                </Line>
                <Line role="Parágrafo" size="≈18px" tone="lead">
                  Conte o veículo, a carga e a rotina. A fábrica transforma contexto em um ponto de partida
                  técnico.
                </Line>
                <Ctas
                  items={[
                    { label: "Montar para o meu chão", variant: "primary" },
                    { label: "Falar com a BUMP", variant: "ghost" },
                  ]}
                />
              </div>
              <div>
                <ImageBox
                  label="Foto — picape pronta para o próximo terreno"
                  position="Fundo, tela inteira (com gradiente escuro à esquerda)"
                  dims="≈2000×1200px"
                  ratio="16:9 a 2:1"
                  note="Arquivo atual: banco_web_800/triton.webp."
                />
              </div>
            </div>
          </Section>

          <Connector label="Conector (CTA → FAQ)" />

          {/* 12 FAQ */}
          <Section order="12" name="ANTES DE DECIDIR (FAQ)" role="5 perguntas em acordeão. Fundo claro.">
            <Line role="Código da seção" size="≈10px" weight="800" tone="eyebrow">
              12 · Antes de decidir
            </Line>
            <Line role="Título H2" size="≈48–120px" weight="900" tone="display">
              Perguntas que também fazem parte do projeto.
            </Line>
            <p className={s.subhead}>Perguntas (≈19–35px) — resposta abre ao clicar</p>
            {faqItems.slice(0, 5).map((item, i) => (
              <div key={item.question} className={s.line}>
                <div className={s.lineMeta}>
                  <span className={s.role}>{`0${i + 1}`}</span>
                  <span className={s.size}>pergunta ≈19–35px · resposta ≈14px</span>
                </div>
                <div className={s.lineText} data-tone="h">
                  {item.question}
                </div>
                <div className={s.lineText} data-tone="body" style={{ marginTop: ".25rem" }}>
                  {item.answer}
                </div>
              </div>
            ))}
            <Ctas
              items={[
                { label: "Ver todas as dúvidas ↗", variant: "link" },
                { label: "Falar com a BUMP ↗", variant: "link" },
              ]}
            />
          </Section>

          <Connector label="Conector (FAQ → rodapé)" />
        </div>

        {/* GLOBAL: WHATSAPP */}
        <div className={s.global}>
          <span className={s.globalTag}>Global · Botão flutuante de WhatsApp</span>
          <p className={s.docLead}>
            Fixo no canto inferior direito, em todas as telas. Fundo Citrus, texto “Falar com especialista”
            (no celular vira só o ícone).
          </p>
        </div>

        {/* GLOBAL: FOOTER */}
        <div className={s.global}>
          <span className={s.globalTag}>Global · Rodapé (todas as páginas)</span>
          <div className={s.globalRow}>
            <span>Coluna “Linhas” (6 linhas)</span>
            <span>Coluna “A BUMP” (Quem somos, Tecnologia, Nacional ou importado, Resultados)</span>
            <span>Coluna “Ajuda” (Aplicações, FAQ, Contato, Configurador)</span>
            <span>Coluna “Contato” (WhatsApp, Telefone, E-mail, horário, Gravataí-RS, Instagram)</span>
          </div>
          <p className={s.note}>
            Rodapé legal: Política de Privacidade · Termos de Uso · CNPJ 18.052.960/0001-60 · © 2013–2026.
          </p>
        </div>

        <p className={s.docFoot}>
          Página temporária de revisão (não indexada). Para direcionar mudanças, use a numeração das
          seções (01–12) e os rótulos de cada texto (ex.: “Título H2 da seção 05”). A ordem das seções
          aqui é a ordem real de rolagem da Home.
        </p>
      </div>
    </main>
  );
}
