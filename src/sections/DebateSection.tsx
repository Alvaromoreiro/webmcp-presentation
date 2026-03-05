import { useState, type FC } from "react";
import { Slide } from "../components/Slide";
import type { DebateQuestion } from "../types";

const QUESTIONS: DebateQuestion[] = [
  {
    id: "q1",
    question:
      "¿WebMCP reemplazará a los browser agents basados en visión?",
    optionA: "Sí, es claramente superior",
    optionB: "No, coexistirán ambos enfoques",
  },
  {
    id: "q2",
    question:
      "¿Deberías implementar WebMCP en tus proyectos ahora?",
    optionA: "Sí, hay que ser early adopter",
    optionB: "No, esperar a que madure el estándar",
  },
  {
    id: "q3",
    question:
      "¿Es un riesgo de seguridad que las webs expongan tools a agentes IA?",
    optionA: "Sí, abre nuevos vectores de ataque",
    optionB: "No, el human-in-the-loop lo mitiga",
  },
];

const OPEN_QUESTIONS = [
  '¿Cómo afectará WebMCP al SEO? ¿Necesitaremos "Agent Optimization" además de SEO?',
  "Si cada web expone tools, ¿quién controla qué puede hacer un agente con mis datos?",
  "¿Cómo testeas que tus tools funcionan correctamente con diferentes agentes IA?",
  "¿Podría WebMCP hacer que las interfaces visuales sean menos relevantes a largo plazo?",
  "¿Qué implicaciones tiene para la accesibilidad web y las tecnologías asistivas?",
  "MCP vs WebMCP: ¿cuándo usar cada uno? ¿Una empresa necesita ambos?",
];

interface VoteState {
  a: number;
  b: number;
}

const QuestionCard: FC<{
  question: DebateQuestion;
}> = ({ question }) => {
  const [votes, setVotes] = useState<VoteState>({ a: 0, b: 0 });
  const [voted, setVoted] = useState<"a" | "b" | null>(null);

  const vote = (option: "a" | "b") => {
    if (voted) return;
    setVotes((p) => ({ ...p, [option]: p[option] + 1 }));
    setVoted(option);
  };

  const total = votes.a + votes.b;
  const pctA = total ? Math.round((votes.a / total) * 100) : 50;
  const pctB = total ? 100 - pctA : 50;

  return (
    <div
      className="glass"
      style={{
        borderRadius: "var(--radius-lg)",
        padding: 26,
        marginBottom: 18,
      }}
    >
      <div
        style={{
          color: "var(--ink-primary)",
          fontSize: 16,
          fontWeight: 600,
          marginBottom: 18,
          lineHeight: 1.5,
        }}
      >
        {question.question}
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
        {(["a", "b"] as const).map((opt) => {
          const isSelected = voted === opt;
          const color =
            opt === "a" ? "var(--accent-signal)" : "var(--accent-hot)";
          const text =
            opt === "a" ? question.optionA : question.optionB;
          return (
            <button
              key={opt}
              onClick={() => vote(opt)}
              style={{
                flex: 1,
                padding: "14px 18px",
                borderRadius: "var(--radius-sm)",
                border: `${isSelected ? "2px" : "1px"} solid ${
                  isSelected ? color : "rgba(255,255,255,0.06)"
                }`,
                background: isSelected
                  ? `${color}15`
                  : "rgba(0,0,0,0.2)",
                color: isSelected ? color : "var(--ink-secondary)",
                cursor: voted ? "default" : "pointer",
                fontSize: 14,
                transition: "all 0.25s",
                textAlign: "left",
                fontFamily: "var(--font-body)",
                lineHeight: 1.4,
                fontWeight: isSelected ? 600 : 400,
              }}
            >
              {text}
            </button>
          );
        })}
      </div>

      {/* Results bar */}
      {voted && (
        <>
          <div
            style={{
              height: 6,
              borderRadius: 3,
              overflow: "hidden",
              display: "flex",
              animation: "fadeUp 0.4s ease",
            }}
          >
            <div
              style={{
                width: `${pctA}%`,
                background: "var(--accent-signal)",
                transition: "width 0.5s ease",
              }}
            />
            <div
              style={{
                width: `${pctB}%`,
                background: "var(--accent-hot)",
                transition: "width 0.5s ease",
              }}
            />
          </div>
          <div
            className="mono"
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 8,
              fontSize: 12,
            }}
          >
            <span style={{ color: "var(--accent-signal)" }}>{pctA}%</span>
            <span style={{ color: "var(--accent-hot)" }}>{pctB}%</span>
          </div>
        </>
      )}
    </div>
  );
};

export const DebateSection: FC = () => (
  <Slide id="debate">
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
      Debate{" "}
      <span style={{ color: "var(--accent-hot)" }}>abierto</span>
    </h2>
    <p
      style={{
        color: "var(--ink-secondary)",
        textAlign: "center",
        maxWidth: 480,
        marginBottom: 50,
        fontSize: 16,
        fontWeight: 300,
        lineHeight: 1.7,
      }}
    >
      Vota, discute y comparte tu opinión con el grupo.
    </p>

    {/* Voting Questions */}
    <div style={{ width: "100%", maxWidth: 700, marginBottom: 30 }}>
      {QUESTIONS.map((q) => (
        <QuestionCard key={q.id} question={q} />
      ))}
    </div>

    {/* Open Discussion Questions */}
    <div
      className="glass"
      style={{
        width: "100%",
        maxWidth: 700,
        borderRadius: "var(--radius-lg)",
        padding: 28,
        borderColor: "rgba(251,113,133,0.12)",
      }}
    >
      <div
        className="mono"
        style={{
          color: "var(--accent-hot)",
          fontSize: 13,
          fontWeight: 600,
          marginBottom: 18,
          letterSpacing: "0.04em",
        }}
      >
        🎤 Preguntas para debate abierto
      </div>
      {OPEN_QUESTIONS.map((q, i) => (
        <div
          key={i}
          style={{
            color: "var(--ink-secondary)",
            fontSize: 14,
            padding: "10px 0",
            borderBottom:
              i < OPEN_QUESTIONS.length - 1
                ? "1px solid rgba(255,255,255,0.03)"
                : "none",
            display: "flex",
            gap: 12,
            alignItems: "flex-start",
            lineHeight: 1.6,
          }}
        >
          <span
            className="mono"
            style={{
              color: "var(--accent-hot)",
              fontSize: 11,
              opacity: 0.6,
              minWidth: 20,
              marginTop: 3,
            }}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          {q}
        </div>
      ))}
    </div>

    {/* Thank you */}
    <div
      style={{
        marginTop: 70,
        textAlign: "center",
      }}
    >
      <div
        className="serif"
        style={{
          fontSize: "clamp(36px, 6vw, 64px)",
          fontStyle: "italic",
          fontWeight: 400,
          marginBottom: 12,
        }}
      >
        <span className="gradient-text">¡Gracias!</span>
      </div>
      <p
        className="mono"
        style={{
          color: "var(--ink-muted)",
          fontSize: 12,
          letterSpacing: "0.06em",
        }}
      >
        WebMCP Presentation · Marzo 2026
      </p>
    </div>
  </Slide>
);
