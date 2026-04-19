"use client";

import { Avatar } from "@base-ui/react/avatar";
import Image, { type StaticImageData } from "next/image";
import grob0 from "@/app/assets/grob0.png";
import grob1 from "@/app/assets/grob1.png";
import kindor0 from "@/app/assets/kindor0.png";
import kindor1 from "@/app/assets/kindor1.png";
import rulix0 from "@/app/assets/rulix0.png";
import rulix1 from "@/app/assets/rulix1.png";
import type { AlienType, AlienVariant } from "@/lib/game-session/types";
import { cn } from "@/lib/utils";

const ALIEN_AVATAR_IMAGES: Record<
  AlienType,
  readonly [StaticImageData, StaticImageData]
> = {
  Grob: [grob0, grob1],
  Kindor: [kindor0, kindor1],
  Rulix: [rulix0, rulix1],
};

interface AlienAvatarProps {
  imageUrl?: string | null;
  name?: string | null;
  type?: AlienType | null;
  variant?: AlienVariant | null;
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

function getAlienAvatarImage(
  type?: AlienType | null,
  variant?: AlienVariant | null,
) {
  if (!type) {
    return null;
  }

  const [defaultImage, alternateImage] = ALIEN_AVATAR_IMAGES[type];

  return variant === 1 ? alternateImage : defaultImage;
}

export function AlienAvatar({
  imageUrl,
  name,
  type,
  variant,
  className,
  showFallbackText = true,
}: AlienAvatarProps) {
  const localImage = getAlienAvatarImage(type, variant);

  return (
    <Avatar.Root
      className={cn(
        "relative mx-auto inline-flex size-[clamp(4rem,10vw,6rem)] items-center justify-center overflow-hidden rounded-full bg-linear-to-b from-space-accent-light to-space-accent shadow-surface",
        className,
      )}
    >
      {localImage ? (
        <Image
          alt={name ? `${name} avatar` : "Alien avatar"}
          className="object-cover"
          fill
          sizes="(max-width: 640px) 4rem, 6rem"
          src={localImage}
        />
      ) : imageUrl ? (
        <Avatar.Image
          alt={name ? `${name} avatar` : "Alien avatar"}
          className="size-full object-cover"
          src={imageUrl}
        />
      ) : null}
      {localImage ? null : (
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
      )}
    </Avatar.Root>
  );
}
