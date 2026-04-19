import { PanelCard } from "@/components/dashboard/panel-card";
import { bodyText } from "@/lib/ui/recipes";

export function ManualPanel() {
  return (
    <PanelCard className="flex-1">
      <p className={bodyText()}>
        Manual content will live here. Use this route for reference material
        that helps agents answer tickets correctly.
      </p>
    </PanelCard>
  );
}
