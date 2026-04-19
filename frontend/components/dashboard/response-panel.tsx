import { ChatBubble } from "@/components/dashboard/chat-bubble";
import { PanelCard } from "@/components/dashboard/panel-card";
import { TicketAnswerForm } from "@/components/tickets/ticket-answer-form";
import { AppScrollArea } from "@/components/ui/scroll-area";
import { Surface } from "@/components/ui/surface";
import { TICKET_STATUS, type Ticket } from "@/lib/game-session/types";

interface ResponsePanelProps {
  ticket: Ticket;
}

export function ResponsePanel({ ticket }: ResponsePanelProps) {
  return (
    <PanelCard className="flex min-h-0 flex-1 flex-col">
      <AppScrollArea
        className="min-h-0 flex-1"
        contentClassName="flex flex-col gap-[clamp(1rem,3vw,1.5rem)] pr-[clamp(0.5rem,2vw,1rem)]"
      >
        <ChatBubble>{ticket.question.text}</ChatBubble>
        {ticket.responseText ? (
          <ChatBubble align="right" tone="neutral">
            {ticket.responseText}
          </ChatBubble>
        ) : null}
      </AppScrollArea>

      {ticket.status === TICKET_STATUS.AWAITING_RESPONSE ? (
        <div className="mt-[clamp(1rem,2vw,1.5rem)] border-t border-white/20 pt-[clamp(1rem,2vw,1.5rem)]">
          <Surface shadow="default" tone="inset">
            <TicketAnswerForm
              questionId={ticket.question.id}
              ticketId={ticket.id}
            />
          </Surface>
        </div>
      ) : null}
    </PanelCard>
  );
}
