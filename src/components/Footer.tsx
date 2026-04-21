import Link from "next/link";
import { TrendingUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 py-12 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-gradient-to-b from-purple-500/5 to-transparent blur-3xl pointer-events-none"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-purple-500 to-amber-500 mb-4 inline-block">
              ForexMax
            </Link>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-xs leading-relaxed">
              The ultimate community for high-end forex traders. Learn, share, and grow your portfolio together.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/brokers" className="text-zinc-500 hover:text-emerald-500 transition-colors">Trusted Brokers</Link></li>
              <li><Link href="/strategies" className="text-zinc-500 hover:text-amber-500 transition-colors">Trading Strategies</Link></li>
              <li><Link href="/forum" className="text-zinc-500 hover:text-purple-500 transition-colors">Community Forum</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span> Newsletter
            </h4>
            <div className="flex gap-2">
              <input type="email" placeholder="Email address" className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 rounded-xl text-sm w-full outline-none focus:border-purple-500 transition-colors" />
              <button className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity">
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center text-sm text-zinc-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} ForexMax. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-emerald-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
