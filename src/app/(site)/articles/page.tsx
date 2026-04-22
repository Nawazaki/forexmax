import prisma from "../../../lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { FileText, Calendar, ArrowRight, Star } from "lucide-react";

export default async function ArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col min-h-screen font-sans relative bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      {/* GLOBAL VIP BACKGROUND */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 dark:bg-purple-600/15 blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 dark:bg-emerald-500/10 blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="container relative mx-auto px-4 py-24 z-10 max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-400 text-xs font-black uppercase tracking-wider mb-6 border border-purple-500/20 shadow-sm backdrop-blur-md">
            <Star className="h-3.5 w-3.5 fill-current" /> Daily Alpha
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-zinc-900 dark:text-white mb-6">
            Market Insights
          </h1>
          <p className="text-lg text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto font-medium">
            Stay ahead of the curve with deep fundamental analysis and market news.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
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
          {articles.length === 0 && (
            <div className="col-span-full py-20 text-center text-zinc-500 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-white/50 dark:border-zinc-800/50">
              <FileText className="h-12 w-12 mx-auto mb-4 text-zinc-400" />
              <p className="text-lg font-bold">New insights dropping soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
