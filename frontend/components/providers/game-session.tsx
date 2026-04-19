"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { SessionStatusDialog } from "@/components/dashboard/session-status-dialog";
import { useGameSessionStore } from "@/lib/game-session/store";
import { useGameLoop } from "@/lib/game-session/use-game-loop";

export function GameSessionProvider({ children }: { children: ReactNode }) {
  const startSession = useGameSessionStore((state) => state.startSession);

  useGameLoop();

  useEffect(() => {
    startSession();
  }, [startSession]);

  return (
    <>
      {children}
      <SessionStatusDialog />
    </>
  );
}
