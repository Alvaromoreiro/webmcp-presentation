import { useState, type FC } from "react";
import { Slide } from "../components/Slide";

interface ApproachItem {
  id: string;
  title: string;
  emoji: string;
  color: string;
  who: string;
  steps: string[];
  pros: string[];
  cons: string[];
}

const approaches: ApproachItem[] = [
  {
    id: "vision",
    title: "Visión pura",
    emoji: "📸",
    color: "var(--accent-hot)",
    who: "Skyvern v1, WebVoyager, VimGPT",
    steps: [
      "Captura screenshot de la página",
      "Envía imagen a modelo multimodal (GPT-4o...)",
      "Interpreta píxeles para localizar elementos",
      "Genera coordenadas de click estimadas",
    ],
    pros: ["Funciona en cualquier web, incluso canvas/Figma"],
    cons: [
      "+0.8s latencia por cada screenshot (image encoder)",
      "10-20x más caro en tokens que leer HTML",
      "Falla con cambios sutiles de estado entre capturas",
    ],
  },
  {
    id: "dom",
    title: "DOM / Accessibility Tree",
    emoji: "🌳",
    color: "var(--accent-gold)",
    who: "Browser-Use 1.0, Agent-E, Playwright MCP",
    steps: [
      "Parsea el DOM o extrae el accessibility tree",
      "Crea representación textual con refs (@e1, @e2...)",
      "El LLM razona sobre la estructura de la página",
      "Ejecuta acciones sobre elementos referenciados",
    ],
    pros: [
      "Mucho más rápido (~3s/paso vs ~5-8s con visión)",
      "~200-400 tokens vs ~3000-5000 de un DOM completo",
    ],
    cons: [
      "Falla en formularios dinámicos que cambian tras input",
      "No ve contenido en canvas, imágenes o layouts complejos",
    ],
  },
  {
    id: "hybrid",
    title: "Híbrido (la norma hoy)",
    emoji: "🔀",
    color: "var(--accent-signal)",
    who: "OpenAI Atlas/CUA, Perplexity Comet, ChatGPT Agent",
    steps: [
      "Usa accessibility tree como base principal",
      "Cae a visión solo cuando es necesario (canvas, CAPTCHA)",
      "Combina ambas señales para decidir acciones",
      "Múltiples round-trips por cada tarea completa",
    ],
    pros: [
      "Lo más fiable hoy en producción",
      "Adapta el enfoque según la complejidad de la página",
    ],
    cons: [
      "Sigue infiriendo estructura desde fuera",
      "Éxito en producción: 30%-89% según herramienta y tarea",
    ],
  },
];

export const ProblemSection: FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <Slide id="problem">
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
        Cómo interactúan los agentes con la web{" "}
        <span style={{ color: "var(--accent-hot)" }}>hoy</span>
      </h2>
      <p
        style={{
          color: "var(--ink-secondary)",
          textAlign: "center",
          maxWidth: 600,
          marginBottom: 50,
          fontSize: 16,
          fontWeight: 300,
          lineHeight: 1.7,
        }}
      >
        Existen tres enfoques principales. Los agentes de producción usan
        híbridos, pero todos comparten el mismo problema de fondo:{" "}
        <strong style={{ color: "var(--ink-primary)" }}>
          el agente tiene que inferir la estructura de la página desde fuera.
        </strong>
      </p>

      {/* Three approach cards */}
      <div
        style={{
          display: "flex",
          gap: 18,
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%",
          maxWidth: 1060,
          marginBottom: 36,
        }}
      >
        {approaches.map((item) => {
          const isHovered = hoveredId === item.id;
          return (
            <div
              key={item.id}
              className="glass"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                flex: "1 1 310px",
                maxWidth: 340,
                borderRadius: "var(--radius-lg)",
                padding: 26,
                transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                borderColor: isHovered
                  ? item.color
                  : "rgba(94,234,212,0.06)",
                boxShadow: isHovered ? `0 0 50px ${item.color}10` : "none",
                cursor: "default",
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 10 }}>
                {item.emoji}
              </div>
              <h3
                className="mono"
                style={{
                  color: item.color,
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: 6,
                  letterSpacing: "0.02em",
                }}
              >
                {item.title}
              </h3>
              <div
                style={{
                  color: "var(--ink-muted)",
                  fontSize: 11,
                  marginBottom: 18,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {item.who}
              </div>

              {item.steps.map((step, i) => (
                <div
                  key={i}
                  style={{
                    color: "var(--ink-secondary)",
                    fontSize: 13,
                    padding: "5px 0",
                    borderBottom:
                      i < item.steps.length - 1
                        ? "1px solid rgba(255,255,255,0.03)"
                        : "none",
                    display: "flex",
                    gap: 9,
                    alignItems: "flex-start",
                    lineHeight: 1.5,
                  }}
                >
                  <span
                    className="mono"
                    style={{
                      color: item.color,
                      fontSize: 10,
                      opacity: 0.5,
                      minWidth: 16,
                      marginTop: 2,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {step}
                </div>
              ))}

              <div style={{ marginTop: 16 }}>
                {item.pros.map((p, i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: 12,
                      color: "var(--accent-electric)",
                      padding: "3px 0",
                      display: "flex",
                      gap: 6,
                      lineHeight: 1.4,
                    }}
                  >
                    <span style={{ opacity: 0.6 }}>✓</span> {p}
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 8 }}>
                {item.cons.map((c, i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: 12,
                      color: "var(--accent-hot)",
                      padding: "3px 0",
                      display: "flex",
                      gap: 6,
                      lineHeight: 1.4,
                    }}
                  >
                    <span style={{ opacity: 0.6 }}>✗</span> {c}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom: the shared problem */}
      <div
        className="glass"
        style={{
          maxWidth: 740,
          width: "100%",
          borderRadius: "var(--radius-lg)",
          padding: 28,
          borderColor: "rgba(251,113,133,0.15)",
          textAlign: "center",
        }}
      >
        <div
          className="mono"
          style={{
            color: "var(--accent-hot)",
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 14,
            letterSpacing: "0.04em",
          }}
        >
          ✗ El problema compartido
        </div>
        <p
          style={{
            color: "var(--ink-secondary)",
            fontSize: 15,
            lineHeight: 1.7,
            maxWidth: 600,
            margin: "0 auto",
          }}
        >
          Da igual el enfoque: el agente siempre{" "}
          <strong style={{ color: "var(--ink-primary)" }}>
            adivina desde fuera
          </strong>{" "}
          qué puede hacer la web. Cada interacción requiere múltiples
          round-trips. Si la estructura cambia, se rompe. Las tasas de éxito en
          producción oscilan entre el{" "}
          <span className="mono" style={{ color: "var(--accent-hot)" }}>
            30%
          </span>{" "}
          y el{" "}
          <span className="mono" style={{ color: "var(--accent-gold)" }}>
            89%
          </span>{" "}
          según herramienta y tarea.
        </p>
        <div
          style={{
            marginTop: 20,
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {[
            { label: "latencia/screenshot", value: "+0.8s", src: "Browser-Use benchmark" },
            { label: "visión vs DOM coste", value: "10-20x", src: "AIMultiple" },
            { label: "éxito producción", value: "30-89%", src: "Firecrawl survey" },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: "rgba(0,0,0,0.3)",
                borderRadius: "var(--radius-sm)",
                padding: "8px 16px",
                fontSize: 12,
                fontFamily: "var(--font-mono)",
                textAlign: "left",
              }}
            >
              <div style={{ color: "var(--ink-muted)", marginBottom: 2 }}>
                {s.label}
              </div>
              <div style={{ color: "var(--accent-hot)", fontWeight: 600, fontSize: 16 }}>
                {s.value}
              </div>
              <div style={{ color: "var(--ink-muted)", fontSize: 10, opacity: 0.6, marginTop: 2 }}>
                {s.src}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
};
