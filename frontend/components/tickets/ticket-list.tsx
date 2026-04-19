"use client";

import Link from "next/link";
import { AlienAvatar } from "@/components/dashboard/alien-avatar";
import { useGameSessionStore } from "@/lib/game-session/store";
import { TICKET_STATUS, type Ticket } from "@/lib/game-session/types";
import { useTicketTimeRemaining } from "@/lib/game-session/use-ticket-time-remaining";

export function TicketList() {
  const tickets = useGameSessionStore((state) => state.tickets);
  const activeTickets = tickets.filter(
    (ticket) => ticket.status === TICKET_STATUS.AWAITING_RESPONSE,
  );

  return (
    <ul className="m-0 flex w-full list-none flex-col items-center gap-3 p-0">
      {activeTickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </ul>
  );
}

interface TicketItemProps {
  ticket: Ticket;
}

function TicketItem({ ticket }: TicketItemProps) {
  const href = `/${ticket.id}`;
  const { progress } = useTicketTimeRemaining({
    createdAt: ticket.createdAt,
    timeLimitSeconds: ticket.timeLimitSeconds,
  });
  const showAlert = ticket.question.critical || progress <= 0.25;

  return (
    <li className="flex w-full justify-center">
      <Link
        aria-label={`Open ticket for ${ticket.alien.name}`}
        className="flex size-12 items-center justify-center focus-visible:outline-none"
        href={href}
      >
        <div className="relative size-12">
          <AlienAvatar className="size-12" name={ticket.alien.name} />
          {showAlert ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 rounded-full bg-red-500/35 animate-pulse"
            />
          ) : null}
          {showAlert ? (
            <span className="sr-only">
              {ticket.question.critical
                ? "Critical ticket"
                : "Ticket at 25 percent remaining"}
            </span>
          ) : null}
        </div>
      </Link>
    </li>
  );
}
