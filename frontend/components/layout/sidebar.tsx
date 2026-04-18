"use client";

import { TicketList } from "@/components/tickets/ticket-list";
import { config, useGameSessionStore } from "@/lib/game-session/store";

export function Sidebar() {
  const strikes = useGameSessionStore((state) => state.strikes);
  const resolved = useGameSessionStore((state) => state.resolved);

  return (
    <aside className="h-screen w-72 shrink-0 overflow-y-auto border-r border-neutral-300 p-4">
      <div className="mb-4">
        <p className="text-sm font-medium">Strikes: {strikes}/{config.MAX_STRIKES}</p>
        <p className="text-sm font-medium">Quota: {resolved}/{config.QUOTA}</p>
      </div>
      <TicketList />
    </aside>
  );
}
