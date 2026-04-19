import type { ReactNode } from "react";
import { Button as UIButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Surface } from "@/components/ui/surface";
import { bodyTextStrong } from "@/lib/ui/recipes";
import { cn } from "@/lib/utils";

export default function Page() {
  return (
    <div className="flex min-h-full w-full flex-1 items-center justify-center p-4 sm:p-6">
      <Group>
        <p className={cn(bodyTextStrong(), "text-center")}>
          This is login page
        </p>
        <InputField />
        <InputField />
        <LoginButton />
      </Group>
    </div>
  );
}

interface GroupProps {
  children: ReactNode;
}

function Group(props: GroupProps) {
  return (
    <Surface
      className="flex w-full max-w-sm flex-col gap-4"
      density="compact"
      shadow="default"
      tone="panel"
    >
      {props.children}
    </Surface>
  );
}

function InputField() {
  return (
    <Input
      className="rounded-panel-inner w-full border-white/20 bg-white shadow-surface"
      size="lg"
      placeholder="input field"
    />
  );
}

function LoginButton() {
  return (
    <UIButton
      className="rounded-panel-inner w-full"
      size="lg"
      type="submit"
      variant="surface"
    >
      Login
    </UIButton>
  );
}
