"use client";

import { TicketList } from "@/components/tickets/ticket-list";
import { AppScrollArea } from "@/components/ui/scroll-area";

export function Sidebar() {
  return (
    <AppScrollArea
      className="h-full w-full flex-1"
      contentClassName="w-12"
      viewportClassName="h-full"
    >
      <TicketList />
    </AppScrollArea>
  );
}
