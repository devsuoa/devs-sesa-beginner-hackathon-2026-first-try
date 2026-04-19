"use client";

import { Tabs } from "@base-ui/react/tabs";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { pillLayout } from "@/lib/ui/recipes";
import { cn } from "@/lib/utils";

interface ModeTabsProps {
  ticketId?: string;
  mode?: "response" | "manual";
}

const tabClassName = cn(
  pillLayout({ size: "lg" }),
  "flex-1 font-medium text-white shadow-surface transition-opacity",
);

function getTabClassName(isActive: boolean, isDisabled: boolean) {
  return cn(
    tabClassName,
    isActive
      ? "bg-linear-to-b from-space-accent to-space-accent-light"
      : "bg-white/10 hover:bg-white/15",
    isDisabled &&
      "pointer-events-none cursor-not-allowed opacity-40 hover:bg-white/10",
  );
}

export function ModeTabs({ ticketId, mode }: ModeTabsProps) {
  const router = useRouter();
  const hasTicket = Boolean(ticketId);
  const value = ticketId ? (mode === "manual" ? "manual" : "response") : null;

  return (
    <Tabs.Root
      className="w-full"
      onValueChange={(nextValue) => {
        if (!ticketId || nextValue === value) {
          return;
        }

        startTransition(() => {
          router.push(
            nextValue === "manual" ? `/${ticketId}/manual` : `/${ticketId}`,
          );
        });
      }}
      value={value}
    >
      <Tabs.List className="flex w-full gap-[clamp(0.5rem,2vw,1rem)]">
        <Tabs.Tab
          className={(state) => getTabClassName(state.active, state.disabled)}
          disabled={!hasTicket}
          value="response"
        >
          Response
        </Tabs.Tab>

        <Tabs.Tab
          className={(state) => getTabClassName(state.active, state.disabled)}
          disabled={!hasTicket}
          value="manual"
        >
          Manual
        </Tabs.Tab>
      </Tabs.List>
    </Tabs.Root>
  );
}
