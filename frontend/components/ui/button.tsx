"use client";

import {
  Button as BaseButton,
  type ButtonProps as BaseButtonProps,
} from "@base-ui/react/button";
import * as React from "react";
import { pillLayout } from "@/lib/ui/recipes";
import { cn } from "@/lib/utils";

export interface ButtonProps extends BaseButtonProps {
  size?: "lg" | "md";
  variant?: "ghost" | "primary" | "surface";
}

export const Button = React.forwardRef<HTMLElement, ButtonProps>(
  ({ className, size = "md", variant = "primary", ...props }, ref) => {
    return (
      <BaseButton
        className={cn(
          pillLayout({ size }),
          "font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white/60 disabled:cursor-not-allowed disabled:opacity-50",
          variant === "primary" &&
            "bg-linear-to-b from-space-accent to-space-accent-light text-white shadow-surface",
          variant === "surface" &&
            "bg-white text-space-night shadow-surface-soft",
          variant === "ghost" && "bg-white/10 text-white hover:bg-white/15",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
