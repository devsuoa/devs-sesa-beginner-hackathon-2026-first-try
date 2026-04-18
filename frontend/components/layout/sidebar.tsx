"use client";

import { TicketList } from "@/components/tickets/ticket-list";

export function Sidebar() {

  return (
    <aside
      className="
        h-full
        w-60
        shrink-0
        flex flex-col
        items-center
        py-16
\       rounded-[90px]
        shadow-inner
        overflow-hidden
      "
    >
      {/* TICKET LIST */}
      <div className="flex-1 overflow-y-auto scrollbar-none">
        <TicketList />
      </div>
    </aside>
  );
}
