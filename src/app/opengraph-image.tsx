import { ImageResponse } from "next/og";

export const alt = "BUMP Amortecedores, conforto que faz o corpo chegar inteiro";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const heroImage =
  "https://pub-8f0b05c2503f42609136a4e1e55a9242.r2.dev/amortecedores/hero.png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "#000000",
        color: "#ffffff",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <img
        src={heroImage}
        alt=""
        width={1200}
        height={670}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          background:
            "linear-gradient(90deg, rgba(8,8,8,0.98) 0%, rgba(8,8,8,0.94) 36%, rgba(8,8,8,0.58) 61%, rgba(8,8,8,0.12) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          background:
            "linear-gradient(0deg, rgba(8,8,8,0.88) 0%, transparent 32%, rgba(8,8,8,0.28) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 12,
          height: "100%",
          display: "flex",
          background: "#fcf313",
        }}
      />

      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          width: 690,
          height: "100%",
          padding: "54px 0 42px 62px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              fontWeight: 900,
              letterSpacing: -1.5,
            }}
          >
            BUMP
          </div>
          <div
            style={{
              display: "flex",
              padding: "7px 12px",
              border: "1px solid rgba(252,243,19,0.55)",
              borderRadius: 999,
              color: "#fcf313",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 1.4,
            }}
          >
            AMORTECEDORES SOB MEDIDA
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 58,
            fontSize: 65,
            lineHeight: 0.92,
            fontWeight: 900,
            letterSpacing: -3.2,
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex" }}>Conforto que faz</div>
          <div style={{ display: "flex", color: "#fcf313" }}>o corpo</div>
          <div style={{ display: "flex" }}>chegar inteiro.</div>
        </div>

        <div
          style={{
            display: "flex",
            width: 570,
            marginTop: 25,
            color: "#d0d4d0",
            fontSize: 21,
            lineHeight: 1.35,
          }}
        >
          Engenharia própria para sua picape, seu trabalho e seu chão.
        </div>

        <div
          style={{
            display: "flex",
            gap: 24,
            marginTop: "auto",
            color: "#ffffff",
            fontSize: 15,
            fontWeight: 700,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ display: "flex", color: "#fcf313" }}>●</span>
            13+ anos de fábrica
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ display: "flex", color: "#fcf313" }}>●</span>
            2 anos de garantia
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ display: "flex", color: "#fcf313" }}>●</span>
            Feito no Brasil
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: 38,
          bottom: 30,
          display: "flex",
          padding: "12px 18px",
          borderRadius: 4,
          background: "rgba(8,8,8,0.78)",
          border: "1px solid rgba(255,255,255,0.18)",
          color: "#ffffff",
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: 0.8,
        }}
      >
        BUMPAMORTECEDORES.COM
      </div>
    </div>,
    size,
  );
}
