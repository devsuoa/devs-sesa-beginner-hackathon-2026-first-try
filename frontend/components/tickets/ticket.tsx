"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useGameSessionStore } from "@/lib/game-session/store";
import { useTicketTimeRemaining } from "@/lib/game-session/use-ticket-time-remaining";
import { TicketAnswerForm } from "./ticket-answer-form";

interface TicketDetailsProps {
  ticketId: string;
}

export function Ticket({ ticketId }: TicketDetailsProps) {
  const router = useRouter();
  const ticket = useGameSessionStore((state) =>
    state.tickets.find((candidate) => candidate.id === ticketId),
  );
  const { timeRemainingSeconds } = useTicketTimeRemaining({
    createdAt: ticket?.createdAt ?? null,
    timeLimitSeconds: ticket?.timeLimitSeconds ?? null,
  });

  useEffect(() => {
    if (!ticket) {
      router.replace("/");
    }
  }, [router, ticket]);

  if (!ticket) {
    return null;
  }

  const ticketWithTimeRemaining = {
    ...ticket,
    timeRemaining: timeRemainingSeconds,
  };

  return (
    <main className="space-y-4 p-6">
      <section className="flex flex-wrap items-start justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">{ticket.alien.name}</h1>
          <pre className="font-mono">
            {JSON.stringify(ticketWithTimeRemaining, null, 2)}
          </pre>
        </div>
      </section>

      <TicketAnswerForm ticketId={ticket.id} questionId={ticket.question.id} />
    </main>
  );
}
