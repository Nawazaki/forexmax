"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { Lock, Mail, TrendingUp } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password");
        setLoading(false);
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/20 dark:border-zinc-800/50 p-8 md:p-10 relative z-10">
      <div className="flex justify-center mb-6">
        <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-500/20 dark:to-emerald-600/20 p-4 rounded-2xl shadow-inner">
          <TrendingUp className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
        </div>
      </div>
      <h1 className="text-3xl font-black text-center text-zinc-900 dark:text-white mb-2 tracking-tight">Welcome Back</h1>
      <p className="text-center font-medium text-zinc-500 dark:text-zinc-400 mb-8">Log in to your ForexMax account.</p>
      
      {registered && (
        <div className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 p-4 rounded-xl text-sm mb-6 text-center border border-emerald-200 dark:border-emerald-500/20 font-bold shadow-sm">
          Registration successful! Please log in.
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 p-4 rounded-xl text-sm mb-6 text-center border border-red-200 dark:border-red-500/20 font-bold shadow-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 h-5 w-5 text-zinc-400" />
            <input type="email" name="email" required className="w-full pl-12 pr-4 py-3.5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-950/50 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all dark:text-white font-medium" placeholder="you@example.com" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-3.5 h-5 w-5 text-zinc-400" />
            <input type="password" name="password" required className="w-full pl-12 pr-4 py-3.5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-950/50 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all dark:text-white font-medium" placeholder="••••••••" />
          </div>
        </div>
        <button type="submit" disabled={loading} className="w-full mt-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold py-4 rounded-xl hover:from-emerald-400 hover:to-emerald-500 transition-all disabled:opacity-70 shadow-lg shadow-emerald-500/25 transform hover:-translate-y-0.5 active:translate-y-0">
          {loading ? "Authenticating..." : "Log In Securely"}
        </button>
      </form>
      
      <p className="text-center text-sm font-medium text-zinc-600 dark:text-zinc-400 mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800/50">
        Don't have an account? <Link href="/register" className="text-purple-600 dark:text-purple-400 font-bold hover:text-purple-500 transition-colors ml-1">Sign up</Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="relative flex min-h-[calc(100vh-80px)] items-center justify-center p-4 overflow-hidden selection:bg-emerald-500/30">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 dark:bg-purple-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-400/10 dark:bg-amber-400/15 blur-[120px] rounded-full pointer-events-none"></div>

      <Suspense fallback={<div className="animate-pulse w-full max-w-md h-96 bg-zinc-100 dark:bg-zinc-800 rounded-[2rem]"></div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
