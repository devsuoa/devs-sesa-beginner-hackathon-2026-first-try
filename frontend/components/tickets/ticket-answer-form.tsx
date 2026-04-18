"use client";

import { z } from "zod";
import { checkAnswer } from "@/api";
import { useAppForm } from "@/lib/form";
import { useGameSessionStore } from "@/lib/game-session/store";

const answerSchema = z.object({
  answer: z.string().min(1),
});

interface TicketAnswerFormProps {
  ticketId: string;
  questionId: number;
}

export function TicketAnswerForm({
  ticketId,
  questionId,
}: TicketAnswerFormProps) {
  const updateTicketStatus = useGameSessionStore(
    (state) => state.updateTicketStatus,
  );

  const form = useAppForm({
    defaultValues: { answer: "" },
    validators: { onMount: answerSchema, onChange: answerSchema },
    onSubmit: async ({ value }) => {
      const { result } = await checkAnswer({
        id: questionId,
        answer: value.answer,
      });
      updateTicketStatus(ticketId, result ? "success" : "strike");
    },
  });

  return (
    <form.AppForm>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="flex gap-2 w-full"
      >
        <form.AppField name="answer">
          {(field) => <field.TextField placeholder="Your message…" />}
        </form.AppField>
        <form.SubmitButton label="Send" />
      </form>
    </form.AppForm>
  );
}
