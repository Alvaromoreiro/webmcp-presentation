import { useEffect, useRef, useState, type FC } from "react";
import { SECTIONS, type SectionId } from "../types";

interface NavProps {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
}

export const Navigation: FC<NavProps> = ({ activeSection, onNavigate }) => {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      setVisible(y < lastY.current || y < 80);
      lastY.current = y;
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "rgba(6,6,12,0.82)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(94,234,212,0.06)",
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          padding: "10px 12px",
          flexWrap: "wrap",
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        {SECTIONS.map((s) => {
          const isActive = activeSection === s.id;
          return (
            <button
              key={s.id}
              onClick={() => onNavigate(s.id)}
              style={{
                padding: "7px 16px",
                borderRadius: "var(--radius-full)",
                border: "none",
                background: isActive
                  ? "rgba(94,234,212,0.12)"
                  : "transparent",
                color: isActive
                  ? "var(--accent-electric)"
                  : "var(--ink-muted)",
                fontSize: 13,
                fontWeight: isActive ? 600 : 400,
                cursor: "pointer",
                transition: "all 0.25s ease",
                fontFamily: "var(--font-mono)",
                letterSpacing: isActive ? "0.02em" : "0",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                if (!isActive)
                  e.currentTarget.style.color = "var(--ink-secondary)";
              }}
              onMouseLeave={(e) => {
                if (!isActive)
                  e.currentTarget.style.color = "var(--ink-muted)";
              }}
            >
              <span style={{ marginRight: 5, fontSize: 10, opacity: 0.6 }}>
                {s.icon}
              </span>
              {s.title}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
