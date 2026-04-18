import { customAlphabet } from "nanoid";
import { create } from "zustand";
import { getQuestion } from "@/api";
import type {
  Alien,
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
const CRITICAL_TICKET_CHANCE = 0.2;
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
    question: input.question,
  };
}

function createGeneratedAlien(): Alien {
  return {
    name: ALIEN_NAMES[Math.floor(Math.random() * ALIEN_NAMES.length)],
    type: ALIEN_TYPES[Math.floor(Math.random() * ALIEN_TYPES.length)],
  };
}

function getGeneratedTicketDifficulty() {
  return Math.random() < CRITICAL_TICKET_CHANCE;
}

function createGeneratedTicket(
  createdAt: number,
  question: Question,
  criticalOverride?: boolean,
): Ticket {
  const critical = criticalOverride ?? getGeneratedTicketDifficulty();

  return createTicket({
    alien: createGeneratedAlien(),
    critical,
    timeLimitSeconds: critical
      ? CRITICAL_TICKET_TIME_LIMIT_SECONDS
      : NORMAL_TICKET_TIME_LIMIT_SECONDS,
    createdAt,
    question,
  });
}

async function fetchQuestion(): Promise<Question> {
  const response = await getQuestion();
  return { id: response.id, text: response.question };
}

export const useGameSessionStore = create<GameSessionState>((set, get) => ({
  ...initialGameSession,
  startSession: async () => {
    if (get().isActive) {
      return;
    }

    const startedAt = Date.now();
    const question = await fetchQuestion();

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

    const expiredTicketIds = getExpiredTicketIds(state.tickets, now);
    const lastTicketCreatedAt = state.lastTicketCreatedAt ?? now;
    const shouldCreateTicket =
      now - lastTicketCreatedAt >= state.ticketIntervalSeconds * 1000;

    if (expiredTicketIds.length === 0 && !shouldCreateTicket) {
      return;
    }

    const expiredTicketIdSet = new Set(expiredTicketIds);
    const tickets = state.tickets.filter(
      (ticket) => !expiredTicketIdSet.has(ticket.id),
    );

    set({
      tickets,
      strikes: state.strikes + expiredTicketIds.length,
    });

    if (!shouldCreateTicket) {
      return;
    }

    fetchQuestion().then((question) => {
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
