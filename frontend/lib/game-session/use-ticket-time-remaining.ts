"use client";

import { useEffect, useState } from "react";

function getTimeRemainingMs(createdAt: number, timeLimitSeconds: number) {
  const expiresAt = createdAt + timeLimitSeconds * 1000;
  return Math.max(0, expiresAt - Date.now());
}

interface UseTicketTimeRemainingOptions {
  createdAt: number | null;
  timeLimitSeconds: number | null;
}

interface TicketTimeRemaining {
  timeRemainingMs: number;
  timeRemainingSeconds: number;
  progress: number;
}

export function useTicketTimeRemaining({
  createdAt,
  timeLimitSeconds,
}: UseTicketTimeRemainingOptions) {
  const [timeRemainingMs, setTimeRemainingMs] = useState(() =>
    createdAt === null || timeLimitSeconds === null
      ? 0
      : getTimeRemainingMs(createdAt, timeLimitSeconds),
  );

  useEffect(() => {
    if (createdAt === null || timeLimitSeconds === null) {
      setTimeRemainingMs(0);
      return;
    }

    let frameId = 0;

    const updateTimeRemaining = () => {
      const remainingMs = getTimeRemainingMs(createdAt, timeLimitSeconds);
      setTimeRemainingMs(remainingMs);

      if (remainingMs > 0) {
        frameId = window.requestAnimationFrame(updateTimeRemaining);
      }
    };

    updateTimeRemaining();

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [createdAt, timeLimitSeconds]);

  const totalTimeMs = (timeLimitSeconds ?? 0) * 1000;

  return {
    timeRemainingMs,
    timeRemainingSeconds: Math.ceil(timeRemainingMs / 1000),
    progress:
      totalTimeMs === 0
        ? 0
        : Math.max(0, Math.min(1, timeRemainingMs / totalTimeMs)),
  } satisfies TicketTimeRemaining;
}
