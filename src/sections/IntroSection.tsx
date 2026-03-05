import type { FC } from "react";
import { Slide } from "../components/Slide";
import { Counter } from "../components/Counter";

export const IntroSection: FC = () => (
  <Slide id="intro">
    {/* Badge */}
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "7px 18px",
        borderRadius: "var(--radius-full)",
        background: "rgba(94,234,212,0.06)",
        border: "1px solid rgba(94,234,212,0.15)",
        color: "var(--accent-electric)",
        fontSize: 12,
        fontWeight: 500,
        fontFamily: "var(--font-mono)",
        marginBottom: 32,
        animation: "fadeUp 0.8s ease both",
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: "var(--accent-electric)",
          animation: "pulse-glow 2s infinite",
        }}
      />
      W3C Community Group Draft · Chrome 146 Early Preview · Feb 2026
    </div>

    {/* Title */}
    <h1
      className="serif"
      style={{
        fontSize: "clamp(56px, 10vw, 120px)",
        fontWeight: 400,
        fontStyle: "italic",
        textAlign: "center",
        lineHeight: 1,
        marginBottom: 20,
        animation: "fadeUp 0.8s ease 0.15s both",
        color: "var(--ink-primary)",
        letterSpacing: "-0.02em",
      }}
    >
      Web
      <span className="gradient-text" style={{ fontStyle: "normal", fontWeight: 400 }}>
        MCP
      </span>
    </h1>

    {/* Subtitle */}
    <p
      style={{
        fontSize: "clamp(16px, 2.2vw, 21px)",
        color: "var(--ink-secondary)",
        textAlign: "center",
        maxWidth: 560,
        lineHeight: 1.7,
        marginBottom: 14,
        animation: "fadeUp 0.8s ease 0.3s both",
        fontWeight: 300,
      }}
    >
      Convierte cada página web en un{" "}
      <span
        className="mono"
        style={{
          color: "var(--accent-electric)",
          fontSize: "0.9em",
          background: "rgba(94,234,212,0.08)",
          padding: "2px 8px",
          borderRadius: 6,
        }}
      >
        servidor de tools
      </span>{" "}
      para agentes de IA.
    </p>
    <p
      style={{
        fontSize: 15,
        color: "var(--ink-muted)",
        textAlign: "center",
        maxWidth: 480,
        lineHeight: 1.6,
        marginBottom: 50,
        animation: "fadeUp 0.8s ease 0.4s both",
      }}
    >
      El puente entre la web diseñada para humanos y la web agéntica del futuro.
    </p>

    {/* Counters */}
    <div
      style={{
        display: "flex",
        gap: 50,
        flexWrap: "wrap",
        justifyContent: "center",
        animation: "fadeUp 0.8s ease 0.5s both",
      }}
    >
      <Counter
        end={98}
        suffix="%"
        label="precisión · con tools"
        color="var(--accent-electric)"
      />
      <Counter
        end={45}
        suffix="%"
        label="precisión · sin tools"
        color="var(--accent-hot)"
      />
      <Counter
        end={30}
        suffix="x"
        label="menos coste en tokens"
        color="var(--accent-signal)"
      />
    </div>

    {/* Scroll hint */}
    <div
      style={{
        marginTop: 60,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        animation: "fadeUp 0.8s ease 0.7s both",
      }}
    >
      <div
        style={{
          width: 1,
          height: 40,
          background:
            "linear-gradient(to bottom, transparent, var(--accent-electric))",
          animation: "pulse-glow 2s infinite",
        }}
      />
      <span
        className="mono"
        style={{
          color: "var(--ink-muted)",
          fontSize: 11,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        scroll
      </span>
    </div>
  </Slide>
);
