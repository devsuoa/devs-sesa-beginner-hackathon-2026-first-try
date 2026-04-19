import { EmptyWorkspace } from "@/components/dashboard/empty-workspace";
import { ManualPanel } from "@/components/dashboard/manual-panel";
import { ModeTabs } from "@/components/dashboard/mode-tabs";
import { ResponsePanel } from "@/components/dashboard/response-panel";
import type { Ticket } from "@/lib/game-session/types";

interface DashboardWorkspacePanelProps {
  mode?: "response" | "manual";
  ticket: Ticket | null;
}

export function DashboardWorkspacePanel({
  mode,
  ticket,
}: DashboardWorkspacePanelProps) {
  return (
    <section className="flex min-w-0 flex-1 flex-col xl:contents">
      <header className="mb-3 flex items-center justify-between sm:mb-4 xl:col-start-2 xl:row-start-1 xl:mb-0 xl:self-end">
        <ModeTabs mode={mode} ticketId={ticket?.id} />
      </header>

      <div className="flex flex-1 flex-col gap-4 sm:gap-6 xl:col-start-2 xl:row-start-2">
        {!ticket && <EmptyWorkspace />}
        {ticket && mode === "manual" && <ManualPanel />}
        {ticket && mode !== "manual" && <ResponsePanel ticket={ticket} />}
      </div>
    </section>
  );
}
