"use client";

import { cva } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { pillLayout } from "@/lib/ui/recipes";
import { cn } from "@/lib/utils";

const badgeStyles = cva("font-semibold tabular-nums", {
  variants: {
    tone: {
      accent:
        "bg-linear-to-b from-space-accent to-space-accent-light text-white",
      danger: "bg-linear-to-b from-red-500 to-red-400 text-white",
      neutral: "bg-white/10 text-space-cream",
      success: "bg-linear-to-b from-emerald-500 to-emerald-400 text-white",
    },
  },
  defaultVariants: {
    tone: "accent",
  },
});

export interface BadgeProps extends ComponentPropsWithoutRef<"span"> {
  size?: "lg" | "md";
  tone?: "accent" | "danger" | "neutral" | "success";
}

export function Badge({
  className,
  size = "md",
  tone = "accent",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        pillLayout({ size }),
        "shadow-surface",
        badgeStyles({ tone }),
        className,
      )}
      {...props}
    />
  );
}
