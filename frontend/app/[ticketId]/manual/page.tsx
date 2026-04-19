import { DashboardPage } from "@/components/dashboard/dashboard-page";

interface TicketManualPageProps {
  params: Promise<{ ticketId: string }>;
}

export default async function TicketManualPage({
  params,
}: TicketManualPageProps) {
  const { ticketId } = await params;

  return <DashboardPage mode="manual" ticketId={ticketId} />;
}
