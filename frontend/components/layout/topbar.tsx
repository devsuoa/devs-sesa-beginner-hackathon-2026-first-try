"use client";

import { useGameSessionStore } from "@/lib/game-session/store";

export function Topbar() {
  const strikes = useGameSessionStore((s) => s.strikes);
  const resolved = useGameSessionStore((s) => s.resolved);

  return (
    <header className="h-14 flex items-center justify-between px-6 bg-[#00033D] text-[#F2E6EE]">
      <div className="text-[64px] font-bold">
        space.
      </div>

      <div className="flex gap-6 text-sm">
        <p> Quota {resolved}/25</p>
        <p> Strikes {strikes}/3</p>
      </div>
    </header>
  );
}