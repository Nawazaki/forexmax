"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { verifyEmail } from "@/app/actions/auth";
import { CheckCircle2, AlertCircle, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function VerifyPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        setStatus("error");
        setMessage("No verification token found.");
        return;
      }

      const result = await verifyEmail(token);
      if (result.success) {
        setStatus("success");
        setMessage("Your email has been successfully verified!");
      } else {
        setStatus("error");
        setMessage(result.error || "Verification failed.");
      }
    };

    verify();
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4 bg-zinc-950 overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-zinc-900/40 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden relative z-10 p-8 md:p-12 text-center">
        <div className="inline-flex p-3 bg-zinc-800/50 rounded-2xl mb-6 border border-zinc-700">
          {status === "success" ? (
            <CheckCircle2 className="h-10 w-10 text-emerald-500" />
          ) : status === "error" ? (
            <AlertCircle className="h-10 w-10 text-red-500" />
          ) : (
            <Sparkles className="h-10 w-10 text-emerald-500 animate-spin" />
          )}
        </div>

        <h1 className="text-3xl font-black text-white mb-4">
          {status === "loading" ? "Verifying..." : status === "success" ? "Verified!" : "Verification Failed"}
        </h1>
        
        <p className="text-zinc-400 font-medium mb-8">
          {message || (status === "loading" ? "Please wait while we validate your token..." : "")}
        </p>

        {status === "success" && (
          <Link 
            href="/login" 
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold py-4 rounded-2xl hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/20"
          >
            Continue to Login <ArrowRight className="h-5 w-5" />
          </Link>
        )}

        {status === "error" && (
          <Link 
            href="/register" 
            className="w-full flex items-center justify-center gap-2 bg-zinc-800 text-white font-bold py-4 rounded-2xl hover:bg-zinc-700 transition-all"
          >
            Try Registering Again
          </Link>
        )}
      </div>
    </div>
  );
}
