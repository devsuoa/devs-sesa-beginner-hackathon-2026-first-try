"use client";

import Link from "next/link";
import { config, useGameSessionStore } from "@/lib/game-session/store";

export function Topbar() {
  const strikes = useGameSessionStore((s) => s.strikes);
  const resolved = useGameSessionStore((s) => s.resolved);

  return (
    <header className="flex items-center justify-between gap-4 bg-space-night px-4 py-4 text-space-cream sm:px-6 lg:px-8">
      <Link
        href="/"
        className="text-[clamp(1.25rem,3vw,1.875rem)] font-bold tracking-tight"
      >
        space.
      </Link>

      <div className="flex gap-[clamp(1rem,3vw,1.5rem)] text-[clamp(0.75rem,1.6vw,1rem)]">
        <p>
          <span className="font-bold">Quota:</span> {resolved}/{config.QUOTA}
        </p>
        <p>
          <span className="font-bold">Strikes:</span> {strikes}/
          {config.MAX_STRIKES}
        </p>
      </div>
    </header>
  );
}
