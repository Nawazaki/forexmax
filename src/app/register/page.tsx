"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { registerUser } from "../../actions/auth";
import { User, Mail, Lock, ShieldCheck, Sparkles } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await registerUser(formData);
    
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/login?registered=true");
    }
  }

  return (
    <div className="relative flex min-h-[calc(100vh-80px)] items-center justify-center p-4 py-12 overflow-hidden selection:bg-emerald-500/30">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 dark:bg-emerald-500/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 dark:bg-purple-600/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/20 dark:border-zinc-800/50 overflow-hidden relative z-10">
        <div className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-purple-600 p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="relative z-10 flex justify-center mb-4">
            <div className="bg-white/20 p-3.5 rounded-2xl backdrop-blur-md shadow-inner">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="relative z-10 text-3xl font-black text-white mb-2 tracking-tight">Join the Elite</h1>
          <p className="relative z-10 text-emerald-100 font-medium">Create your ForexMax account and master the markets.</p>
        </div>

        <div className="p-8 md:p-10">
          {error && (
            <div className="flex items-center gap-3 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 p-4 rounded-xl text-sm mb-6 border border-red-200 dark:border-red-500/20 font-semibold">
              <ShieldCheck className="h-5 w-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 h-5 w-5 text-zinc-400" />
                  <input type="text" name="fullName" required className="w-full pl-12 pr-4 py-3.5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-950/50 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all dark:text-white font-medium" placeholder="John Doe" />
                </div>
              </div>

              <div className="md:col-span-2">
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

              <div>
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 h-5 w-5 text-zinc-400" />
                  <input type="password" name="confirmPassword" required className="w-full pl-12 pr-4 py-3.5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-950/50 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all dark:text-white font-medium" placeholder="••••••••" />
                </div>
              </div>
            </div>

            <div className="flex items-start mt-6">
              <div className="flex items-center h-5">
                <input id="terms" name="terms" type="checkbox" required className="w-5 h-5 border border-zinc-300 rounded-md bg-white focus:ring-3 focus:ring-emerald-500/20 text-emerald-600 dark:bg-zinc-800 dark:border-zinc-700 transition-all cursor-pointer" />
              </div>
              <label htmlFor="terms" className="ml-3 text-sm font-medium text-zinc-600 dark:text-zinc-400 cursor-pointer">
                I agree to the <a href="#" className="text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 font-bold transition-colors">Terms</a> and <a href="#" className="text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 font-bold transition-colors">Privacy Policy</a>.
              </label>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold py-4 rounded-xl hover:from-emerald-400 hover:to-emerald-500 transition-all disabled:opacity-70 shadow-lg shadow-emerald-500/25 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2">
              {loading ? "Creating Account..." : "Complete Registration"}
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800/50 text-center">
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Already have an account? <Link href="/login" className="text-purple-600 dark:text-purple-400 font-bold hover:text-purple-500 transition-colors ml-1">Log in here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
