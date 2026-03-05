export type SectionId =
  | "intro"
  | "problem"
  | "solution"
  | "apis"
  | "demo"
  | "ecosystem"
  | "debate";

export interface SectionMeta {
  id: SectionId;
  title: string;
  icon: string;
}

export const SECTIONS: SectionMeta[] = [
  { id: "intro", title: "WebMCP", icon: "◆" },
  { id: "problem", title: "Problema", icon: "⚡" },
  { id: "solution", title: "Solución", icon: "✦" },
  { id: "apis", title: "APIs", icon: "⟐" },
  { id: "demo", title: "Demo", icon: "▶" },
  { id: "ecosystem", title: "Recursos", icon: "◎" },
  { id: "debate", title: "Debate", icon: "◇" },
];

export interface ToolDefinition {
  name: string;
  icon: string;
  description: string;
  schema: Record<string, unknown>;
  mockResult: string;
}

export interface AgentLogEntry {
  type: "system" | "discover" | "call" | "result" | "error";
  text: string;
  timestamp: number;
}

export interface DebateQuestion {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
}

export interface ResourceLink {
  emoji: string;
  title: string;
  url: string;
  description: string;
  tag: string;
}
