"use client";

import { useState } from "react";
import { useGameSessionStore } from "@/lib/game-session/store";
import { TicketAnswerForm } from "@/components/tickets/ticket-answer-form";

type Mode = "response" | "manual";

export default function Home() {
  const selectedTicketId = useGameSessionStore(
    (state) => state.selectedTicketId
  );
  const tickets = useGameSessionStore((state) => state.tickets);

  const selectedTicket = selectedTicketId 
    ? tickets.find((t) => t.id === selectedTicketId)
    : null;

  const [mode, setMode] = useState<Mode>("response");

  const isTicketSelected = !!selectedTicket;

  return (
    <div className="flex flex-1 p-6 gap-6">      
      {/* LEFT PANEL */}
      <section className="flex-1 flex flex-col">
        <header className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Intergalactic Space Agency</h3>
            <h1 className="text-lg font-semibold">Ticket System</h1>
          </div>

        </header>

        <div className="flex-1 rounded-lg border p-4">
          {/* DEFAULT VIEW */}
          {!isTicketSelected && (
            <div className="space-y-3">
              <h2 className="font-semibold text-base">On-Shift Tasks</h2>
              <p className="text-sm">
                Welcome to the Intergalactic Space Agency Helpdesk. You will be
                responsible for assisting our most esteemed customers with all their
                intergalactic needs.
              </p>

              <div className="space-y-1 text-sm">
                <p className="font-semibold">Guidelines:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Carefully read ticket enquiries.</li>
                  <li>Respond correctly, promptly, and respectfully.</li>
                  <li>Refer to your manual when necessary – no mistakes tolerated.</li>
                </ul>
              </div>

              <p className="text-sm">You may clock out upon meeting our response quota.</p>
            </div>
          )}

          {/* TICKET SELECTED VIEW */}
          {isTicketSelected && selectedTicket && (
            <div className="space-y-4 relative">

              {/* TIMER*/}
              <span className="absolute top-0 right-0 text-sm font-semibold">
                {selectedTicket.timeLimitSeconds ?? "00:00"}
              </span>

              {/* PROFILE PICTURE PLACEHOLDER */}
              <div className="w-24 h-24 rounded-full bg-neutral-700 mx-auto" />

              {/* BASIC INFO */}
              <div className="space-y-1 text-sm">
                <p>
                  <span className="font-semibold">Ticket ID:</span> {selectedTicket.id}
                </p>
                <p>
                  <span className="font-semibold">Name:</span>{" "}
                  {selectedTicket.alien?.name ?? "Unknown"}
                </p>
                <p>
                  <span className="font-semibold">Alien Type:</span>{" "}
                  {selectedTicket.alien?.type ?? "Unknown"}
                </p>
              </div>

              {/* PROBLEM DESCRIPTION */}
              <div className="space-y-1 text-sm">
                <p className="font-semibold">Ticket Content</p>
                <p>{selectedTicket.question.text}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* RIGHT PANEL */}
      <section className="flex-1 flex flex-col">
        {/* NAVIGATION */}
        <header className="mb-4 flex items-center justify-between">
          <nav className="flex gap-2">
            <button
              type="button"
              onClick={() => setMode("response")}
            >
              Response
            </button>
            <button
              type="button"
              onClick={() => setMode("manual")}
            >
              Manual
            </button>
          </nav>
        </header>

        {/* CONTENT */}
        <div className="flex-1 flex flex-col gap-4">
          {/* DEFAULT VIEW: NO TICKET SELECTED */}
          {!isTicketSelected && (
            <>
              {/* STATUS TITLE */}
              <h2 className="text-sm font-semibold">Ticket Status</h2>

              {/* STATUS BOX */}
              <div className="rounded-lg border p-4 mb-4">
                <p className="text-sm">No ticket selected.</p>
              </div>

              {/* RESPOND TITLE */}
              <h2 className="text-sm font-semibold">Respond To Ticket</h2>

              {/* RESPOND BOX */}
              <div className="flex-1 rounded-lg border p-4">
                <p className="text-sm">Select a ticket from the sidebar to begin.</p>
              </div>
            </>
          )}
          
          {/* TICKET SELECTED + MANUAL MODE */}
          {isTicketSelected && mode === "manual" && (
            <>
              {/* MANUAL TITLE */}
              <h2 className="text-sm font-semibold mb-1">Manual</h2>

              {/* MANUAL BOX */}
              <div className="flex-1 rounded-lg border p-4">
                <p className="text-sm">
                  {/* TODO: Add manual text here */}
                </p>
              </div>
            </>
          )}

          {/* TICKET SELECTED + RESPONSE MODE */}
          {isTicketSelected && mode === "response" && selectedTicket && (
            <>
              {/* STATUS TITLE */}
              <h2 className="text-sm font-semibold">Ticket Status</h2>

              {/* STATUS BOX */}
              <div className="rounded-lg border p-4">
                <p className="text-sm">
                  {isTicketSelected ? "Awaiting ticket response" : "No ticket selected."}
                </p>
              </div>

             {/* RESPOND TITLE */}
            <h2 className="text-sm font-semibold">Respond To Ticket</h2>

            {/* RESPONSE BOX */}
            <div className="flex-1 rounded-lg border p-4 flex flex-col">
              {/* TODO: Implement ticket recieved message.  */}
              <div className="flex-1 mb-4 overflow-y-auto">
                {isTicketSelected ? "Ticket conversation placeholder" : "Select a ticket to begin."}
              </div>

               {/* TODO: Show response as message once sent.*/}
              <div className="mt-auto pt-2 border-t">
                <TicketAnswerForm
                  ticketId={selectedTicket.id}
                  questionId={selectedTicket.question.id}
                  />
              </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}