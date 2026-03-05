import { useEffect, useRef, useState, type FC } from "react";

interface CounterProps {
  end: number;
  suffix?: string;
  label: string;
  color?: string;
}

export const Counter: FC<CounterProps> = ({
  end,
  suffix = "",
  label,
  color = "var(--accent-electric)",
}) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          let cur = 0;
          const step = Math.max(1, Math.floor(end / 45));
          const id = setInterval(() => {
            cur += step;
            if (cur >= end) {
              cur = end;
              clearInterval(id);
            }
            setVal(cur);
          }, 25);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [end]);

  return (
    <div ref={ref} style={{ textAlign: "center", minWidth: 120 }}>
      <div
        style={{
          fontSize: 52,
          fontWeight: 900,
          color,
          fontFamily: "var(--font-mono)",
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
        }}
      >
        {val}
        <span style={{ fontSize: 32 }}>{suffix}</span>
      </div>
      <div
        style={{
          color: "var(--ink-muted)",
          fontSize: 13,
          marginTop: 8,
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.02em",
        }}
      >
        {label}
      </div>
    </div>
  );
};
