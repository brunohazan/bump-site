import type { Metadata } from "next";
import type { ReactNode } from "react";
import { faqItems, useCases } from "@/lib/site-data";
import s from "../wireframe-home/wireframe.module.css";

export const metadata: Metadata = {
  title: "Home v2 (enxuta) — wireframe de revisão",
  description: "Versão enxuta da Home, alinhada à proposta original, para validação de estrutura.",
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
/* Página — versão enxuta                                              */
/* ------------------------------------------------------------------ */

export default function HomeV2Page() {
  return (
    <main className={s.page}>
      <div className={s.shell}>
        <header className={s.docHead}>
          <p className={s.docKicker}>Documento de revisão · Wireframe v2 (enxuto)</p>
          <h1 className={s.docTitle}>Home BUMP — versão enxuta</h1>
          <p className={s.docLead}>
            Esta é a Home reduzida à <strong>estrutura da proposta original</strong>: 6 blocos de conteúdo
            + FAQ. Mesmo esqueleto anotado da versão anterior (ordem, textos, tamanhos de fonte, imagens),
            só que <strong>mais curta</strong>, para funcionar como carta de vendas enxuta. Continua sendo
            wireframe — não é o visual final.
          </p>

          <div className={s.warn}>
            <b>O que mudou em relação ao wireframe atual:</b>
            <ul className={s.metaList}>
              <li>
                <b>Saiu da Home:</b> “Anatomia das linhas” (as 6 linhas) → agora vive na página de produto{" "}
                <b>/linhas</b>. A Home só aponta para lá.
              </li>
              <li>
                <b>Condensado:</b> a seção “400.000 km” virou uma <b>linha de prova</b> dentro de “O corpo”
                (não ocupa mais uma seção inteira).
              </li>
              <li>
                <b>Enxugado:</b> “Dentro do amortecedor” passa a ser o bloco de <b>diferencial</b>, mais
                curto (3 pontos em vez de 4).
              </li>
              <li>
                <b>Mantido:</b> Hero, O corpo, O uso, Autoridade, CTA final e FAQ. Faixa de marcas
                permanece como faixa fina.
              </li>
              <li>
                <b>Mantido também:</b> a <b>pista animada com a picape</b> percorrendo a estrada (conector
                entre “O corpo” e “O uso”).
              </li>
            </ul>
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
          <div className={s.globalRow}>
            <span>Logo BUMP</span>
            <span>Linhas ▾</span>
            <span>Tecnologia</span>
            <span>Aplicações</span>
            <span>Resultados</span>
            <span>A BUMP ▾</span>
            <span>CTA: Montar meu amortecedor</span>
          </div>
        </div>

        <div className={s.flow}>
          {/* 01 HERO */}
          <Section
            order="01"
            name="HERO — “Do chão ao corpo”"
            role="Tela cheia (100vh). Abertura em 4 estágios ao rolar."
            tag="Foto de fundo + produto"
          >
            <div className={s.cols} data-cols="side">
              <div>
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
                <p className={s.subhead}>Demais estágios (mesma tela, texto troca ao rolar)</p>
                <Line role="Estágio 02" size="≈51–125px" weight="900" tone="h">
                  O chão muda. A força continua.
                </Line>
                <Line role="Estágio 03" size="≈51–125px" weight="900" tone="h">
                  O que para aqui não precisa chegar em você.
                </Line>
                <Line role="Estágio 04" size="≈46–109px" weight="900" tone="h">
                  Pressão, fluido e retorno viram conforto.
                </Line>
              </div>
              <div>
                <ImageBox
                  label="Foto do Hero — picape em terreno irregular"
                  position="Fundo, tela inteira (full-bleed)"
                  dims="≈2000×1200px"
                  ratio="16:9 a 2:1"
                />
                <div style={{ height: ".8rem" }} />
                <ImageBox
                  label="Amortecedor (produto)"
                  position="Centro/direita, sobreposto"
                  dims="≈48% da largura (desktop)"
                  ratio="Vertical (sem fundo)"
                />
              </div>
            </div>
          </Section>

          <Connector label="Transição principal (Hero → O corpo)" />

          {/* 02 O CORPO */}
          <Section order="02" name="O CORPO" role="Promessa central + provas. Inclui a prova dos 400 mil km.">
            <Line role="Código da seção" size="≈10px" weight="800" tone="eyebrow">
              02 · O corpo
            </Line>
            <Line role="Título H2" size="≈56–152px · celular ~48–91px" weight="900" tone="display">
              A última peça do sistema não é de metal.
            </Line>
            <Line role="Parágrafo" size="≈18–24px" tone="lead">
              <strong>Não existe uma pressão única para toda picape.</strong> A BUMP calibra construção,
              pressão e curso para o peso, a altura e a rotina reais: menos impacto acumulado no corpo, mais
              estabilidade com carga e mais controle quando o asfalto termina.
            </Line>

            <p className={s.subhead}>Provas / números</p>
            <div className={s.grid}>
              {[
                ["13+", "anos de fábrica"],
                ["2 anos", "contra vazamento"],
                ["Sob medida", "veículo e uso"],
                ["Brasil", "produção própria"],
              ].map(([a, b]) => (
                <div key={b} className={s.cell}>
                  <strong>{a}</strong>
                  <span>{b}</span>
                </div>
              ))}
            </div>

            <p className={s.subhead}>Linha de prova (era a seção “400 mil km”, agora condensada)</p>
            <Line
              role="Prova · destaque"
              size="≈17px (número em ≈27px)"
              tone="lead"
              note="Vira uma faixa curta de evidência, com link para o caso completo em /resultados."
            >
              <strong>Caso real: 400.000 km.</strong> Um equipamento foi desmontado, inspecionado,
              recuperado e voltou ao trabalho — prova da construção recuperável (não é garantia universal).
            </Line>
            <Ctas items={[{ label: "Ver o caso com contexto ↗", variant: "link" }]} />
          </Section>

          <Connector label="Conector com a picape animada percorrendo a estrada — MANTIDO (O corpo → O uso)" />

          {/* 03 O USO */}
          <Section
            order="03"
            name="O USO DEFINE O ACERTO"
            role="Seletor de rotina. A partir daqui o cliente vai para as linhas (produto)."
            tag="Foto de fundo + produto"
          >
            <Line role="Código da seção" size="≈10px" weight="800" tone="eyebrow">
              03 · O uso define o acerto
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
                <p className={s.subhead}>Cena ativa (ex.: Urbano → Performance)</p>
                <Line role="Rótulo" size="≈10px" tone="eyebrow">
                  Recomendado para Urbano e conforto
                </Line>
                <Line role="Título H3 (linha)" size="≈64–144px · celular ~32–45px" weight="900" tone="display">
                  Performance
                </Line>
                <Line role="Descrição" size="≈15px" tone="body">
                  Conforto diário, estabilidade e menos fadiga no fim do expediente.
                </Line>
                <Ctas
                  items={[
                    { label: "Montar essa linha", variant: "primary" },
                    { label: "Ver todas as linhas ↗", variant: "link" },
                  ]}
                />
                <p className={s.note}>
                  O botão “Ver todas as linhas” leva para <b>/linhas</b> — é aqui que entra a antiga seção
                  “Anatomia das linhas”, agora fora da Home.
                </p>
              </div>
              <div>
                <ImageBox
                  label="Foto de cenário (muda por aba)"
                  position="Fundo da cena, tela inteira"
                  dims="≈1600×900px por rotina"
                  ratio="16:9"
                />
                <div style={{ height: ".8rem" }} />
                <ImageBox
                  label="Amortecedor da linha recomendada"
                  position="Sobreposto, canto inferior direito"
                  dims="≈42% largura (desktop)"
                  ratio="Vertical (sem fundo)"
                />
              </div>
            </div>
          </Section>

          {/* MARCAS (faixa fina) */}
          <Section order="—" name="MARCAS COMPATÍVEIS" role="Faixa fina de confiança (mantida enxuta).">
            <Line role="Rótulo" size="≈9px" weight="800" tone="eyebrow">
              Picapes que encontram seu acerto
            </Line>
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

          <Connector label="Conector (marcas → diferencial)" />

          {/* 04 DIFERENCIAL / ENGENHARIA (enxuto) */}
          <Section order="04" name="POR QUE A BUMP É DIFERENTE" role="Diferencial/engenharia — versão curta (3 pontos).">
            <div className={s.cols} data-cols="side">
              <div>
                <Line role="Código da seção" size="≈10px" weight="800" tone="eyebrow">
                  04 · O diferencial
                </Line>
                <Line role="Título H2" size="≈48–96px" weight="900" tone="display">
                  A engenharia só termina quando chega ao corpo.
                </Line>
                <p className={s.subhead}>3 pontos (era 4) — título ≈24–42px · texto ≈14px</p>
                {[
                  ["01", "Corpo duplo + monotubo", "Mais volume de fluido, proteção externa e resposta consistente na jornada longa."],
                  ["02", "Pressão sob medida", "Veículo, carga, altura e uso orientam o acerto. Não existe uma pressão única para toda picape."],
                  ["03", "Recuperável", "O equipamento volta à fábrica para desmontagem, inspeção e recuperação."],
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
                <p className={s.note}>“Haste de 20 mm” sai daqui e vai para a página de Tecnologia.</p>
              </div>
              <div>
                <ImageBox
                  label="Vista técnica do amortecedor"
                  position="Metade da seção (esquerda no desktop)"
                  dims="≈50% da largura da seção"
                  ratio="Vertical, girado ~7°"
                />
              </div>
            </div>
          </Section>

          <Connector label="Conector (diferencial → autoridade)" />

          {/* 05 AUTORIDADE */}
          <Section order="05" name="AUTORIDADE COM AUTORIA" role="Cristian, o especialista. Dois cartões.">
            <Line role="Código da seção" size="≈10px" weight="800" tone="eyebrow">
              05 · Autoridade com autoria
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
                  define como cada conjunto responde ao peso, à altura e ao terreno.
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
          </Section>

          <Connector label="Conector (autoridade → CTA final)" />

          {/* 06 CTA FINAL */}
          <Section
            order="06"
            name="CTA FINAL — O PRÓXIMO CHÃO"
            role="Chamada de conversão. Tela cheia com foto."
            tag="Foto de fundo"
          >
            <div className={s.cols} data-cols="side">
              <div>
                <Line role="Código da seção" size="≈10px" weight="800" tone="eyebrow">
                  06 · O próximo chão
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
                  position="Fundo, tela inteira (gradiente escuro à esquerda)"
                  dims="≈2000×1200px"
                  ratio="16:9 a 2:1"
                />
              </div>
            </div>
          </Section>

          <Connector label="Conector (CTA → FAQ)" />

          {/* FAQ */}
          <Section order="FAQ" name="ANTES DE DECIDIR" role="5 perguntas em acordeão. Fundo claro.">
            <Line role="Código da seção" size="≈10px" weight="800" tone="eyebrow">
              Antes de decidir
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
        </div>

        {/* GLOBAL: WHATSAPP + FOOTER */}
        <div className={s.global}>
          <span className={s.globalTag}>Global · Botão flutuante de WhatsApp</span>
          <p className={s.docLead}>Fixo no canto inferior direito, em todas as telas.</p>
        </div>
        <div className={s.global}>
          <span className={s.globalTag}>Global · Rodapé (todas as páginas)</span>
          <div className={s.globalRow}>
            <span>Linhas (6)</span>
            <span>A BUMP</span>
            <span>Ajuda</span>
            <span>Contato · Gravataí-RS · Instagram</span>
          </div>
        </div>

        <p className={s.docFoot}>
          Página temporária de revisão (não indexada). Estrutura enxuta em 6 blocos + FAQ, alinhada à
          proposta original. Comparar com <b>/wireframe-home</b> (versão completa). Nada aqui é o visual
          final.
        </p>
      </div>
    </main>
  );
}
