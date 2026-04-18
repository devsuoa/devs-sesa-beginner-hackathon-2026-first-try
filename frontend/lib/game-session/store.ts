import { customAlphabet } from "nanoid";
import { create } from "zustand";
import type {
  Alien,
  CreateTicketInput,
  GameSession,
  Ticket,
  TicketStatus,
} from "@/lib/game-session/types";

const INITIAL_TICKET_INTERVAL_SECONDS = 30;
const TICKET_INTERVAL_DECREASE_SECONDS = 2;
const MINIMUM_TICKET_INTERVAL_SECONDS = 10;
const NORMAL_TICKET_TIME_LIMIT_SECONDS = 90;
const CRITICAL_TICKET_TIME_LIMIT_SECONDS = 30;
const CRITICAL_TICKET_CHANCE = 0.2;
const createTicketId = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  8,
);

const ALIEN_NAMES = [
  "Zorg",
  "Vexa",
  "Blip",
  "Orin",
  "Nyra",
  "Krell",
  "Tala",
  "Mog",
];

const ALIEN_TYPES = [
  "martian",
  "venusian",
  "plutonian",
  "andromedan",
  "nebulite",
  "cosmonid",
];

const initialGameSession: GameSession = {
  tickets: [],
  strikes: 0,
  resolved: 0,
  isActive: false,
  ticketIntervalSeconds: INITIAL_TICKET_INTERVAL_SECONDS,
  lastTicketCreatedAt: null,
};

interface GameSessionState extends GameSession {
  startSession: () => void;
  resetSession: () => void;
  addTicket: (ticket: CreateTicketInput) => void;
  removeTicket: (ticketId: string) => void;
  updateTicketStatus: (ticketId: string, status: TicketStatus) => void;
  incrementStrikes: (amount?: number) => void;
  tick: (now?: number) => void;
}

function getNextTicketIntervalSeconds(currentIntervalSeconds: number) {
  return Math.max(
    MINIMUM_TICKET_INTERVAL_SECONDS,
    currentIntervalSeconds - TICKET_INTERVAL_DECREASE_SECONDS,
  );
}

function getExpiredTicketIds(tickets: Ticket[], now = Date.now()) {
  return tickets.reduce<string[]>((expiredTicketIds, ticket) => {
    if (
      ticket.status === "pending" &&
      now - ticket.createdAt >= ticket.timeLimitSeconds * 1000
    ) {
      expiredTicketIds.push(ticket.id);
    }

    return expiredTicketIds;
  }, []);
}

function createTicket(input: CreateTicketInput): Ticket {
  return {
    id: createTicketId(),
    alien: input.alien,
    critical: input.critical,
    status: "pending",
    timeLimitSeconds: input.timeLimitSeconds,
    createdAt: input.createdAt ?? Date.now(),
  };
}

function createGeneratedAlien(ticketBankId: number): Alien {
  return {
    name: ALIEN_NAMES[ticketBankId % ALIEN_NAMES.length],
    type: ALIEN_TYPES[ticketBankId % ALIEN_TYPES.length],
  };
}

function getGeneratedTicketDifficulty() {
  return Math.random() < CRITICAL_TICKET_CHANCE;
}

function createGeneratedTicket(
  ticketBankId: number,
  createdAt: number,
  criticalOverride?: boolean,
): Ticket {
  const critical = criticalOverride ?? getGeneratedTicketDifficulty();

  return createTicket({
    alien: createGeneratedAlien(ticketBankId),
    critical,
    timeLimitSeconds: critical
      ? CRITICAL_TICKET_TIME_LIMIT_SECONDS
      : NORMAL_TICKET_TIME_LIMIT_SECONDS,
    createdAt,
  });
}

export const useGameSessionStore = create<GameSessionState>((set) => ({
  ...initialGameSession,
  startSession: () =>
    set((state) => {
      if (state.isActive) {
        return state;
      }

      const startedAt = Date.now();

      return {
        tickets: [createGeneratedTicket(0, startedAt, false)],
        strikes: initialGameSession.strikes,
        resolved: initialGameSession.resolved,
        isActive: true,
        ticketIntervalSeconds: initialGameSession.ticketIntervalSeconds,
        lastTicketCreatedAt: startedAt,
      };
    }),
  resetSession: () => set(initialGameSession),
  addTicket: (ticket) =>
    set((state) => ({
      tickets: [...state.tickets, createTicket(ticket)],
    })),
  removeTicket: (ticketId) =>
    set((state) => ({
      tickets: state.tickets.filter((ticket) => ticket.id !== ticketId),
    })),
  updateTicketStatus: (ticketId, status) =>
    set((state) => {
      const ticket = state.tickets.find(
        (candidate) => candidate.id === ticketId,
      );

      if (!ticket) {
        return state;
      }

      if (status === "pending") {
        return {
          tickets: state.tickets.map((candidate) =>
            candidate.id === ticketId ? { ...candidate, status } : candidate,
          ),
        };
      }

      return {
        tickets: state.tickets.filter((candidate) => candidate.id !== ticketId),
        strikes: state.strikes + (status === "strike" ? 1 : 0),
        resolved: state.resolved + (status === "success" ? 1 : 0),
      };
    }),
  incrementStrikes: (amount = 1) =>
    set((state) => ({
      strikes: state.strikes + amount,
    })),
  tick: (now = Date.now()) =>
    set((state) => {
      if (!state.isActive) {
        return state;
      }

      const expiredTicketIds = getExpiredTicketIds(state.tickets, now);
      const lastTicketCreatedAt = state.lastTicketCreatedAt ?? now;
      const shouldCreateTicket =
        now - lastTicketCreatedAt >= state.ticketIntervalSeconds * 1000;

      if (expiredTicketIds.length === 0 && !shouldCreateTicket) {
        return state;
      }

      const nextTicketBankId = state.tickets.length;
      const expiredTicketIdSet = new Set(expiredTicketIds);
      const tickets = state.tickets.filter(
        (ticket) => !expiredTicketIdSet.has(ticket.id),
      );

      if (!shouldCreateTicket) {
        return {
          tickets,
          strikes: state.strikes + expiredTicketIds.length,
        };
      }

      return {
        tickets: [...tickets, createGeneratedTicket(nextTicketBankId, now)],
        strikes: state.strikes + expiredTicketIds.length,
        lastTicketCreatedAt: now,
        ticketIntervalSeconds: getNextTicketIntervalSeconds(
          state.ticketIntervalSeconds,
        ),
      };
    }),
}));
