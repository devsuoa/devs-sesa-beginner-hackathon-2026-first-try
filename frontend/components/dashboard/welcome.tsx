import { bodyText, bodyTextStrong } from "@/lib/ui/recipes";
import { cn } from "@/lib/utils";

export function Welcome() {
  return (
    <div className="space-y-[clamp(1rem,3vw,1.5rem)]">
      <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold">Welcome</h2>

      <p className={bodyTextStrong()}>
        Welcome to the Intergalactic Space Agency Helpdesk.
      </p>

      <p className={bodyText()}>
        You will be responsible for assisting our most esteemed customers with
        all their intergalactic needs.
      </p>

      <div className="space-y-2">
        <p className={bodyTextStrong()}>Guidelines:</p>
        <ul className="list-inside list-disc space-y-1">
          <li className={bodyText()}>Carefully read ticket enquiries.</li>
          <li className={bodyText()}>
            Respond correctly, promptly, and respectfully.
          </li>
          <li className={bodyText()}>
            Refer to your manual when necessary - no mistakes tolerated.
          </li>
        </ul>
      </div>

      <p className={bodyText()}>
        You may clock out upon meeting our response quota.
      </p>

      <p className={cn(bodyTextStrong(), "italic")}>
        Do your best, and do not forget... we are always watching you!
      </p>
    </div>
  );
}
