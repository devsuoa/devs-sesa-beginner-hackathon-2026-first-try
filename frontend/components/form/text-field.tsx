"use client";

import { useFieldContext } from "@/lib/form-context";

interface TextFieldProps {
  placeholder?: string;
}

export function TextField({ placeholder }: TextFieldProps) {
  const field = useFieldContext<string>();

  return (
    <input
      type="text"
      value={field.state.value}
      onChange={(e) => field.handleChange(e.target.value)}
      onBlur={field.handleBlur}
      placeholder={placeholder}
      className="border border-neutral-300 rounded px-2 py-1 text-sm w-full"
    />
  );
}
