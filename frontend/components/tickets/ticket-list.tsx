"use client";

import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { TicketTimer } from "@/components/tickets/ticket-timer";
import { useGameSessionStore } from "@/lib/game-session/store";
import type { Ticket } from "@/lib/game-session/types";

export function TicketList() {
  const tickets = useGameSessionStore((state) => state.tickets);

  return (
    <ul className="space-y-2">
      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </ul>
  );
}

function TicketItem({ ticket }: { ticket: Ticket }) {
  return (
    <li>
      <Link
        href={`/${ticket.id}`}
        className="flex items-center justify-between gap-2 rounded border border-neutral-300 px-3 py-2.5"
      >
        <div className="flex items-center gap-2">
          {ticket.critical && (
            <AlertTriangle
              aria-label="Critical ticket"
              className="size-4 text-red-500"
            />
          )}
          <p className="text-sm font-medium">{ticket.alien.name}</p>
        </div>
        <TicketTimer
          createdAt={ticket.createdAt}
          timeLimitSeconds={ticket.timeLimitSeconds}
        />
      </Link>
    </li>
  );
}
