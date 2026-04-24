"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, Eye, EyeOff, Sparkles, Globe, Code, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // Replace this with your actual signIn logic
    try {
      // const result = await signIn("credentials", { ... });
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4 bg-zinc-950 overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-zinc-900/40 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden relative z-10">
        <div className="p-8 md:p-12">
          <div className="text-center mb-10">
            <div className="inline-flex p-3 bg-purple-500/10 rounded-2xl mb-4 border border-purple-500/20">
              <Sparkles className="h-8 w-8 text-purple-500" />
            </div>
            <h1 className="text-4xl font-black text-white mb-3 tracking-tight">Welcome Back</h1>
            <p className="text-zinc-400 font-medium">Enter your details to access the terminal.</p>
          </div>

          {error && (
            <div className="bg-red-500/10 text-red-400 p-4 rounded-2xl text-sm mb-8 border border-red-500/20 font-semibold text-center animate-in fade-in slide-in-from-top-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Email or Username</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Mail className="h-5 w-5 text-zinc-500 group-focus-within:text-purple-400 transition-colors" />
                  </div>
                  <input 
                    type="text" name="email" required 
                    className="w-full pl-12 pr-4 py-3.5 border border-zinc-800 rounded-2xl bg-zinc-900/50 backdrop-blur-md outline-none focus:border-purple-500 transition-all text-white placeholder:text-zinc-600 font-medium" 
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Password</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Lock className="h-5 w-5 text-zinc-500 group-focus-within:text-purple-400 transition-colors" />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} name="password" required 
                    className="w-full pl-12 pr-12 py-3.5 border border-zinc-800 rounded-2xl bg-zinc-900/50 backdrop-blur-md outline-none focus:border-purple-500 transition-all text-white placeholder:text-zinc-600 font-medium" 
                    placeholder="••••••••"
                  />
                  <button 
                    type="button" onClick={() => setShowPassword(!showPassword)} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-purple-500 focus:ring-purple-500" />
                <span className="text-zinc-400 group-hover:text-zinc-300 transition-colors">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-purple-500 hover:text-purple-400 font-bold transition-colors">
                Forgot password?
              </Link>
            </div>

            <button 
              type="submit" disabled={loading} 
              className="w-full bg-purple-600 text-white font-bold py-4 rounded-2xl hover:bg-purple-500 disabled:opacity-30 transition-all shadow-xl shadow-purple-900/20 flex items-center justify-center gap-2 group"
            >
              {loading ? "Authenticating..." : "Sign In"} <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 grid grid-cols-1 gap-4">
            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-zinc-800"></div>
              <span className="flex-shrink mx-4 text-xs font-bold text-zinc-600 uppercase tracking-widest">Quick Access</span>
              <div className="flex-grow border-t border-zinc-800"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 bg-white text-zinc-900 font-bold py-3 rounded-xl hover:bg-zinc-100 transition-all">
                <Chrome className="h-5 w-5" /> Google
              </button>
              <button className="flex items-center justify-center gap-3 bg-zinc-800 text-white font-bold py-3 rounded-xl hover:bg-zinc-700 transition-all">
                <Github className="h-5 w-5" /> GitHub
              </button>
            </div>
          </div>

          <p className="text-center mt-8 text-zinc-500 text-sm font-medium">
            Don't have an account? <Link href="/register" className="text-purple-500 hover:text-purple-400 font-bold transition-colors">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
