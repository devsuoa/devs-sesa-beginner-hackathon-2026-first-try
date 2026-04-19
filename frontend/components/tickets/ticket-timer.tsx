"use client";

import { Badge } from "@/components/ui/badge";
import { useTicketTimeRemaining } from "@/lib/game-session/use-ticket-time-remaining";

interface TicketTimerProps {
  createdAt: number;
  timeLimitSeconds: number;
}

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function TicketTimer({ createdAt, timeLimitSeconds }: TicketTimerProps) {
  const { progress, timeRemainingSeconds } = useTicketTimeRemaining({
    createdAt,
    timeLimitSeconds,
  });

  const isLow = progress <= 0.25;

  return (
    <Badge
      aria-label={`${timeRemainingSeconds} seconds remaining`}
      tone={isLow ? "danger" : "accent"}
      role="status"
      title={`${timeRemainingSeconds} seconds remaining`}
    >
      {formatTime(timeRemainingSeconds)}
    </Badge>
  );
}
