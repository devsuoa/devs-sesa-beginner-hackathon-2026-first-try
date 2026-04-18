export type TicketStatus = "pending" | "success" | "strike";

export interface Alien {
  name: string;
  type: string;
}

export interface Ticket {
  id: string;
  alien: Alien;
  critical: boolean;
  status: TicketStatus;
  timeLimitSeconds: number;
  createdAt: number;
}

export interface GameSession {
  tickets: Ticket[];
  strikes: number;
  resolved: number;
  isActive: boolean;
  ticketIntervalSeconds: number;
  lastTicketCreatedAt: number | null;
}

export interface CreateTicketInput {
  alien: Alien;
  critical: boolean;
  timeLimitSeconds: number;
  createdAt?: number;
}
