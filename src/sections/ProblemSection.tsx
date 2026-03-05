import { useState, type FC } from "react";
import { Slide } from "../components/Slide";

interface ComparisonItem {
  id: string;
  title: string;
  emoji: string;
  color: string;
  steps: string[];
  stats: { label: string; value: string }[];
}

const comparisons: ComparisonItem[] = [
  {
    id: "before",
    title: "Hoy — Browser Use / CUA",
    emoji: "📸",
    color: "var(--accent-hot)",
    steps: [
      "Agente toma screenshot de la página",
      "Envía imagen a un modelo de visión (GPT-4o, etc.)",
      "El modelo interpreta píxeles y adivina botones",
      "Genera coordenadas de click estimadas",
      "Sintetiza eventos del DOM",
      "Si el UI cambia 5px... falla. Repite todo.",
    ],
    stats: [
      { label: "latencia", value: "~3-8s/acción" },
      { label: "precisión", value: "~45%" },
      { label: "coste", value: "$$$" },
    ],
  },
  {
    id: "after",
    title: "WebMCP — Tool Contract",
    emoji: "⚡",
    color: "var(--accent-electric)",
    steps: [
      "La web registra tools con schemas estructurados",
      "El agente descubre tools via navigator.modelContext",
      "Invoca la función directamente con JSON",
      "Recibe respuesta estructurada al instante",
      "Una sola llamada = una acción completa",
      "Inmune a cambios de UI. Resultado predecible.",
    ],
    stats: [
      { label: "latencia", value: "~100ms" },
      { label: "precisión", value: "~98%" },
      { label: "coste", value: "$" },
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
        El problema de los agentes{" "}
        <span style={{ color: "var(--accent-hot)" }}>hoy</span>
      </h2>
      <p
        style={{
          color: "var(--ink-secondary)",
          textAlign: "center",
          maxWidth: 540,
          marginBottom: 50,
          fontSize: 16,
          fontWeight: 300,
          lineHeight: 1.7,
        }}
      >
        Los agentes IA tratan la web como una imagen. Hacen screenshots,
        adivinan dónde clickar, y si el botón se mueve unos píxeles... todo
        falla.
      </p>

      <div
        style={{
          display: "flex",
          gap: 24,
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%",
          maxWidth: 860,
        }}
      >
        {comparisons.map((item) => {
          const isHovered = hoveredId === item.id;
          return (
            <div
              key={item.id}
              className="glass"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                flex: "1 1 380px",
                borderRadius: "var(--radius-lg)",
                padding: 30,
                transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                borderColor: isHovered
                  ? `${item.color}`
                  : "rgba(94,234,212,0.06)",
                boxShadow: isHovered
                  ? `0 0 60px ${item.color}12`
                  : "none",
                cursor: "default",
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 12 }}>
                {item.emoji}
              </div>
              <h3
                className="mono"
                style={{
                  color: item.color,
                  fontSize: 15,
                  fontWeight: 600,
                  marginBottom: 20,
                  letterSpacing: "0.02em",
                }}
              >
                {item.title}
              </h3>

              {item.steps.map((step, i) => (
                <div
                  key={i}
                  style={{
                    color: "var(--ink-secondary)",
                    fontSize: 14,
                    padding: "7px 0",
                    borderBottom:
                      i < item.steps.length - 1
                        ? "1px solid rgba(255,255,255,0.03)"
                        : "none",
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                    lineHeight: 1.5,
                  }}
                >
                  <span
                    className="mono"
                    style={{
                      color: item.color,
                      fontSize: 11,
                      opacity: 0.5,
                      minWidth: 18,
                      marginTop: 2,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {step}
                </div>
              ))}

              <div
                style={{
                  display: "flex",
                  gap: 10,
                  marginTop: 22,
                  flexWrap: "wrap",
                }}
              >
                {item.stats.map((s) => (
                  <div
                    key={s.label}
                    style={{
                      background: "rgba(0,0,0,0.3)",
                      borderRadius: "var(--radius-sm)",
                      padding: "7px 14px",
                      fontSize: 12,
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    <span style={{ color: "var(--ink-muted)" }}>
                      {s.label}:{" "}
                    </span>
                    <span style={{ color: item.color, fontWeight: 600 }}>
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Slide>
  );
};
