"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser } from "../../actions/auth";
import { 
  User, Mail, Lock, Eye, EyeOff, CheckCircle2, 
  AlertCircle, Sparkles, Github, Chrome, ArrowRight 
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDisclaimerAccepted, setIsDisclaimerAccepted] = useState(false);

  // Form States
  const [form, setForm] = useState({
    firstName: "", lastName: "", username: "",
    email: "", password: "", confirmPassword: ""
  });

  // Validation States
  const [validations, setValidations] = useState({
    email: { isValid: false, touched: false },
    password: { isValid: false, touched: false },
    confirm: { isValid: false, touched: false },
  });

  const [strength, setStrength] = useState({ label: "Weak", color: "bg-red-500", width: "33%" });

  // Real-time validation logic
  useEffect(() => {
    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(form.email);
    setValidations(prev => ({ 
      ...prev, email: { isValid: isEmailValid, touched: prev.email.touched } 
    }));

    // Password Strength & Validation
    let score = 0;
    if (form.password.length >= 6) score++;
    if (/[A-Z]/.test(form.password) && /[0-9]/.test(form.password)) score++;
    if (/[^A-Za-z0-9]/.test(form.password)) score++;

    if (score === 0) setStrength({ label: "Too Short", color: "bg-zinc-700", width: "10%" });
    else if (score === 1) setStrength({ label: "Weak", color: "bg-red-500", width: "33%" });
    else if (score === 2) setStrength({ label: "Medium", color: "bg-amber-500", width: "66%" });
    else setStrength({ label: "Strong", color: "bg-emerald-500", width: "100%" });

    // Confirm Password match
    const passwordsMatch = form.password === form.confirmPassword && form.confirmPassword !== "";
    setValidations(prev => ({ 
      ...prev, confirm: { isValid: passwordsMatch, touched: prev.confirm.touched } 
    }));
  }, [form]);

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

  const InputField = ({ icon: Icon, label, name, type = "text", placeholder, gridSpan = "col-span-1" }: any) => {
    const isTouched = validations[name as keyof typeof validations]?.touched;
    const isValid = validations[name as keyof typeof validations]?.isValid;
    
    return (
      <div className={`${gridSpan} space-y-2`}>
        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">{label}</label>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300">
            <Icon className={`h-5 w-5 ${isValid && isTouched ? "text-emerald-500" : "text-zinc-500 group-focus-within:text-emerald-400"}`} />
          </div>
          <input 
            type={type} name={name} placeholder={placeholder}
            onBlur={() => setValidations(p => ({ ...p, [name]: { ...p[name as keyof typeof validations], touched: true }}))}
            onChange={(e) => setForm({ ...form, [name]: e.target.value })}
            className={`w-full pl-12 pr-12 py-3.5 border rounded-2xl bg-zinc-900/50 backdrop-blur-md outline-none transition-all duration-300 
              ${isValid && isTouched ? "border-emerald-500/50 ring-2 ring-emerald-500/10" : "border-zinc-800 focus:border-emerald-500"} 
              ${!isValid && isTouched ? "border-red-500/50 ring-2 ring-red-500/10" : ""}
              text-white placeholder:text-zinc-600 font-medium`} 
          />
          {(isValid || !isValid) && isTouched && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {isValid ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <AlertCircle className="h-5 w-5 text-red-500" />}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4 bg-zinc-950 overflow-hidden">
      {/* Premium Ambient Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="w-full max-w-2xl bg-zinc-900/40 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden relative z-10">
        <div className="p-8 md:p-12">
          <div className="text-center mb-10">
            <div className="inline-flex p-3 bg-emerald-500/10 rounded-2xl mb-4 border border-emerald-500/20">
              <Sparkles className="h-8 w-8 text-emerald-500" />
            </div>
            <h1 className="text-4xl font-black text-white mb-3 tracking-tight">Create Account</h1>
            <p className="text-zinc-400 font-medium">Join the most exclusive SMC trading circle.</p>
          </div>

          {error && (
            <div className="flex items-center gap-3 bg-red-500/10 text-red-400 p-4 rounded-2xl text-sm mb-8 border border-red-500/20 font-semibold animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="h-5 w-5" /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              <InputField icon={User} label="First Name" name="firstName" placeholder="John" />
              <InputField icon={User} label="Last Name" name="lastName" placeholder="Doe" />
              <InputField icon={User} label="Username" name="username" placeholder="johntrades" gridSpan="col-span-2" />
              <InputField icon={Mail} label="Email Address" name="email" type="email" placeholder="you@example.com" gridSpan="col-span-2" />
              
              <div className="col-span-1 space-y-2">
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Password</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Lock className="h-5 w-5 text-zinc-500 group-focus-within:text-emerald-400 transition-colors" />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} name="password" required
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full pl-12 pr-12 py-3.5 border border-zinc-800 rounded-2xl bg-zinc-900/50 backdrop-blur-md outline-none focus:border-emerald-500 transition-all text-white font-medium" 
                  />
                  <button 
                    type="button" onClick={() => setShowPassword(!showPassword)} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {/* Password Strength Indicator */}
                <div className="px-1 pt-2 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase text-zinc-500 tracking-tighter">Strength: {strength.label}</span>
                  </div>
                  <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className={`h-full transition-all duration-500 ${strength.color}`} style={{ width: strength.width }} />
                  </div>
                </div>
              </div>

              <div className="col-span-1 space-y-2">
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Confirm Password</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Lock className="h-5 w-5 text-zinc-500 group-focus-within:text-emerald-400 transition-colors" />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} name="confirmPassword" required
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    className={`w-full pl-12 pr-12 py-3.5 border rounded-2xl bg-zinc-900/50 backdrop-blur-md outline-none transition-all text-white font-medium 
                      ${validations.confirm.isValid && validations.confirm.touched ? "border-emerald-500/50 ring-2 ring-emerald-500/10" : "border-zinc-800 focus:border-emerald-500"} 
                      ${!validations.confirm.isValid && validations.confirm.touched ? "border-red-500/50" : ""}`} 
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {validations.confirm.isValid && validations.confirm.touched && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-zinc-800/30 rounded-2xl border border-zinc-700/50 transition-all hover:bg-zinc-800/50 group cursor-pointer">
              <input 
                type="checkbox" id="disclaimer" 
                onChange={(e) => setIsDisclaimerAccepted(e.target.checked)}
                className="w-5 h-5 rounded-md border-zinc-700 bg-zinc-900 text-emerald-500 focus:ring-emerald-500 cursor-pointer" 
              />
              <label htmlFor="disclaimer" className="text-sm text-zinc-400 cursor-pointer group-hover:text-zinc-300 transition-colors">
                I agree to the <span className="text-emerald-500 font-bold">Risk Disclaimer</span>
              </label>
            </div>

            <button 
              type="submit" disabled={loading || !isDisclaimerAccepted} 
              className="w-full bg-emerald-600 text-white font-bold py-4 rounded-2xl hover:bg-emerald-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-xl shadow-emerald-900/20 flex items-center justify-center gap-2 group"
            >
              {loading ? "Processing..." : "Create Account"} <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 grid grid-cols-1 gap-4">
            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-zinc-800"></div>
              <span className="flex-shrink mx-4 text-xs font-bold text-zinc-600 uppercase tracking-widest">Or continue with</span>
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
            Already a member? <Link href="/login" className="text-emerald-500 hover:text-emerald-400 font-bold transition-colors">Log in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
