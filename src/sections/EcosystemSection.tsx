import { useState, type FC } from "react";
import { Slide } from "../components/Slide";
import { CodeBlock } from "../components/CodeBlock";
import type { ResourceLink } from "../types";

const RESOURCES: ResourceLink[] = [
  {
    emoji: "📄",
    title: "Especificación W3C",
    url: "https://webmachinelearning.github.io/webmcp/",
    description:
      "La spec oficial del W3C Web Machine Learning Community Group. Draft actual con la API completa.",
    tag: "spec",
  },
  {
    emoji: "🐙",
    title: "GitHub — webmcp",
    url: "https://github.com/webmachinelearning/webmcp",
    description:
      "Repositorio principal con el explainer, proposal, use cases y discusiones abiertas.",
    tag: "código",
  },
  {
    emoji: "🧪",
    title: "Chrome Early Preview",
    url: "https://developer.chrome.com/blog/webmcp-epp",
    description:
      "Blog oficial de Chrome con instrucciones para activar WebMCP en Chrome 146 Canary.",
    tag: "preview",
  },
  {
    emoji: "📦",
    title: "MCP-B — Polyfill",
    url: "https://github.com/WebMCP-org/",
    description:
      "Implementa navigator.modelContext y traduce a JSON-RPC MCP. Funciona sin Chrome Canary.",
    tag: "polyfill",
  },
  {
    emoji: "⚛️",
    title: "Ejemplos React + Vanilla",
    url: "https://github.com/WebMCP-org/examples",
    description:
      "Shopping cart y task manager con useWebMCP() hook y registerTool(). Código production-ready.",
    tag: "ejemplos",
  },
  {
    emoji: "🍕",
    title: "webmcp-kit",
    url: "https://github.com/victorhuangwq/webmcp-kit",
    description:
      "Librería con defineTool() + Zod schemas + dev panel. Ejemplos de pizza y vuelos.",
    tag: "librería",
  },
  {
    emoji: "🎙️",
    title: "The New Stack — Entrevista",
    url: "https://thenewstack.io/how-webmcp-lets-developers-control-ai-agents-with-javascript/",
    description:
      "Entrevista con Kyle Pflug (Microsoft Edge) sobre arquitectura y visión del proyecto.",
    tag: "artículo",
  },
  {
    emoji: "🎓",
    title: "Codely — Tutorial ES",
    url: "https://codely.com/en/blog/what-is-webmcp-and-how-to-use-it",
    description:
      "Guía práctica en español con ambas APIs, setup paso a paso y mejores prácticas.",
    tag: "tutorial",
  },
];

const quickStartCode = `# 1. Descarga Chrome Canary (chrome.com/canary)
# 2. Activa el flag:
#    chrome://flags → "WebMCP for testing" → Enabled
# 3. Instala la extensión EPP de Google
# 4. Necesitas una API key de Gemini

# — Alternativa: Polyfill (sin Chrome Canary) —
npm install @mcp-b/global

# — Para React —
npm install @mcp-b/react-webmcp

# — Kit con Zod + DevTools —
npm install webmcp-kit`;

const ResourceCard: FC<{
  resource: ResourceLink;
}> = ({ resource }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        background: "var(--bg-card)",
        backdropFilter: "blur(20px)",
        border: `1px solid ${
          hovered ? "rgba(94,234,212,0.25)" : "rgba(94,234,212,0.06)"
        }`,
        borderRadius: "var(--radius-md)",
        padding: 20,
        textDecoration: "none",
        transition: "all 0.3s",
        flex: "1 1 260px",
        maxWidth: 340,
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered ? "var(--glow-electric)" : "none",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 10,
        }}
      >
        <span style={{ fontSize: 26 }}>{resource.emoji}</span>
        <span
          className="mono"
          style={{
            fontSize: 10,
            color: "var(--accent-electric)",
            background: "rgba(94,234,212,0.08)",
            padding: "3px 8px",
            borderRadius: "var(--radius-full)",
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          {resource.tag}
        </span>
      </div>
      <div
        style={{
          color: "var(--accent-electric)",
          fontWeight: 600,
          fontSize: 14,
          marginBottom: 6,
        }}
      >
        {resource.title}
      </div>
      <div
        style={{
          color: "var(--ink-muted)",
          fontSize: 12,
          lineHeight: 1.6,
        }}
      >
        {resource.description}
      </div>
    </a>
  );
};

export const EcosystemSection: FC = () => (
  <Slide id="ecosystem">
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
      Ecosistema y{" "}
      <span style={{ color: "var(--accent-electric)" }}>recursos</span>
    </h2>
    <p
      style={{
        color: "var(--ink-secondary)",
        textAlign: "center",
        maxWidth: 520,
        marginBottom: 50,
        fontSize: 16,
        fontWeight: 300,
        lineHeight: 1.7,
      }}
    >
      Documentación oficial, herramientas, polyfills y artículos clave para
      profundizar.
    </p>

    {/* Resource cards grid */}
    <div
      style={{
        display: "flex",
        gap: 16,
        flexWrap: "wrap",
        justifyContent: "center",
        maxWidth: 960,
        marginBottom: 44,
      }}
    >
      {RESOURCES.map((r) => (
        <ResourceCard key={r.title} resource={r} />
      ))}
    </div>

    {/* Quick Start */}
    <div style={{ maxWidth: 620, width: "100%" }}>
      <div
        className="mono"
        style={{
          color: "var(--accent-electric)",
          fontWeight: 600,
          fontSize: 13,
          marginBottom: 14,
          letterSpacing: "0.03em",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ fontSize: 16 }}>⚡</span> Quick Start — Pruébalo hoy
      </div>
      <CodeBlock
        code={quickStartCode}
        title="terminal"
        accent="var(--accent-electric)"
      />
    </div>
  </Slide>
);
