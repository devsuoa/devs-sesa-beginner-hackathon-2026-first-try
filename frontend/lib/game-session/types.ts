export const TICKET_STATUS = {
  AWAITING_RESPONSE: "Awaiting Ticket Response",
  CLOSED: "Ticket Closed",
  STRIKED: "Ticket Striked",
} as const;

export type TicketStatus = (typeof TICKET_STATUS)[keyof typeof TICKET_STATUS];
export type GameSessionStatus = "pending" | "win" | "loss";

export interface Alien {
  name: string;
  type: string;
}

export interface Question {
  id: number;
  text: string;
  critical: boolean;
}

export interface Ticket {
  id: string;
  alien: Alien;
  status: TicketStatus;
  responseText: string | null;
  timeLimitSeconds: number;
  createdAt: number;
  question: Question;
}

export interface GameSession {
  tickets: Ticket[];
  strikes: number;
  resolved: number;
  status: GameSessionStatus;
  isActive: boolean;
  ticketIntervalSeconds: number;
  lastTicketCreatedAt: number | null;
}

export interface CreateTicketInput {
  alien: Alien;
  timeLimitSeconds: number;
  createdAt?: number;
  question: Question;
}
