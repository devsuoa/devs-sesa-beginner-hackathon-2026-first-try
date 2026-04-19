import type { ComponentPropsWithoutRef } from "react";
import { Surface } from "@/components/ui/surface";

type PanelCardProps = ComponentPropsWithoutRef<"div">;

export function PanelCard({ className, ...props }: PanelCardProps) {
  return <Surface className={className} tone="panel" {...props} />;
}
