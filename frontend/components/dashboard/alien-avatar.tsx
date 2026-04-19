"use client";

import { Avatar } from "@base-ui/react/avatar";
import { cn } from "@/lib/utils";

interface AlienAvatarProps {
  imageUrl?: string | null;
  name?: string | null;
  className?: string;
  showFallbackText?: boolean;
}

function getInitials(name?: string | null) {
  if (!name) {
    return "??";
  }

  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return initials || name.slice(0, 2).toUpperCase();
}

export function AlienAvatar({
  imageUrl,
  name,
  className,
  showFallbackText = true,
}: AlienAvatarProps) {
  return (
    <Avatar.Root
      className={cn(
        "mx-auto inline-flex size-[clamp(4rem,10vw,6rem)] items-center justify-center overflow-hidden rounded-full bg-linear-to-b from-space-accent-light to-space-accent shadow-surface",
        className,
      )}
    >
      {imageUrl ? (
        <Avatar.Image
          alt={name ? `${name} avatar` : "Alien avatar"}
          className="size-full object-cover"
          src={imageUrl}
        />
      ) : null}
      <Avatar.Fallback
        className={cn(
          "inline-flex size-full items-center justify-center font-bold text-white",
          showFallbackText
            ? "text-lg sm:text-xl lg:text-2xl"
            : "text-transparent",
        )}
        delay={0}
      >
        {getInitials(name)}
      </Avatar.Fallback>
    </Avatar.Root>
  );
}
