"use client";

import { AlertTriangle } from "lucide-react";
import { TicketTimer } from "@/components/tickets/ticket-timer";
import { useGameSessionStore } from "@/lib/game-session/store";
import type { Ticket } from "@/lib/game-session/types";

export function TicketList() {
  const tickets = useGameSessionStore((state) => state.tickets);

  const setSelectedTicketId = useGameSessionStore(
    (state) => state.setSelectedTicketId
  );

  return (
    <ul className="space-y-2">
      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} setSelectedTicketId={setSelectedTicketId} />
      ))}
    </ul>
  );
}

function TicketItem({ ticket, setSelectedTicketId, }: { ticket: Ticket; setSelectedTicketId: (id: string) => void; }) {
  return (
    <li>
      <button
        onClick={() => setSelectedTicketId(ticket.id)}
        className="flex items-center justify-between gap-2 rounded border border-neutral-300 px-3 py-2.5 w-full cursor-pointer"
      >
        <div className="flex items-center gap-2">
          {ticket.question.critical && (
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
      </button>
    </li>
  );
}
