import type { FC } from "react";
import { Slide } from "../components/Slide";
import { CodeBlock } from "../components/CodeBlock";

const declarativeCode = `<!-- Añade atributos a tu <form> existente -->
<form
  toolname="search-products"
  tooldescription="Buscar productos por nombre y precio"
  action="/search"
  method="GET"
>
  <input name="query" type="text" />
  <input name="maxPrice" type="number" />
  <button type="submit">Buscar</button>
</form>

<!-- El navegador genera automáticamente
     el JSON Schema desde los campos del form.
     El agente puede pre-rellenar y enviar.
     SubmitEvent.agentInvoked = true cuando
     el submit viene de un agente IA. -->`;

const imperativeCode = `// API Imperativa — JavaScript
navigator.modelContext.registerTool({
  name: "addToCart",
  description: "Añade un producto al carrito de compra",
  inputSchema: {
    type: "object",
    properties: {
      productId: {
        type: "string",
        description: "ID del producto"
      },
      quantity: {
        type: "number",
        description: "Cantidad a añadir"
      }
    },
    required: ["productId"]
  },
  async execute({ productId, quantity = 1 }) {
    const result = await cart.add(productId, quantity);
    return {
      content: [{
        type: "text",
        text: JSON.stringify(result)
      }]
    };
  }
});`;

const reactHookCode = `// React Hook — @mcp-b/react-webmcp
import { useWebMCP } from "@mcp-b/react-webmcp";
import { z } from "zod";

function ProductPage() {
  const { cartItems } = useAppState();

  useWebMCP({
    name: "get_cart",
    description: "Obtener items del carrito actual",
    schema: z.object({}),
    execute: async () => {
      return JSON.stringify(cartItems);
    }
  });

  // Tu componente React normal...
}`;

const methods = [
  {
    m: "registerTool()",
    d: "Añade una tool sin eliminar las demás",
    color: "var(--accent-electric)",
  },
  {
    m: "unregisterTool(name)",
    d: "Elimina una tool específica por nombre",
    color: "var(--accent-hot)",
  },
  {
    m: "provideContext(tools)",
    d: "Reemplaza el set completo de tools (ideal para cambios de estado)",
    color: "var(--accent-signal)",
  },
  {
    m: "clearContext()",
    d: "Elimina todas las tools registradas",
    color: "var(--accent-gold)",
  },
];

export const ApisSection: FC = () => (
  <Slide id="apis">
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
      Las dos{" "}
      <span style={{ color: "var(--accent-electric)" }}>APIs</span>
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
      WebMCP ofrece una API declarativa para forms HTML y una imperativa para
      interacciones complejas con JavaScript. Ambas convergen en{" "}
      <code
        className="mono"
        style={{
          color: "var(--accent-electric)",
          fontSize: 14,
          background: "rgba(94,234,212,0.08)",
          padding: "1px 6px",
          borderRadius: 4,
        }}
      >
        navigator.modelContext
      </code>
      .
    </p>

    {/* Two columns: Declarative / Imperative */}
    <div
      style={{
        display: "flex",
        gap: 24,
        flexWrap: "wrap",
        justifyContent: "center",
        width: "100%",
        maxWidth: 960,
        marginBottom: 32,
      }}
    >
      <div style={{ flex: "1 1 420px" }}>
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
          <span style={{ fontSize: 18 }}>📋</span> API Declarativa — HTML
        </div>
        <CodeBlock
          code={declarativeCode}
          title="product-search.html"
          accent="var(--accent-electric)"
        />
      </div>

      <div style={{ flex: "1 1 420px" }}>
        <div
          className="mono"
          style={{
            color: "var(--accent-signal)",
            fontWeight: 600,
            fontSize: 13,
            marginBottom: 14,
            letterSpacing: "0.03em",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 18 }}>⚡</span> API Imperativa — JavaScript
        </div>
        <CodeBlock
          code={imperativeCode}
          title="register-tool.ts"
          accent="var(--accent-signal)"
        />
      </div>
    </div>

    {/* React Hook example */}
    <div style={{ width: "100%", maxWidth: 580, marginBottom: 36 }}>
      <div
        className="mono"
        style={{
          color: "var(--accent-sky)",
          fontWeight: 600,
          fontSize: 13,
          marginBottom: 14,
          letterSpacing: "0.03em",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ fontSize: 18 }}>⚛️</span> React Hook —
        useWebMCP()
      </div>
      <CodeBlock
        code={reactHookCode}
        title="ProductPage.tsx"
        accent="var(--accent-sky)"
      />
    </div>

    {/* Methods grid */}
    <div style={{ maxWidth: 640, width: "100%" }}>
      <div
        className="mono"
        style={{
          color: "var(--accent-gold)",
          fontWeight: 600,
          fontSize: 13,
          marginBottom: 14,
          letterSpacing: "0.03em",
        }}
      >
        ◎ Métodos de navigator.modelContext
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 10,
        }}
      >
        {methods.map((item) => (
          <div
            key={item.m}
            className="glass"
            style={{
              borderRadius: "var(--radius-sm)",
              padding: "14px 18px",
              borderColor: `${item.color}18`,
            }}
          >
            <code
              className="mono"
              style={{
                color: item.color,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {item.m}
            </code>
            <div
              style={{
                color: "var(--ink-muted)",
                fontSize: 12,
                marginTop: 5,
                lineHeight: 1.5,
              }}
            >
              {item.d}
            </div>
          </div>
        ))}
      </div>
    </div>
  </Slide>
);
