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
    <div className="flex flex-1 p-6 gap-6 text-[#F2E6EE]">

      {/* LEFT PANEL */}
      <section className="flex-1 flex flex-col">
        <header className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-[36px] font-medium">Intergalactic Space Agency</h3>
            <h1 className="text-[74px] font-bold leading-none">Ticket System</h1>
          </div>
        </header>

        <div className="flex-1 rounded-[90px] bg-[#191C5B] p-8 shadow-inner">

          {/* DEFAULT VIEW */}
          {!isTicketSelected && (
            <div className="space-y-6">
              <h2 className="text-[53px] font-bold">On-Shift Tasks</h2>

              <p className="text-[26px] font-bold">
                Welcome to the Intergalactic Space Agency Helpdesk.
              </p>

              <p className="text-[26px] font-normal">
                You will be responsible for assisting our most esteemed customers with all their intergalactic needs.
              </p>

              <div className="space-y-2">
                <p className="text-[26px] font-bold">Guidelines:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li className="text-[26px] font-normal">Carefully read ticket enquiries.</li>
                  <li className="text-[26px] font-normal">Respond correctly, promptly, and respectfully.</li>
                  <li className="text-[26px] font-normal">Refer to your manual when necessary – no mistakes tolerated.</li>
                </ul>
              </div>

              <p className="text-[26px] font-normal">You may clock out upon meeting our response quota.</p>
              <p className="text-[26px] font-bold italic">Do your best, and don't forget... we are always watching you!.</p>
            </div>
          )}

          {/* TICKET SELECTED VIEW */}
          {isTicketSelected && selectedTicket && (
            <div className="space-y-6 relative">

              {/* TIMER */}
              <span className="absolute top-0 right-0 bg-[#191C5B]/70 rounded-[19px] px-4 py-1 shadow-[0_0_25px_rgba(0,0,0,0.45)] text-[26px] font-bold">
                {selectedTicket.timeLimitSeconds ?? "00:00"}
              </span>

              {/* PROFILE PICTURE */}
              <div className="w-24 h-24 rounded-full bg-neutral-700 mx-auto shadow-[0_0_25px_rgba(0,0,0,0.45)]" />

              {/* BASIC INFO */}
              <div className="space-y-2">
                <p className="text-[28px] font-normal">
                  <span className="font-bold">Ticket ID:</span> {selectedTicket.id}
                </p>
                <p className="text-[28px] font-normal">
                  <span className="font-bold">Name:</span> {selectedTicket.alien?.name ?? "Unknown"}
                </p>
                <p className="text-[28px] font-normal">
                  <span className="font-bold">Alien Type:</span> {selectedTicket.alien?.type ?? "Unknown"}
                </p>
              </div>

              {/* PROBLEM DESCRIPTION */}
              <div className="space-y-2">
                <p className="text-[28px] font-bold">Ticket Content</p>
                <p className="text-[28px] font-bold">{selectedTicket.question.text}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* RIGHT PANEL */}
      <section className="flex-1 flex flex-col">

        {/* NAVIGATION */}
        <header className="mb-4 flex items-center justify-between relative z-10">
          <nav className="flex gap-4">
            <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setMode("response");
            }}
            className="
              text-[28px] font-medium 
              px-10 py-3 
              rounded-[25px] 
              text-white
              bg-gradient-to-br from-[#0600AB] to-[#977DFF]
              shadow-[0_0_25px_rgba(0,0,0,0.45)]
            "
          >
            Response
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setMode("manual");
            }}
            className="
              text-[28px] font-medium 
              px-10 py-3 
              rounded-[25px] 
              text-white
              bg-gradient-to-br from-[#0600AB] to-[#977DFF]
              shadow-[0_0_25px_rgba(0,0,0,0.45)]
            "
          >
            Manual
          </button>
          </nav>
        </header>

          {/* CONTENT */}
          <div className="flex-1 flex flex-col gap-6 relative z-0">

            {/* DEFAULT VIEW */}
              {!isTicketSelected && (
              <>
                <h2 className="text-[32px] font-bold">Ticket Status</h2>

                <div className="rounded-[90px] bg-[#191C5B] p-6 shadow-inner">
                  <p className="text-[26px] font-normal">No ticket selected.</p>
                </div>

                <h2 className="text-[32px] font-bold">Respond To Ticket</h2>

                <div className="flex-1 rounded-[90px] bg-[#191C5B] p-6 shadow-inner">
                  <p className="text-[26px] font-normal">Select a ticket from the sidebar to begin.</p>
                </div>
              </>
            )}

          {/* MANUAL MODE */}
          {isTicketSelected && mode === "manual" && (
            <>
              <h2 className="text-[32px] font-bold mb-1">Manual</h2>

              <div className="flex-1 rounded-[90px] bg-[#191C5B] p-6 shadow-inner">
                <p className="text-[26px] font-normal">
                  {/* TODO: Add manual text */}
                </p>
              </div>
            </>
          )}

          {/* RESPONSE MODE */}
          {isTicketSelected && mode === "response" && selectedTicket && (
            <>
              <h2 className="text-[32px] font-bold">Ticket Status</h2>

              <div className="rounded-[90px] bg-[#191C5B] p-6 shadow-inner">
                <p className="text-[28px] font-normal">
                  Awaiting ticket response
                </p>
              </div>

              <h2 className="text-[32px] font-bold">Respond To Ticket</h2>

              <div className="flex-1 rounded-[90px] bg-[#191C5B] p-6 flex flex-col shadow-inner">

                {/* CHAT AREA */}
                <div className="flex-1 overflow-y-auto scrollbar-none flex flex-col gap-6">

                  {/* PURPLE BUBBLE */}
                  <div className="max-w-[75%] bg-[#6A4DF4] text-white rounded-[25px] px-6 py-3 shadow-[0_0_25px_rgba(0,0,0,0.45)]">
                    Ticket Received
                  </div>

                  {/* WHITE BUBBLE */}
                  <div className="max-w-[75%] bg-white text-black rounded-[25px] px-6 py-3 shadow-[0_0_25px_rgba(0,0,0,0.45)] ml-auto">
                    Sent response message appears here.
                  </div>
                </div>

                {/* INPUT FIELD */}
                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="bg-white text-[#00033D] rounded-[25px] px-4 py-3 shadow-[0_0_25px_rgba(0,0,0,0.45)]">
                    <TicketAnswerForm
                      ticketId={selectedTicket.id}
                      questionId={selectedTicket.question.id}
                    />
                  </div>
                </div>

              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}