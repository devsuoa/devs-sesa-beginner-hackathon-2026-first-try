import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { GameSessionProvider } from "@/components/providers/game-session";
import { QueryProvider } from "@/components/providers/query";
import { useGameSessionStore } from "@/lib/game-session/store";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Helpdesk",
  description: "Intergalactic Space Agency Helpdesk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={urbanist.variable}>
      <body className="min-h-screen bg-space-night text-space-cream">
        <QueryProvider>
          <GameSessionProvider>
            <div className="min-h-screen p-3 sm:p-4 lg:p-6">
              <div className="mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-[120rem] flex-col overflow-hidden rounded-[var(--radius-panel-outer)] border border-white/10 bg-space-night shadow-surface-strong sm:min-h-[calc(100vh-2rem)] lg:min-h-[calc(100vh-3rem)]">
                <Topbar />

                <div className="flex min-h-0 flex-1 gap-4 p-4 sm:gap-6 sm:p-6 lg:gap-8 lg:p-8">
                  <aside className="flex min-h-0 w-12 shrink-0">
                    <Sidebar />
                  </aside>

                  <main className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
                    {children}
                  </main>
                </div>
              </div>
            </div>
          </GameSessionProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
