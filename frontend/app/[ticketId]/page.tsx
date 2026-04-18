import { Ticket } from "@/components/tickets/ticket";

export default async function TicketPage({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) {
  const { ticketId } = await params;

  return <Ticket ticketId={ticketId} />;
}
