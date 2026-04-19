import { DashboardPage } from "@/components/dashboard/dashboard-page";

interface TicketPageProps {
  params: Promise<{ ticketId: string }>;
}

export default async function TicketPage({ params }: TicketPageProps) {
  const { ticketId } = await params;

  return <DashboardPage mode="response" ticketId={ticketId} />;
}
