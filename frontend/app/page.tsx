"use client";
import { useState } from "react";

export default function Home() {
  const [hasStarted, setHasStarted] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    // Specific credentials check
    if (username === "agent323" && password === "galactic") {
      setHasStarted(true);
    } else {
      alert("ACCESS DENIED: Invalid credentials.");
    }
  };

  if (!hasStarted) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#00033D] flex font-sans">
        
        {/* LEFT SIDE: Logo Area */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-b from-[#876FF6] to-[#1D14B8] rounded-r-[40px]">
          {/* OBNOXIOUS STICKY NOTE */}
          <div className="absolute top-12 left-12 w-80 h-80 bg-[#FFE3A1] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] p-10 flex flex-col z-20 border-l-4 border-black/5 overflow-hidden">
            
            {/* Header */}
            <p className="text-black font-mono text-2xl font-black leading-tight uppercase">
              LOGIN DETAILS
            </p>

            {/* Middle Section: Scooted to the Left */}
            <div className="flex-1 flex flex-col justify-center space-y-3 pl-2">
              <p className="text-black font-mono text-[18px] font-bold tracking-tight lowercase">
                username: agent323
              </p>
              <p className="text-black font-mono text-[18px] font-bold tracking-tight lowercase">
                password: galactic
              </p>
            </div>

            {/* Bottom Right: Much Bigger, No Overlap */}
            <div className="flex justify-end mt-2">
              <div className="max-w-[220px] transform rotate-[-10deg] translate-y-2">
                <p className="text-[#8B4513] font-mono text-[24px] font-black uppercase leading-relaxed text-right underline decoration-2 underline-offset-8 italic">
                  DON'T LET THEM KNOW YOU'RE HUMAN!!
                </p>
              </div>
            </div>

          </div>

          <div className="text-center">
            {/* Logo Circle */}
            <div className="w-48 h-48 bg-[#5B42C3] rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(91,66,195,0.4)]">
              <span className="text-5xl font-black text-[#F2E6EE] italic">LOGO</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Login Area */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-slate-950">
          <div className="w-full max-w-sm space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-[#F2E6EE] tracking-tight">Intergalactic Space Agency Login</h1>
              <p className="text-slate-400 text-sm">Rise and shine, it's time to meet your daily quotas.</p>
            </div>
            
            <form onSubmit={handleStart} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Username</label>
                <input 
                  type="text" 
                  placeholder="Username" 
                  className="w-full bg-[#F2E6EE] border border-slate-800 p-4 rounded-xl text-white placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••••••" 
                  className="w-full bg-[#F2E6EE] border border-slate-800 p-4 rounded-xl text-white placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button className="w-full bg-[#876FF6] hover:bg-gradient-to-b from-[#876FF6] to-[#1D14B8] text-[#F2E6EE] font-bold py-4 rounded-xl shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98] mt-2">
                LOG IN
              </button>
            </form>
          </div>
        </div>

      </div>
    );
  }

  return (
    <div className="p-20">
      <h1 className="text-4xl font-bold text-green-500 animate-pulse">SYSTEM INITIALIZED...</h1>
      <p className="mt-4 text-xl">Welcome back, Agent 553.</p>
    </div>
  );
}
