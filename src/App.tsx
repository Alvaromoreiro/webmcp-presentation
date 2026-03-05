import { useState, useEffect, useCallback } from "react";
import { SECTIONS, type SectionId } from "./types";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { Navigation } from "./components/Navigation";
import { IntroSection } from "./sections/IntroSection";
import { ProblemSection } from "./sections/ProblemSection";
import { SolutionSection } from "./sections/SolutionSection";
import { ApisSection } from "./sections/ApisSection";
import { DemoSection } from "./sections/DemoSection";
import { EcosystemSection } from "./sections/EcosystemSection";
import { DebateSection } from "./sections/DebateSection";

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>("intro");

  // Track active section on scroll
  useEffect(() => {
    const handler = () => {
      const ids = SECTIONS.map((s) => s.id);
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight / 2) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavigate = useCallback((id: SectionId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const ids = SECTIONS.map((s) => s.id);
      const currentIdx = ids.indexOf(activeSection);

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        const next = ids[Math.min(currentIdx + 1, ids.length - 1)];
        handleNavigate(next);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        const prev = ids[Math.max(currentIdx - 1, 0)];
        handleNavigate(prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeSection, handleNavigate]);

  return (
    <>
      <AnimatedBackground />
      <Navigation activeSection={activeSection} onNavigate={handleNavigate} />
      <main>
        <IntroSection />
        <ProblemSection />
        <SolutionSection />
        <ApisSection />
        <DemoSection />
        <EcosystemSection />
        <DebateSection />
      </main>
    </>
  );
}
