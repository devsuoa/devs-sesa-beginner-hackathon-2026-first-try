export type TicketStatus = "pending" | "success" | "strike";
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
