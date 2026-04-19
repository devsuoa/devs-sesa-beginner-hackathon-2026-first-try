"use client";

import { AlertDialog } from "@base-ui/react/alert-dialog";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { Button } from "@/components/ui/button";
import { Surface } from "@/components/ui/surface";
import { config, useGameSessionStore } from "@/lib/game-session/store";
import { bodyText } from "@/lib/ui/recipes";
import { cn } from "@/lib/utils";

const copy = {
  loss: {
    description:
      "You have exhausted your strike limit. Command has terminated this shift.",
    title: "Shift Failed",
  },
  win: {
    description:
      "Response quota reached. Your shift is complete and command has cleared you to clock out.",
    title: "Quota Met",
  },
} as const;

export function SessionStatusDialog() {
  const router = useRouter();
  const resolved = useGameSessionStore((state) => state.resolved);
  const resetSession = useGameSessionStore((state) => state.resetSession);
  const startSession = useGameSessionStore((state) => state.startSession);
  const status = useGameSessionStore((state) => state.status);
  const strikes = useGameSessionStore((state) => state.strikes);

  if (status === "pending") {
    return null;
  }

  const content = copy[status];

  return (
    <AlertDialog.Root open>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop className="fixed inset-0 bg-space-night/75 backdrop-blur-sm" />
        <AlertDialog.Viewport className="fixed inset-0 z-50 flex items-center justify-center p-[clamp(1rem,3vw,1.5rem)]">
          <AlertDialog.Popup className="w-full max-w-[28rem]">
            <Surface density="compact" shadow="strong" tone="panel">
              <AlertDialog.Title className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold">
                {content.title}
              </AlertDialog.Title>

              <AlertDialog.Description
                className={cn(
                  bodyText(),
                  "mt-[clamp(0.5rem,1.5vw,0.75rem)] text-space-cream/85",
                )}
              >
                {content.description}
              </AlertDialog.Description>

              <Surface
                className="mt-[clamp(1rem,3vw,1.5rem)] text-space-cream/85"
                tone="ghost"
              >
                <p>
                  Quota: {resolved}/{config.QUOTA}
                </p>
                <p>
                  Strikes: {strikes}/{config.MAX_STRIKES}
                </p>
              </Surface>

              <div className="mt-[clamp(1rem,3vw,1.5rem)] flex justify-end">
                <AlertDialog.Close
                  onClick={() => {
                    resetSession();
                    void startSession();
                    startTransition(() => {
                      router.replace("/");
                    });
                  }}
                  render={<Button variant="surface" />}
                >
                  Start Next Shift
                </AlertDialog.Close>
              </div>
            </Surface>
          </AlertDialog.Popup>
        </AlertDialog.Viewport>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
