"use client";

import { useGameSessionStore } from "@/lib/game-session/store";
import { Ticket } from "@/components/tickets/ticket";

export default function Home() {
  const selectedTicketId = useGameSessionStore(
    (state) => state.selectedTicketId
  );

  const tickets = useGameSessionStore((state) => state.tickets);

  const selectedTicket = selectedTicketId ? tickets.find((t) => t.id === selectedTicketId) : null;

  return (
    <div className="flex min-h-screen">      
      <main className="flex-1 p-6">
        {selectedTicket ? (
          <Ticket ticketId={selectedTicket.id} />
        ) : (
          <p className="text-neutral-500">
            Select a ticket to view details
          </p>
        )}
      </main>
    </div>
  );
}