"use client";

import {
  Input as BaseInput,
  type InputProps as BaseInputProps,
} from "@base-ui/react/input";
import { cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const inputStyles = cva(
  "w-full rounded-full border border-transparent bg-transparent text-space-night outline-none transition-colors placeholder:text-space-night/50 focus-visible:border-space-accent data-[invalid]:border-red-500",
  {
    variants: {
      size: {
        md: "px-3 py-2 text-sm",
        lg: "px-4 py-3 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface InputProps extends Omit<BaseInputProps, "size"> {
  size?: "lg" | "md";
}

export const Input = React.forwardRef<HTMLElement, InputProps>(
  ({ className, size = "md", ...props }, ref) => {
    return (
      <BaseInput
        className={cn(inputStyles({ size }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
