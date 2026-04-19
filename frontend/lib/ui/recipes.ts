import { cva } from "class-variance-authority";

export const bodyText = cva(
  "text-[clamp(0.875rem,1.4vw,1.125rem)] leading-[1.6]",
);

export const bodyTextStrong = cva(
  "text-[clamp(0.875rem,1.2vw,1rem)] leading-[1.5]",
);

export const sectionTitle = cva(
  "text-[clamp(1.25rem,2.25vw,1.875rem)] leading-[1.1]",
);

export const pillLayout = cva(
  "inline-flex items-center justify-center gap-2 rounded-full",
  {
    variants: {
      size: {
        md: "px-[clamp(1rem,2vw,1.5rem)] py-[clamp(0.625rem,1vw,0.875rem)] text-[clamp(0.875rem,1.2vw,1rem)]",
        lg: "px-[clamp(1rem,2vw,1.5rem)] py-[clamp(0.625rem,1vw,0.875rem)] text-sm sm:text-base md:text-lg lg:text-xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const bubbleLayout = cva(
  "max-w-[min(42rem,88%)] break-words rounded-bubble px-[clamp(1rem,2vw,1.5rem)] py-[clamp(0.75rem,1.25vw,1rem)] text-[clamp(0.875rem,1.4vw,1.125rem)] shadow-surface",
);
