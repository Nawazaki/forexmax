"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { LayoutDashboard, LogOut, Menu, X, Building2, Target, BookOpen, MessageSquare, Sparkles } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-purple-500 to-amber-500 drop-shadow-sm hover:opacity-80 transition-opacity">
            <Sparkles className="h-6 w-6 text-emerald-500" />
            ForexMax
          </Link>

          {/* Desktop Links (Modern with Icons) */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/brokers" className="group flex items-center text-sm font-bold text-zinc-600 dark:text-zinc-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
              <Building2 className="h-4 w-4 mr-1.5 text-zinc-400 group-hover:text-emerald-500 transition-colors" />
              Brokers
            </Link>
            <Link href="/strategies" className="group flex items-center text-sm font-bold text-zinc-600 dark:text-zinc-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
              <Target className="h-4 w-4 mr-1.5 text-zinc-400 group-hover:text-amber-500 transition-colors" />
              Strategies
            </Link>
            <Link href="/articles" className="group flex items-center text-sm font-bold text-zinc-600 dark:text-zinc-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">
              <BookOpen className="h-4 w-4 mr-1.5 text-zinc-400 group-hover:text-purple-500 transition-colors" />
              Articles
            </Link>
            <Link href="/forum" className="group flex items-center text-sm font-bold text-zinc-600 dark:text-zinc-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
              <MessageSquare className="h-4 w-4 mr-1.5 text-zinc-400 group-hover:text-emerald-500 transition-colors" />
              Forum
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <div className="flex items-center gap-3">
                <Link href="/admin" className="flex items-center gap-2 text-sm font-bold text-zinc-700 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-900 px-4 py-2.5 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all border border-zinc-200 dark:border-zinc-800 group">
                  <LayoutDashboard className="h-4 w-4 text-purple-500 group-hover:scale-110 transition-transform" /> Dashboard
                </Link>
                <button onClick={() => signOut()} className="p-2.5 text-zinc-500 hover:text-red-500 bg-zinc-50 dark:bg-zinc-900 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 transition-all group" title="Logout">
                  <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" className="text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:text-emerald-500 transition-colors px-2">
                  Log In
                </Link>
                <Link href="/register" className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:from-emerald-400 hover:to-emerald-500 hover:-translate-y-0.5 transition-all duration-300">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-zinc-600 dark:text-zinc-300" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 p-4 space-y-2 shadow-xl absolute w-full">
          <Link href="/brokers" className="flex items-center p-3 text-sm font-bold text-zinc-600 dark:text-zinc-300 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:text-emerald-500 rounded-xl transition-all">
            <Building2 className="h-5 w-5 mr-3 text-emerald-500" /> Brokers
          </Link>
          <Link href="/strategies" className="flex items-center p-3 text-sm font-bold text-zinc-600 dark:text-zinc-300 hover:bg-amber-50 dark:hover:bg-amber-500/10 hover:text-amber-500 rounded-xl transition-all">
            <Target className="h-5 w-5 mr-3 text-amber-500" /> Strategies
          </Link>
          <Link href="/articles" className="flex items-center p-3 text-sm font-bold text-zinc-600 dark:text-zinc-300 hover:bg-purple-50 dark:hover:bg-purple-500/10 hover:text-purple-500 rounded-xl transition-all">
            <BookOpen className="h-5 w-5 mr-3 text-purple-500" /> Articles
          </Link>
          <Link href="/forum" className="flex items-center p-3 text-sm font-bold text-zinc-600 dark:text-zinc-300 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:text-emerald-500 rounded-xl transition-all">
            <MessageSquare className="h-5 w-5 mr-3 text-emerald-500" /> Forum
          </Link>
          
          <div className="pt-4 mt-2 border-t border-zinc-100 dark:border-zinc-800 flex flex-col gap-3">
            {session ? (
              <>
                <Link href="/admin" className="flex items-center justify-center w-full text-sm font-bold text-zinc-700 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-900 px-4 py-3 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all">
                  <LayoutDashboard className="h-4 w-4 mr-2 text-purple-500" /> Dashboard
                </Link>
                <button onClick={() => signOut()} className="flex items-center justify-center w-full text-sm font-bold text-red-600 bg-red-50 dark:bg-red-500/10 px-4 py-3 rounded-xl hover:bg-red-100 dark:hover:bg-red-500/20 transition-all">
                  <LogOut className="h-4 w-4 mr-2" /> Log Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="flex items-center justify-center w-full text-sm font-bold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 py-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all">
                  Log In
                </Link>
                <Link href="/register" className="flex items-center justify-center w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-emerald-500/25">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
