import { PanelCard } from "@/components/dashboard/panel-card";
import { bodyText } from "@/lib/ui/recipes";

export function EmptyWorkspace() {
  return (
    <PanelCard className="flex-1">
      <p className={bodyText()}>Select a ticket from the sidebar to begin.</p>
    </PanelCard>
  );
}
