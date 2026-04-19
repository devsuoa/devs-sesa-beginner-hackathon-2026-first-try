import { PanelCard } from "@/components/dashboard/panel-card";
import { TicketSummary } from "@/components/dashboard/ticket-summary";
import { Welcome } from "@/components/dashboard/welcome";
import type { Ticket } from "@/lib/game-session/types";

interface DashboardOverviewPanelProps {
  ticket: Ticket | null;
}

export function DashboardOverviewPanel({
  ticket,
}: DashboardOverviewPanelProps) {
  return (
    <section className="flex min-w-0 flex-1 flex-col xl:contents">
      <header className="mb-3 flex items-center justify-between sm:mb-4 xl:col-start-1 xl:row-start-1 xl:mb-0 xl:self-end">
        <div className="space-y-2">
          <h3 className="text-[clamp(1rem,2vw,1.875rem)] font-medium leading-none tracking-tight">
            Intergalactic Space Agency
          </h3>
          <h1 className="text-[clamp(2rem,5vw,3.75rem)] font-bold leading-none tracking-tight">
            Ticket System
          </h1>
        </div>
      </header>

      <PanelCard className="flex-1 xl:col-start-1 xl:row-start-2">
        {ticket ? <TicketSummary ticket={ticket} /> : <Welcome />}
      </PanelCard>
    </section>
  );
}
