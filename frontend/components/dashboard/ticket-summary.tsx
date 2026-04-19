"use client";

import { AlienAvatar } from "@/components/dashboard/alien-avatar";
import { TicketTimer } from "@/components/tickets/ticket-timer";
import { Badge } from "@/components/ui/badge";
import { TICKET_STATUS, type Ticket } from "@/lib/game-session/types";

interface TicketSummaryProps {
  ticket: Ticket;
}

export function TicketSummary({ ticket }: TicketSummaryProps) {
  const statusLabel =
    ticket.status === TICKET_STATUS.AWAITING_RESPONSE ? null : ticket.status;

  return (
    <div className="grid gap-[clamp(1.25rem,3vw,1.75rem)]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <h2 className="text-[clamp(1.5rem,3vw,1.875rem)] font-semibold tracking-tight">
          #{ticket.id}
        </h2>
        <div className="shrink-0">
          {ticket.status === TICKET_STATUS.AWAITING_RESPONSE ? (
            <TicketTimer
              createdAt={ticket.createdAt}
              timeLimitSeconds={ticket.timeLimitSeconds}
            />
          ) : (
            <Badge
              tone={
                ticket.status === TICKET_STATUS.CLOSED ? "success" : "danger"
              }
            >
              {statusLabel}
            </Badge>
          )}
        </div>
      </div>

      <div className="flex items-center gap-[clamp(1rem,2vw,1.25rem)] rounded-panel-inner bg-white/5 p-[clamp(1rem,2vw,1.25rem)]">
        <AlienAvatar
          className="mx-0 shrink-0 size-[clamp(4.5rem,11vw,6.5rem)]"
          name={ticket.alien?.name}
          type={ticket.alien?.type}
          variant={ticket.alien?.variant}
        />
        <div className="min-w-0 space-y-1.5">
          <p className="text-[clamp(1.25rem,2.5vw,1.5rem)] font-semibold leading-tight">
            {ticket.alien?.name ?? "Unknown"}
          </p>
          <p className="text-[clamp(0.875rem,1.6vw,1rem)] font-medium tracking-[0.02em]">
            {ticket.alien?.type ?? "Unknown"}
          </p>
        </div>
      </div>
    </div>
  );
}
