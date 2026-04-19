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
import { TICKET_STATUS } from "@/lib/game-session/types";

export const config = {
  INITIAL_TICKET_INTERVAL_SECONDS: 20,
  TICKET_INTERVAL_DECREASE_SECONDS: 2,
  MINIMUM_TICKET_INTERVAL_SECONDS: 10,
  NORMAL_TICKET_TIME_LIMIT_SECONDS: 120,
  CRITICAL_TICKET_TIME_LIMIT_SECONDS: 30,
  QUOTA: 10,
  MAX_STRIKES: 3,
};

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
  status: "pending",
  isActive: false,
  ticketIntervalSeconds: config.INITIAL_TICKET_INTERVAL_SECONDS,
  lastTicketCreatedAt: null,
};

interface GameSessionState extends GameSession {
  startSession: () => Promise<void>;
  resetSession: () => void;
  addTicket: (ticket: CreateTicketInput) => void;
  removeTicket: (ticketId: string) => void;
  updateTicketStatus: (
    ticketId: string,
    status: TicketStatus,
    responseText?: string,
  ) => void;
  incrementStrikes: (amount?: number) => void;
  tick: (now?: number) => void;
}

function getNextTicketIntervalSeconds(currentIntervalSeconds: number) {
  return Math.max(
    config.MINIMUM_TICKET_INTERVAL_SECONDS,
    currentIntervalSeconds - config.TICKET_INTERVAL_DECREASE_SECONDS,
  );
}

function isTicketExpired(ticket: Ticket, now: number) {
  return (
    ticket.status === TICKET_STATUS.AWAITING_RESPONSE &&
    now - ticket.createdAt >= ticket.timeLimitSeconds * 1000
  );
}

function getStatusDelta(status: TicketStatus) {
  return {
    resolved: status === TICKET_STATUS.CLOSED ? 1 : 0,
    strikes: status === TICKET_STATUS.STRIKED ? 1 : 0,
  };
}

function createTicket(input: CreateTicketInput): Ticket {
  return {
    id: createTicketId(),
    alien: input.alien,
    status: TICKET_STATUS.AWAITING_RESPONSE,
    responseText: null,
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
      ? config.CRITICAL_TICKET_TIME_LIMIT_SECONDS
      : config.NORMAL_TICKET_TIME_LIMIT_SECONDS,
    createdAt,
    question,
  });
}

function endSession({
  strikes,
  resolved,
}: Pick<GameSession, "strikes" | "resolved">) {
  if (resolved >= config.QUOTA) {
    return {
      isActive: false,
      status: "win" as const,
    };
  }

  if (strikes >= config.MAX_STRIKES) {
    return {
      isActive: false,
      status: "loss" as const,
    };
  }

  return null;
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
      tickets: [createGeneratedTicket(startedAt, question)],
      strikes: initialGameSession.strikes,
      resolved: initialGameSession.resolved,
      status: initialGameSession.status,
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
  updateTicketStatus: (ticketId, status, responseText) =>
    set((state) => {
      const ticket = state.tickets.find(
        (candidate) => candidate.id === ticketId,
      );

      if (!ticket) {
        return state;
      }

      const previousDelta = getStatusDelta(ticket.status);
      const nextDelta = getStatusDelta(status);
      const tickets = state.tickets.map((candidate) =>
        candidate.id === ticketId
          ? {
              ...candidate,
              status,
              responseText: responseText ?? candidate.responseText,
            }
          : candidate,
      );

      const nextState = {
        tickets,
        strikes: state.strikes + nextDelta.strikes - previousDelta.strikes,
        resolved: state.resolved + nextDelta.resolved - previousDelta.resolved,
      };

      const sessionEnd = endSession(nextState);

      return sessionEnd ? { ...nextState, ...sessionEnd } : nextState;
    }),
  incrementStrikes: (amount = 1) =>
    set((state) => {
      const nextState = {
        strikes: state.strikes + amount,
      };
      const sessionEnd = endSession({
        strikes: nextState.strikes,
        resolved: state.resolved,
      });

      return sessionEnd ? { ...nextState, ...sessionEnd } : nextState;
    }),
  tick: (now = Date.now()) => {
    const state = get();

    if (!state.isActive) {
      return;
    }

    const expiredTickets = state.tickets.filter((ticket) =>
      isTicketExpired(ticket, now),
    );
    const expiredTicketIds = new Set(expiredTickets.map((ticket) => ticket.id));
    const expiredCount = expiredTickets.length;
    const lastTicketCreatedAt = state.lastTicketCreatedAt ?? now;
    const shouldCreateTicket =
      now - lastTicketCreatedAt >= state.ticketIntervalSeconds * 1000;

    if (expiredCount === 0 && !shouldCreateTicket) {
      return;
    }

    const nextState = {
      tickets: state.tickets.map((ticket) =>
        expiredTicketIds.has(ticket.id)
          ? { ...ticket, status: TICKET_STATUS.STRIKED }
          : ticket,
      ),
      strikes: state.strikes + expiredCount,
    };
    const sessionEnd = endSession({
      strikes: nextState.strikes,
      resolved: state.resolved,
    });

    set(sessionEnd ? { ...nextState, ...sessionEnd } : nextState);

    if (sessionEnd || !shouldCreateTicket) {
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
