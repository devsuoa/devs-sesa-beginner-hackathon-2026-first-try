import { customAlphabet } from "nanoid";
import { create } from "zustand";
import { getQuestion } from "@/api";
import type {
  CreateTicketInput,
  GameSession,
  Question,
  Ticket,
  TicketStatus,
} from "@/lib/game-session/types";

const INITIAL_TICKET_INTERVAL_SECONDS = 30;
const TICKET_INTERVAL_DECREASE_SECONDS = 2;
const MINIMUM_TICKET_INTERVAL_SECONDS = 10;
const NORMAL_TICKET_TIME_LIMIT_SECONDS = 90;
const CRITICAL_TICKET_TIME_LIMIT_SECONDS = 30;

const createTicketId = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  8,
);

const ALIEN_NAMES = [
  "Zyx",
  "Krell",
  "Vex",
  "Nyx",
  "Quor",
  "Thray",
  "Vex",
  "Solyx",
  "Kryx",
  "Nivex",
  "Quarr",
  "Zephyx",
  "Theron",
  "Myx",
  "Vorin",
  "Syl",
  "Zorg",
  "Vexa",
  "Blip",
  "Orin",
  "Nyra",
  "Krell",
  "Tala",
  "Mog",
];

const ALIEN_TYPES = ["Rulix", "Grob", "Kindor"];

const initialGameSession: GameSession = {
  tickets: [],
  strikes: 0,
  resolved: 0,
  isActive: false,
  ticketIntervalSeconds: INITIAL_TICKET_INTERVAL_SECONDS,
  lastTicketCreatedAt: null,
};

interface GameSessionState extends GameSession {
  startSession: () => Promise<void>;
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

function isTicketExpired(ticket: Ticket, now: number) {
  return (
    ticket.status === "pending" &&
    now - ticket.createdAt >= ticket.timeLimitSeconds * 1000
  );
}

function createTicket(input: CreateTicketInput): Ticket {
  return {
    id: createTicketId(),
    alien: input.alien,
    status: "pending",
    timeLimitSeconds: input.timeLimitSeconds,
    createdAt: input.createdAt ?? Date.now(),
    question: input.question,
  };
}

function createGeneratedTicket(createdAt: number, question: Question): Ticket {
  return createTicket({
    alien: {
      name: ALIEN_NAMES[Math.floor(Math.random() * ALIEN_NAMES.length)],
      type: ALIEN_TYPES[Math.floor(Math.random() * ALIEN_TYPES.length)],
    },
    timeLimitSeconds: question.critical
      ? CRITICAL_TICKET_TIME_LIMIT_SECONDS
      : NORMAL_TICKET_TIME_LIMIT_SECONDS,
    createdAt,
    question,
  });
}

export const useGameSessionStore = create<GameSessionState>((set, get) => ({
  ...initialGameSession,
  startSession: async () => {
    if (get().isActive) {
      return;
    }

    const startedAt = Date.now();
    const question = await getQuestion();

    set({
      tickets: [createGeneratedTicket(startedAt, question, false)],
      strikes: initialGameSession.strikes,
      resolved: initialGameSession.resolved,
      isActive: true,
      ticketIntervalSeconds: initialGameSession.ticketIntervalSeconds,
      lastTicketCreatedAt: startedAt,
    });
  },
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
  tick: (now = Date.now()) => {
    const state = get();

    if (!state.isActive) {
      return;
    }

    const remainingTickets = state.tickets.filter(
      (ticket) => !isTicketExpired(ticket, now),
    );
    const expiredCount = state.tickets.length - remainingTickets.length;
    const lastTicketCreatedAt = state.lastTicketCreatedAt ?? now;
    const shouldCreateTicket =
      now - lastTicketCreatedAt >= state.ticketIntervalSeconds * 1000;

    if (expiredCount === 0 && !shouldCreateTicket) {
      return;
    }

    set({
      tickets: remainingTickets,
      strikes: state.strikes + expiredCount,
    });

    if (!shouldCreateTicket) {
      return;
    }

    getQuestion().then((question) => {
      set((s) => ({
        tickets: [...s.tickets, createGeneratedTicket(now, question)],
        lastTicketCreatedAt: now,
        ticketIntervalSeconds: getNextTicketIntervalSeconds(
          s.ticketIntervalSeconds,
        ),
      }));
    });
  },
}));
