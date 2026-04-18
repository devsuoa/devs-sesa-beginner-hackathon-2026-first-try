"use client";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    /* 
      fixed inset-0: Covers the whole screen.
      z-[9999]: Puts it above almost everything (even sidebars).
      bg-slate-900: A solid background so you can't see the broken app behind it.
    */
    <div className="fixed inset-0 z-[9999] bg-slate-900 flex items-center justify-center">
      <div className="bg-slate-800 p-8 rounded-xl shadow-2xl w-full max-w-sm border border-slate-700">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">Login Only</h1>
        
        <form className="space-y-4">
          <input 
            type="text" 
            placeholder="Username"
            className="w-full p-3 rounded bg-slate-700 border border-slate-600 text-white"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password"
            className="w-full p-3 rounded bg-slate-700 border border-slate-600 text-white"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}