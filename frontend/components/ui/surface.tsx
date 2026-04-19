"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const PANEL_INNER_SHADOW =
  "inset 0 1px 0 rgb(255 255 255 / 0.06), inset 0 -1.5rem 2.5rem rgb(0 0 0 / 0.14)";

const surfaceStyles = cva("", {
  variants: {
    tone: {
      panel: "rounded-panel-outer bg-space-panel text-space-cream",
      inset: "rounded-panel-inner bg-white text-space-night",
      ghost: "rounded-panel-inner bg-white/5 text-space-cream",
    },
    density: {
      default: "",
      compact: "",
    },
  },
  compoundVariants: [
    {
      class: "p-[clamp(1.5rem,4vw,3rem)]",
      density: "default",
      tone: "panel",
    },
    {
      class: "p-[clamp(1.25rem,3vw,2rem)]",
      density: "compact",
      tone: "panel",
    },
    {
      class: "p-[clamp(0.75rem,1.5vw,1rem)]",
      density: "default",
      tone: "inset",
    },
    {
      class: "p-[clamp(0.75rem,1.5vw,1rem)]",
      density: "compact",
      tone: "inset",
    },
    {
      class: "p-[clamp(0.75rem,1.5vw,1rem)]",
      density: "default",
      tone: "ghost",
    },
    {
      class: "p-[clamp(0.75rem,1.5vw,1rem)]",
      density: "compact",
      tone: "ghost",
    },
  ],
  defaultVariants: {
    density: "default",
    tone: "panel",
  },
});

type SurfaceTone = NonNullable<VariantProps<typeof surfaceStyles>["tone"]>;
type SurfaceShadow = "default" | "none" | "soft" | "strong";

export interface SurfaceProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof surfaceStyles> {
  shadow?: SurfaceShadow;
}

function getOuterShadow(shadow: SurfaceShadow) {
  switch (shadow) {
    case "soft":
      return "var(--shadow-surface-soft)";
    case "strong":
      return "var(--shadow-surface-strong)";
    case "default":
      return "var(--shadow-surface)";
    case "none":
      return null;
  }
}

function getSurfaceBoxShadow(tone: SurfaceTone, shadow: SurfaceShadow) {
  const layers = [];
  const outerShadow = getOuterShadow(shadow);

  if (outerShadow) {
    layers.push(outerShadow);
  }

  if (tone === "panel") {
    layers.push(PANEL_INNER_SHADOW);
  }

  return layers.length > 0 ? layers.join(", ") : undefined;
}

export const Surface = React.forwardRef<HTMLDivElement, SurfaceProps>(
  (
    {
      className,
      density = "default",
      shadow = "none",
      style,
      tone = "panel",
      ...props
    },
    ref,
  ) => {
    const resolvedTone = tone ?? "panel";

    return (
      <div
        className={cn(
          surfaceStyles({ density, tone: resolvedTone }),
          className,
        )}
        ref={ref}
        style={{
          ...style,
          boxShadow: getSurfaceBoxShadow(resolvedTone, shadow),
        }}
        {...props}
      />
    );
  },
);

Surface.displayName = "Surface";
