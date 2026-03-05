import { useState, type FC } from "react";

interface CodeBlockProps {
  code: string;
  title?: string;
  accent?: string;
}

export const CodeBlock: FC<CodeBlockProps> = ({
  code,
  title,
  accent = "var(--accent-electric)",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div
      style={{
        background: "rgba(8, 8, 18, 0.95)",
        border: `1px solid ${accent}22`,
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        fontFamily: "var(--font-mono)",
        fontSize: 13,
        width: "100%",
        transition: "border-color 0.3s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = `${accent}44`)
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = `${accent}22`)
      }
    >
      {/* Header bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "9px 16px",
          background: `${accent}08`,
          borderBottom: `1px solid ${accent}15`,
        }}
      >
        <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
          <span
            style={{
              width: 11,
              height: 11,
              borderRadius: "50%",
              background: "#ef4444",
              opacity: 0.8,
            }}
          />
          <span
            style={{
              width: 11,
              height: 11,
              borderRadius: "50%",
              background: "#eab308",
              opacity: 0.8,
            }}
          />
          <span
            style={{
              width: 11,
              height: 11,
              borderRadius: "50%",
              background: "#22c55e",
              opacity: 0.8,
            }}
          />
          {title && (
            <span
              style={{
                color: "var(--ink-muted)",
                marginLeft: 10,
                fontSize: 12,
                fontWeight: 500,
              }}
            >
              {title}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          style={{
            background: "none",
            border: `1px solid ${accent}25`,
            borderRadius: 6,
            color: copied ? accent : "var(--ink-muted)",
            padding: "3px 12px",
            cursor: "pointer",
            fontSize: 11,
            fontFamily: "var(--font-mono)",
            transition: "all 0.2s",
          }}
        >
          {copied ? "✓ copiado" : "copiar"}
        </button>
      </div>
      {/* Code body */}
      <pre
        style={{
          margin: 0,
          padding: "18px 20px",
          overflowX: "auto",
          color: "var(--ink-primary)",
          lineHeight: 1.75,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          tabSize: 2,
        }}
      >
        {code}
      </pre>
    </div>
  );
};
