import { type FC, type ReactNode } from "react";
import type { SectionId } from "../types";

interface SlideProps {
  id: SectionId;
  children: ReactNode;
  fullHeight?: boolean;
}

export const Slide: FC<SlideProps> = ({ id, children, fullHeight = true }) => (
  <section
    id={id}
    style={{
      minHeight: fullHeight ? "100vh" : "auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "100px 24px 80px",
      position: "relative",
      zIndex: 1,
    }}
  >
    {children}
  </section>
);
