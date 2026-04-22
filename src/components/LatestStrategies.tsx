import prisma from "../lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";

export async function LatestStrategies() {
  const latestStrategies = await prisma.strategy.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {latestStrategies.map((strategy) => (
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
    </div>
  );
}
