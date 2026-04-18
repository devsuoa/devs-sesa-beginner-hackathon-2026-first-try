"use client";

import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { checkAnswer } from "@/api";
import { useGameSessionStore } from "@/lib/game-session/store";
import { useTicketTimeRemaining } from "@/lib/game-session/use-ticket-time-remaining";
import { LoaderCircleIcon } from "lucide-react";

interface TicketDetailsProps {
  ticketId: string;
}

export function Ticket({ ticketId }: TicketDetailsProps) {
  const router = useRouter();
  const ticket = useGameSessionStore((state) =>
    state.tickets.find((candidate) => candidate.id === ticketId),
  );
  const updateTicketStatus = useGameSessionStore(
    (state) => state.updateTicketStatus,
  );

  const { timeRemainingSeconds } = useTicketTimeRemaining({
    createdAt: ticket?.createdAt ?? null,
    timeLimitSeconds: ticket?.timeLimitSeconds ?? null,
  });

  const form = useForm({
    defaultValues: { answer: "" },
    onSubmit: async ({ value }) => {
      if (!ticket) return;
      const { result } = await checkAnswer({
        id: ticket.question.id,
        answer: value.answer,
      });
      updateTicketStatus(ticket.id, result ? "success" : "strike");
    },
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

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="flex gap-2"
      >
        <form.Field name="answer">
          {(field) => (
            <input
              type="text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              disabled={form.state.isSubmitting}
              placeholder="Your message…"
              className="border border-neutral-300 rounded px-2 py-1 text-sm"
            />
          )}
        </form.Field>
        <button
          type="submit"
          disabled={form.state.isSubmitting || !form.state.values.answer.trim()}
          className="border border-neutral-300 px-3 py-1 rounded text-sm disabled:opacity-50"
        >
          {form.state.isSubmitting ? <LoaderCircleIcon className="size-4 animate-spin" /> : "Send"}
        </button>
      </form>
    </main>
  );
}
