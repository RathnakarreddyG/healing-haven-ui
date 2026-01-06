export type ChatMode = "interactive" | "direct";

export interface ChatHistoryItem {
  id: string;
  title: string;
  timestamp: string;
  isActive?: boolean;
  mode: ChatMode;
}

export interface Reference {
  id: number;
  text: string;
}

export interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  references?: Reference[];
}
