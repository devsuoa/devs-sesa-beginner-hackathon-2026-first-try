"use client";

import { ScrollArea } from "@base-ui/react/scroll-area";
import * as React from "react";
import { cn } from "@/lib/utils";

interface AppScrollAreaProps
  extends React.ComponentPropsWithoutRef<typeof ScrollArea.Root> {
  contentClassName?: string;
  viewportClassName?: string;
}

export const AppScrollArea = React.forwardRef<
  HTMLDivElement,
  AppScrollAreaProps
>(
  (
    { children, className, contentClassName, viewportClassName, ...props },
    ref,
  ) => {
    return (
      <ScrollArea.Root
        className={cn("relative overflow-hidden", className)}
        ref={ref}
        {...props}
      >
        <ScrollArea.Viewport className={cn("size-full", viewportClassName)}>
          <ScrollArea.Content className={cn("min-w-full", contentClassName)}>
            {children}
          </ScrollArea.Content>
        </ScrollArea.Viewport>
      </ScrollArea.Root>
    );
  },
);

AppScrollArea.displayName = "AppScrollArea";
