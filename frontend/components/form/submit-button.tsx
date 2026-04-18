"use client";

import { LoaderCircleIcon } from "lucide-react";
import { useFormContext } from "@/lib/form-context";

interface SubmitButtonProps {
  label: string;
}

export function SubmitButton({ label }: SubmitButtonProps) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => [state.isSubmitting, state.canSubmit]}>
      {([isSubmitting, canSubmit]) => (
        <button
          type="submit"
          disabled={!canSubmit || isSubmitting}
          className="border border-neutral-300 px-3 py-1 rounded text-sm disabled:opacity-50"
        >
          {isSubmitting ? (
            <LoaderCircleIcon className="size-4 animate-spin" />
          ) : (
            label
          )}
        </button>
      )}
    </form.Subscribe>
  );
}
