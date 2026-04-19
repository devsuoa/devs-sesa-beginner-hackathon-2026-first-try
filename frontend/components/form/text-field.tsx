"use client";

import { Field } from "@base-ui/react/field";
import { Input } from "@/components/ui/input";
import { useFieldContext } from "@/lib/form-context";

interface TextFieldProps {
  placeholder?: string;
}

function getErrorMessage(error: unknown): string | null {
  if (typeof error === "string") {
    return error;
  }

  if (Array.isArray(error)) {
    for (const entry of error) {
      const message = getErrorMessage(entry);
      if (message) {
        return message;
      }
    }
  }

  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof (error as { message?: unknown }).message === "string"
  ) {
    return (error as { message: string }).message;
  }

  return null;
}

export function TextField({ placeholder }: TextFieldProps) {
  const field = useFieldContext<string>();
  const errorMessage =
    Object.values(field.state.meta.errorMap ?? {})
      .map(getErrorMessage)
      .find(Boolean) ?? null;
  const showError = field.state.meta.isTouched && Boolean(errorMessage);

  return (
    <Field.Root
      className="flex min-w-0 flex-1 flex-col gap-2"
      dirty={field.state.meta.isDirty}
      invalid={showError}
      touched={field.state.meta.isTouched}
    >
      <Field.Label className="sr-only">Response</Field.Label>
      <Input
        onBlur={field.handleBlur}
        onValueChange={(value) => field.handleChange(value)}
        placeholder={placeholder}
        value={field.state.value}
      />
      {errorMessage ? (
        <Field.Error className="text-sm text-red-500" match={showError}>
          {errorMessage}
        </Field.Error>
      ) : null}
    </Field.Root>
  );
}
