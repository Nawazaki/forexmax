import prisma from "../lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { FileText, Calendar, ArrowRight } from "lucide-react";

export async function LatestArticles() {
  const latestArticles = await prisma.article.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {latestArticles.map((article) => (
        <Link href={`/articles/${article.id}`} key={article.id} className="group block h-full">
          <div className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-2xl rounded-[2rem] shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 border border-white/50 dark:border-zinc-700/50 overflow-hidden hover:-translate-y-2 hover:border-purple-500/50 h-full flex flex-col">
            <div className="relative h-60 w-full bg-gradient-to-br from-white/40 to-white/10 dark:from-zinc-800/40 dark:to-zinc-900/40 overflow-hidden border-b border-zinc-200/50 dark:border-zinc-800/50">
              {article.imageUrl ? (
                <Image src={article.imageUrl} alt={article.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileText className="h-14 w-14 text-purple-500/50 dark:text-purple-500/30 group-hover:scale-110 transition-transform duration-500" />
                </div>
              )}
              <div className="absolute top-5 left-5">
                <span className="px-4 py-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md text-purple-600 dark:text-purple-400 text-xs font-black rounded-xl shadow-lg border border-purple-500/20 uppercase tracking-widest">
                  {article.category}
                </span>
              </div>
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-6 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors leading-snug">
                {article.title}
              </h3>
              <div className="mt-auto flex items-center justify-between border-t border-zinc-200/50 dark:border-zinc-800/50 pt-6">
                <div className="flex items-center gap-2 text-sm font-bold text-zinc-500 dark:text-zinc-400">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="text-purple-600 dark:text-purple-400 bg-purple-500/10 p-3 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition-all shadow-sm group-hover:shadow-md">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
