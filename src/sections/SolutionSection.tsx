import type { FC } from "react";
import { Slide } from "../components/Slide";

interface TimelineEvent {
  date: string;
  text: string;
  color: string;
}

const timeline: TimelineEvent[] = [
  {
    date: "Ene 2025",
    text: "Alex Nahas (Amazon) crea MCP-B para resolver auth en el navegador",
    color: "var(--accent-gold)",
  },
  {
    date: "Ago 2025",
    text: "Google + Microsoft convergen en una especificación unificada en GitHub",
    color: "var(--accent-signal)",
  },
  {
    date: "Sep 2025",
    text: "W3C Web ML Community Group acepta la spec como deliverable formal",
    color: "var(--accent-hot)",
  },
  {
    date: "Feb 2026",
    text: "Google lanza primera implementación: Early Preview en Chrome 146 Canary",
    color: "var(--accent-electric)",
  },
];

const keyPlayers = [
  {
    emoji: "🏗️",
    label: "Google + Microsoft",
    sub: "Desarrollo conjunto",
  },
  { emoji: "🌐", label: "W3C", sub: "Estandarización" },
  {
    emoji: "🔌",
    label: "navigator.modelContext",
    sub: "Browser-native API",
  },
  { emoji: "🧩", label: "Compatible con MCP", sub: "Mismo modelo mental" },
];

export const SolutionSection: FC = () => (
  <Slide id="solution">
    <h2
      className="serif"
      style={{
        fontSize: "clamp(30px, 5vw, 52px)",
        fontStyle: "italic",
        fontWeight: 400,
        color: "var(--ink-primary)",
        textAlign: "center",
        marginBottom: 14,
      }}
    >
      WebMCP:{" "}
      <span style={{ color: "var(--accent-electric)" }}>la solución</span>
    </h2>
    <p
      style={{
        color: "var(--ink-secondary)",
        textAlign: "center",
        maxWidth: 560,
        marginBottom: 50,
        fontSize: 16,
        fontWeight: 300,
        lineHeight: 1.7,
      }}
    >
      Un estándar W3C que permite a las webs declarar sus capacidades como{" "}
      <span
        className="mono"
        style={{
          color: "var(--accent-electric)",
          fontSize: "0.9em",
          background: "rgba(94,234,212,0.08)",
          padding: "1px 7px",
          borderRadius: 5,
        }}
      >
        tools estructuradas
      </span>{" "}
      que los agentes descubren e invocan directamente.
    </p>

    {/* Timeline */}
    <div style={{ maxWidth: 580, width: "100%", position: "relative", marginBottom: 50 }}>
      <div
        style={{
          position: "absolute",
          left: 15,
          top: 4,
          bottom: 4,
          width: 2,
          background:
            "linear-gradient(to bottom, var(--accent-gold), var(--accent-signal), var(--accent-hot), var(--accent-electric))",
          opacity: 0.3,
          borderRadius: 1,
        }}
      />
      {timeline.map((e, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            gap: 22,
            alignItems: "flex-start",
            marginBottom: i < timeline.length - 1 ? 30 : 0,
            paddingLeft: 2,
          }}
        >
          <div
            style={{
              minWidth: 28,
              height: 28,
              borderRadius: "50%",
              background: `${e.color}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 800,
              color: "var(--bg-void)",
              position: "relative",
              zIndex: 1,
              fontFamily: "var(--font-mono)",
              boxShadow: `0 0 20px ${e.color}40`,
            }}
          >
            {i + 1}
          </div>
          <div style={{ paddingTop: 2 }}>
            <div
              className="mono"
              style={{
                color: e.color,
                fontSize: 12,
                fontWeight: 600,
                marginBottom: 5,
                letterSpacing: "0.04em",
              }}
            >
              {e.date}
            </div>
            <div
              style={{
                color: "var(--ink-secondary)",
                fontSize: 15,
                lineHeight: 1.5,
              }}
            >
              {e.text}
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Key Players */}
    <div
      style={{
        display: "flex",
        gap: 16,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {keyPlayers.map((b) => (
        <div
          key={b.label}
          className="glass"
          style={{
            borderRadius: "var(--radius-md)",
            padding: "18px 26px",
            textAlign: "center",
            minWidth: 150,
            transition: "all 0.3s",
          }}
        >
          <div style={{ fontSize: 30, marginBottom: 8 }}>{b.emoji}</div>
          <div
            style={{
              color: "var(--ink-primary)",
              fontWeight: 600,
              fontSize: 14,
              marginBottom: 2,
            }}
          >
            {b.label}
          </div>
          <div
            className="mono"
            style={{
              color: "var(--ink-muted)",
              fontSize: 11,
            }}
          >
            {b.sub}
          </div>
        </div>
      ))}
    </div>

    {/* Key Concept Box */}
    <div
      className="glass"
      style={{
        marginTop: 40,
        maxWidth: 640,
        width: "100%",
        borderRadius: "var(--radius-lg)",
        padding: 28,
        borderColor: "rgba(167,139,250,0.15)",
      }}
    >
      <div
        className="mono"
        style={{
          color: "var(--accent-signal)",
          fontSize: 13,
          fontWeight: 600,
          marginBottom: 14,
          letterSpacing: "0.03em",
        }}
      >
        ◆ Concepto clave
      </div>
      <p style={{ color: "var(--ink-secondary)", fontSize: 15, lineHeight: 1.7 }}>
        Las páginas que usan WebMCP se comportan como{" "}
        <strong style={{ color: "var(--ink-primary)" }}>
          servidores MCP que ejecutan tools en JavaScript del lado cliente
        </strong>
        , en vez de en un backend separado. El navegador gestiona toda la
        comunicación entre la web y el agente IA, aplicando las mismas políticas
        de seguridad que ya conoces: same-origin, HTTPS, CSP.
      </p>
    </div>
  </Slide>
);
