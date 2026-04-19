"use client";

import { LoaderCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFormContext } from "@/lib/form-context";

interface SubmitButtonProps {
  label: string;
}

export function SubmitButton({ label }: SubmitButtonProps) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => [state.isSubmitting, state.canSubmit]}>
      {([isSubmitting, canSubmit]) => (
        <Button
          className="min-w-24"
          disabled={!canSubmit || isSubmitting}
          type="submit"
          variant="primary"
        >
          {isSubmitting ? (
            <LoaderCircleIcon className="size-4 animate-spin" />
          ) : (
            label
          )}
        </Button>
      )}
    </form.Subscribe>
  );
}
