"use client";

import { useTicketTimeRemaining } from "@/lib/game-session/use-ticket-time-remaining";
import { cn } from "@/lib/utils";

interface TicketTimerProps {
  createdAt: number;
  timeLimitSeconds: number;
  size?: number;
}

export function TicketTimer({
  createdAt,
  timeLimitSeconds,
  size = 24,
}: TicketTimerProps) {
  const { progress, timeRemainingSeconds } = useTicketTimeRemaining({
    createdAt,
    timeLimitSeconds,
  });

  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = -circumference * (1 - progress);

  return (
    <div
      className={cn(progress <= 0.25 && "text-red-500")}
      style={{ height: size, position: "relative", width: size }}
      title={`${timeRemainingSeconds}s remaining`}
    >
      <svg
        aria-label={`${timeRemainingSeconds} seconds remaining`}
        height={size}
        style={{ transform: "rotate(-90deg)" }}
        width={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <title>{`${timeRemainingSeconds} seconds remaining`}</title>
        <circle
          cx={size / 2}
          cy={size / 2}
          fill="none"
          r={radius}
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          fill="none"
          r={radius}
          stroke="currentColor"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
      </svg>
    </div>
  );
}
