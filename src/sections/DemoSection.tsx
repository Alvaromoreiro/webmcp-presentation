import { useState, useEffect, useRef, type FC } from "react";
import { Slide } from "../components/Slide";
import type { ToolDefinition, AgentLogEntry } from "../types";

const TOOLS: ToolDefinition[] = [
  {
    name: "searchProducts",
    icon: "🔍",
    description: "Buscar productos en el catálogo",
    schema: {
      type: "object",
      properties: {
        query: { type: "string" },
        maxPrice: { type: "number" },
      },
    },
    mockResult: JSON.stringify(
      {
        products: [
          { id: "p1", name: "Camiseta React", price: 29.99 },
          { id: "p2", name: "Hoodie TypeScript", price: 49.99 },
        ],
      },
      null,
      2
    ),
  },
  {
    name: "addToCart",
    icon: "🛒",
    description: "Añadir producto al carrito",
    schema: {
      type: "object",
      properties: {
        productId: { type: "string" },
        quantity: { type: "number" },
      },
    },
    mockResult: JSON.stringify(
      { success: true, cartTotal: 79.98, items: 2 },
      null,
      2
    ),
  },
  {
    name: "checkout",
    icon: "💳",
    description: "Procesar checkout completo",
    schema: {
      type: "object",
      properties: {
        paymentMethod: { type: "string" },
        shippingAddress: { type: "string" },
      },
    },
    mockResult: JSON.stringify(
      { orderId: "ORD-2026-4821", status: "confirmed", eta: "2 días" },
      null,
      2
    ),
  },
];

const ToolCard: FC<{
  tool: ToolDefinition;
  onExecute: () => void;
  result: string | null;
  isRunning: boolean;
}> = ({ tool, onExecute, result, isRunning }) => (
  <div
    className="glass"
    style={{
      borderRadius: "var(--radius-md)",
      padding: 22,
      width: 300,
      transition: "all 0.3s",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 14,
      }}
    >
      <span style={{ fontSize: 28 }}>{tool.icon}</span>
      <div>
        <div
          className="mono"
          style={{
            fontWeight: 600,
            color: "var(--ink-primary)",
            fontSize: 14,
          }}
        >
          {tool.name}
        </div>
        <div style={{ color: "var(--ink-muted)", fontSize: 12 }}>
          {tool.description}
        </div>
      </div>
    </div>

    {/* Schema preview */}
    <div
      className="mono"
      style={{
        background: "rgba(0,0,0,0.35)",
        borderRadius: "var(--radius-sm)",
        padding: 12,
        fontSize: 11,
        color: "var(--accent-signal)",
        marginBottom: 14,
        lineHeight: 1.6,
        maxHeight: 90,
        overflow: "auto",
        whiteSpace: "pre",
      }}
    >
      {JSON.stringify(tool.schema, null, 2)}
    </div>

    {/* Execute button */}
    <button
      onClick={onExecute}
      disabled={isRunning}
      style={{
        width: "100%",
        padding: "11px 0",
        borderRadius: "var(--radius-sm)",
        border: "none",
        background: isRunning
          ? "rgba(94,234,212,0.15)"
          : "linear-gradient(135deg, rgba(94,234,212,0.9), rgba(167,139,250,0.9))",
        color: isRunning ? "var(--ink-muted)" : "var(--bg-void)",
        fontWeight: 700,
        cursor: isRunning ? "wait" : "pointer",
        fontSize: 13,
        fontFamily: "var(--font-mono)",
        transition: "all 0.2s",
        letterSpacing: "0.02em",
      }}
    >
      {isRunning ? "⏳ ejecutando..." : "▶ ejecutar tool"}
    </button>

    {/* Result */}
    {result && (
      <div
        className="mono"
        style={{
          marginTop: 12,
          background: "rgba(94,234,212,0.06)",
          border: "1px solid rgba(94,234,212,0.18)",
          borderRadius: "var(--radius-sm)",
          padding: 12,
          fontSize: 11,
          color: "var(--accent-electric)",
          lineHeight: 1.6,
          animation: "fadeUp 0.3s ease",
          whiteSpace: "pre",
          maxHeight: 120,
          overflow: "auto",
        }}
      >
        {result}
      </div>
    )}
  </div>
);

export const DemoSection: FC = () => {
  const [results, setResults] = useState<Record<string, string | null>>({});
  const [running, setRunning] = useState<Record<string, boolean>>({});
  const [agentLog, setAgentLog] = useState<AgentLogEntry[]>([
    {
      type: "system",
      text: "◆ Agente IA conectado vía navigator.modelContext",
      timestamp: Date.now(),
    },
    {
      type: "discover",
      text: `◎ ${TOOLS.length} tools descubiertas en esta página`,
      timestamp: Date.now(),
    },
  ]);

  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current)
      logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [agentLog]);

  const executeTool = (tool: ToolDefinition) => {
    if (running[tool.name]) return;

    setRunning((p) => ({ ...p, [tool.name]: true }));
    setAgentLog((l) => [
      ...l,
      {
        type: "call",
        text: `▶ agent.invoke("${tool.name}", { ... })`,
        timestamp: Date.now(),
      },
    ]);

    setTimeout(() => {
      setRunning((p) => ({ ...p, [tool.name]: false }));
      setResults((p) => ({ ...p, [tool.name]: tool.mockResult }));
      setAgentLog((l) => [
        ...l,
        {
          type: "result",
          text: `✓ ${tool.name} → ${tool.mockResult.replace(/\n/g, "").slice(0, 60)}...`,
          timestamp: Date.now(),
        },
      ]);
    }, 1400);
  };

  const logColors: Record<AgentLogEntry["type"], string> = {
    system: "var(--ink-muted)",
    discover: "var(--accent-gold)",
    call: "var(--accent-signal)",
    result: "var(--accent-electric)",
    error: "var(--accent-hot)",
  };

  return (
    <Slide id="demo">
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
        Demo{" "}
        <span style={{ color: "var(--accent-electric)" }}>interactiva</span>
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
        Simula cómo un agente IA descubre e invoca tools registradas con WebMCP
        en una tienda online. Pulsa los botones para ver el flujo completo.
      </p>

      {/* Tool Cards */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          justifyContent: "center",
          marginBottom: 30,
          width: "100%",
          maxWidth: 1000,
        }}
      >
        {TOOLS.map((t) => (
          <ToolCard
            key={t.name}
            tool={t}
            onExecute={() => executeTool(t)}
            result={results[t.name] ?? null}
            isRunning={running[t.name] ?? false}
          />
        ))}
      </div>

      {/* Agent Activity Log */}
      <div
        style={{
          width: "100%",
          maxWidth: 720,
          background: "rgba(6,6,12,0.95)",
          border: "1px solid rgba(94,234,212,0.1)",
          borderRadius: "var(--radius-md)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "10px 18px",
            background: "rgba(94,234,212,0.04)",
            borderBottom: "1px solid rgba(94,234,212,0.08)",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "var(--accent-electric)",
              animation: "pulse-glow 2s infinite",
            }}
          />
          <span
            className="mono"
            style={{
              color: "var(--ink-muted)",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.04em",
            }}
          >
            agent activity log
          </span>
        </div>
        <div
          ref={logRef}
          className="mono"
          style={{
            padding: 16,
            maxHeight: 220,
            overflowY: "auto",
            fontSize: 12,
            lineHeight: 2,
          }}
        >
          {agentLog.map((entry, i) => (
            <div key={i} style={{ color: logColors[entry.type] }}>
              <span style={{ opacity: 0.35, marginRight: 10, fontSize: 10 }}>
                {new Date(entry.timestamp).toLocaleTimeString("es-ES", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </span>
              {entry.text}
            </div>
          ))}
        </div>
      </div>

      {/* Explanation */}
      <div
        className="glass"
        style={{
          marginTop: 30,
          maxWidth: 720,
          width: "100%",
          borderRadius: "var(--radius-md)",
          padding: 22,
          borderColor: "rgba(251,191,36,0.12)",
        }}
      >
        <div
          className="mono"
          style={{
            color: "var(--accent-gold)",
            fontSize: 12,
            fontWeight: 600,
            marginBottom: 10,
            letterSpacing: "0.04em",
          }}
        >
          ◆ ¿Qué estamos viendo?
        </div>
        <p
          style={{
            color: "var(--ink-secondary)",
            fontSize: 14,
            lineHeight: 1.7,
          }}
        >
          Cada card representa una{" "}
          <strong style={{ color: "var(--ink-primary)" }}>tool registrada</strong>{" "}
          que la web expone al agente vía{" "}
          <code className="mono" style={{ color: "var(--accent-electric)", fontSize: 13 }}>
            navigator.modelContext.registerTool()
          </code>
          . Cuando el agente invoca una tool, recibe JSON estructurado en vez de
          interpretar píxeles. Una sola llamada reemplaza docenas de interacciones
          de browser-use.
        </p>
      </div>
    </Slide>
  );
};
