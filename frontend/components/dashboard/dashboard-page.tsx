"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DashboardOverviewPanel } from "@/components/dashboard/dashboard-overview-panel";
import { DashboardWorkspacePanel } from "@/components/dashboard/dashboard-workspace-panel";
import { useGameSessionStore } from "@/lib/game-session/store";

interface DashboardPageProps {
  ticketId?: string;
  mode?: "response" | "manual";
}

export function DashboardPage({ ticketId, mode }: DashboardPageProps) {
  const router = useRouter();
  const ticket = useGameSessionStore((state) =>
    ticketId
      ? (state.tickets.find((candidate) => candidate.id === ticketId) ?? null)
      : null,
  );

  useEffect(() => {
    if (ticketId && !ticket) {
      router.replace("/");
    }
  }, [router, ticket, ticketId]);

  return (
    <div className="grid min-w-0 flex-1 grid-cols-1 gap-4 text-space-cream xl:grid-cols-2 xl:grid-rows-[auto_minmax(0,1fr)]">
      <DashboardOverviewPanel ticket={ticket} />
      <DashboardWorkspacePanel mode={mode} ticket={ticket} />
    </div>
  );
}
