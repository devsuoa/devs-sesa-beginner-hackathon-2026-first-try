import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { GameSessionProvider } from "@/components/providers/game-session";
import { QueryProvider } from "@/components/providers/query";
import { useGameSessionStore } from "@/lib/game-session/store";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alien Helpdesk",
  description: "Intergalactic Spage Agency ticket system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
    lang="en" 
    className={urbanist.variable}>
    <body className="min-h-screen" style={{ backgroundColor: "#00033D", color: "#F2E6EE" }}>
        <QueryProvider>
          <GameSessionProvider>
            <div className="min-h-screen flex flex-col">
              {/* TOP BAR */}
              <Topbar />

              {/* BODY */}
              <div className="flex flex-1">
                {/* SIDEBAR */}
                <aside className="w-64 border-r">
                  <Sidebar />
                </aside>

                {/* MAIN CONTENT */}
                <main className="flex flex-1">
                  {children}
                </main>
              </div>
            </div>
          </GameSessionProvider>
        </QueryProvider>
      </body>
    </html>
  );
}