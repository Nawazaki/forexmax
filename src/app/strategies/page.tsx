import prisma from "../../lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, TrendingUp, ArrowRight, Star } from "lucide-react";

export default async function StrategiesPage() {
  const strategies = await prisma.strategy.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col min-h-screen font-sans relative bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      {/* GLOBAL VIP BACKGROUND */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[50%] h-[50%] bg-amber-400/20 dark:bg-amber-400/15 blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-screen"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 dark:bg-emerald-500/10 blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="container relative mx-auto px-4 py-24 z-10 max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-black uppercase tracking-wider mb-6 border border-amber-500/20 shadow-sm backdrop-blur-md">
            <Star className="h-3.5 w-3.5 fill-current" /> Trading Edge
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-zinc-900 dark:text-white mb-6">
            Elite Strategies
          </h1>
          <p className="text-lg text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto font-medium">
            Discover step-by-step trading blueprints used by professional market makers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {strategies.map((strategy) => (
            <Link href={`/strategies/${strategy.id}`} key={strategy.id} className="group block h-full">
              <div className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-2xl rounded-[2rem] shadow-xl hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 border border-white/50 dark:border-zinc-700/50 overflow-hidden hover:-translate-y-2 hover:border-amber-500/50 h-full flex flex-col">
                <div className="relative h-60 w-full bg-gradient-to-br from-white/40 to-white/10 dark:from-zinc-800/40 dark:to-zinc-900/40 overflow-hidden border-b border-zinc-200/50 dark:border-zinc-800/50">
                  {strategy.imageUrl ? (
                    <Image src={strategy.imageUrl} alt={strategy.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="h-14 w-14 text-amber-500/50 dark:text-amber-500/30 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="absolute top-5 left-5">
                    <span className="px-4 py-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md text-amber-600 dark:text-amber-400 text-xs font-black rounded-xl shadow-lg border border-amber-500/20 uppercase tracking-widest">
                      {strategy.difficulty}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-4 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                    {strategy.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 line-clamp-3 mb-8 leading-relaxed font-medium">
                    {strategy.content}
                  </p>
                  <div className="mt-auto flex items-center text-sm font-black uppercase tracking-widest text-amber-600 dark:text-amber-400">
                    Read Strategy <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {strategies.length === 0 && (
            <div className="col-span-full py-20 text-center text-zinc-500 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-white/50 dark:border-zinc-800/50">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 text-zinc-400" />
              <p className="text-lg font-bold">More strategies coming soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
