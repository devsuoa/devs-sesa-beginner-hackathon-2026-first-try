"use client";

import { useEffect } from "react";
import { useGameSessionStore } from "@/lib/game-session/store";

export function useGameLoop() {
  const tick = useGameSessionStore((state) => state.tick);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      tick(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [tick]);
}
