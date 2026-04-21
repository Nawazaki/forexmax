import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, TrendingUp, Users, BookOpen, FileText, Calendar, Building2, ExternalLink, Star, Sparkles } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import prisma from "../lib/prisma";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  const topBrokers = await prisma.broker.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  const latestStrategies = await prisma.strategy.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });

  const latestArticles = await prisma.article.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });

  return (
    <div className="flex flex-col min-h-screen font-sans selection:bg-purple-500/30 relative bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      
      {/* GLOBAL VIP BACKGROUND (Fixed Behind Everything) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/20 dark:bg-emerald-500/15 blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-screen"></div>
        <div className="absolute top-[40%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 dark:bg-purple-600/15 blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-amber-400/20 dark:bg-amber-400/10 blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Main Content Wrapper */}
      <div className="relative z-10 flex flex-col w-full">
        
        {/* 1. Hero Section */}
        <section className="relative py-28 md:py-40 border-b border-white/20 dark:border-zinc-800/50">
          <div className="container relative mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md border border-white/50 dark:border-zinc-700/50 shadow-lg mb-8 text-sm font-bold">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span className="text-zinc-800 dark:text-zinc-200">The New Era of Trading is Here</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-zinc-900 dark:text-white mb-6 leading-tight">
              Master the Markets with <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-purple-500 to-amber-500 drop-shadow-sm">
                ForexMax
              </span>
            </h1>
            <p className="mt-6 text-xl text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              Join the elite community of high-end forex traders. Access exclusive strategies, trusted broker reviews, and real-time market analysis.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/forum" 
                className="inline-flex justify-center items-center rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-emerald-500/25 hover:shadow-2xl hover:from-emerald-400 hover:to-emerald-500 hover:-translate-y-1 transition-all duration-300"
              >
                Join the Community <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/brokers" className="inline-flex justify-center items-center rounded-xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-white/50 dark:border-zinc-700/50 px-8 py-4 text-sm font-bold text-zinc-900 dark:text-white hover:border-purple-500/50 hover:bg-white dark:hover:bg-zinc-800 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 group">
                Find a Broker <Building2 className="ml-2 h-5 w-5 text-zinc-400 group-hover:text-purple-500 transition-colors" />
              </Link>
            </div>
          </div>
        </section>

        {/* 2. Top Recommended Brokers */}
        <section className="py-28 relative border-b border-white/20 dark:border-zinc-800/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-14">
              <div>
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-black uppercase tracking-wider mb-4 border border-amber-500/20 shadow-sm backdrop-blur-md">
                  <Star className="h-3.5 w-3.5 fill-current" /> Premium Partners
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-4">
                  Top Recommended Brokers
                </h2>
                <p className="text-zinc-700 dark:text-zinc-300 max-w-2xl text-lg font-medium">
                  Trade with confidence. We have strictly vetted and partnered with the most reliable brokers in the industry to ensure your funds are safe.
                </p>
              </div>
              <Link href="/brokers" className="hidden md:flex mt-4 md:mt-0 text-sm font-bold text-zinc-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 items-center transition-all group bg-white/50 dark:bg-zinc-900/50 px-5 py-3 rounded-xl backdrop-blur-md border border-zinc-200/50 dark:border-zinc-700/50 hover:border-emerald-500/30">
                View All Partners <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {topBrokers.map((broker) => (
                <div key={broker.id} className="group flex flex-col bg-white/60 dark:bg-zinc-900/60 backdrop-blur-2xl rounded-[2rem] shadow-xl hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 border border-white/50 dark:border-zinc-700/50 overflow-hidden hover:-translate-y-2 hover:border-emerald-500/50">
                  <div className="relative h-52 w-full bg-gradient-to-br from-white/40 to-white/10 dark:from-zinc-800/40 dark:to-zinc-900/40 overflow-hidden border-b border-zinc-200/50 dark:border-zinc-800/50 flex items-center justify-center">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/40 dark:from-white/5 via-transparent to-transparent transition-all duration-700"></div>
                    <div className="relative w-[70%] h-[70%] flex items-center justify-center bg-white dark:bg-zinc-950 rounded-2xl shadow-lg border border-zinc-100 dark:border-zinc-800 p-4 z-10 group-hover:scale-105 transition-transform duration-500">
                      {broker.logoUrl ? (
                        <Image src={broker.logoUrl} alt={`${broker.name} Logo`} fill className="object-contain p-4" />
                      ) : (
                        <Building2 className="h-16 w-16 text-zinc-300 dark:text-zinc-700" />
                      )}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow relative">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-2xl font-black text-zinc-900 dark:text-white">{broker.name}</h3>
                      <div className="flex items-center bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border border-emerald-500/20">
                        <ShieldCheck className="h-3.5 w-3.5 mr-1" /> Verified
                      </div>
                    </div>
                    <a href={broker.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 mb-8 flex items-center transition-colors">
                      Official Website <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                    </a>
                    <div className="mt-auto pt-6 border-t border-zinc-200/50 dark:border-zinc-800/50">
                      <a href={broker.affiliateLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold py-4 rounded-xl hover:bg-gradient-to-r hover:from-emerald-500 hover:to-emerald-600 hover:text-white transition-all duration-300 shadow-md group-hover/btn:shadow-xl group/btn">
                        Open Account <ArrowRight className="h-5 w-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Latest Strategies */}
        <section className="py-28 relative border-b border-white/20 dark:border-zinc-800/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-14">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-4 flex items-center gap-4">
                  <div className="bg-amber-500/20 p-3.5 rounded-2xl backdrop-blur-md border border-amber-500/30 shadow-inner">
                    <TrendingUp className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                  </div>
                  Latest Strategies
                </h2>
                <p className="text-zinc-700 dark:text-zinc-300 text-lg font-medium">Master new market approaches with elite tactics.</p>
              </div>
              <Link href="/strategies" className="hidden md:flex text-sm font-bold text-zinc-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 items-center transition-all group bg-white/50 dark:bg-zinc-900/50 px-5 py-3 rounded-xl backdrop-blur-md border border-zinc-200/50 dark:border-zinc-700/50 hover:border-amber-500/30">
                View All Strategies <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

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
          </div>
        </section>

        {/* 4. Recent Articles */}
        <section className="py-28 relative border-b border-white/20 dark:border-zinc-800/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-14">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-4 flex items-center gap-4">
                  <div className="bg-purple-500/20 p-3.5 rounded-2xl backdrop-blur-md border border-purple-500/30 shadow-inner">
                    <FileText className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  Market Insights
                </h2>
                <p className="text-zinc-700 dark:text-zinc-300 text-lg font-medium">Stay updated with the latest analysis and news.</p>
              </div>
              <Link href="/articles" className="hidden md:flex text-sm font-bold text-zinc-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 items-center transition-all group bg-white/50 dark:bg-zinc-900/50 px-5 py-3 rounded-xl backdrop-blur-md border border-zinc-200/50 dark:border-zinc-700/50 hover:border-purple-500/30">
                View All Articles <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

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
          </div>
        </section>

        {/* 5. Features Section */}
        <section className="py-28 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white mb-6 leading-tight">Why Join ForexMax?</h2>
              <p className="text-zinc-700 dark:text-zinc-300 text-xl font-medium max-w-2xl mx-auto">Everything you need to elevate your trading journey, packed in one elite platform.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Feature 1 */}
              <div className="p-10 rounded-[2.5rem] bg-white/60 dark:bg-zinc-900/60 backdrop-blur-2xl border border-white/50 dark:border-zinc-700/50 shadow-xl hover:shadow-2xl hover:shadow-amber-500/20 hover:-translate-y-2 hover:border-amber-500/50 transition-all duration-500 text-center group">
                <div className="h-24 w-24 rounded-[2rem] bg-amber-500/10 flex items-center justify-center mx-auto mb-8 shadow-inner border border-amber-500/20 group-hover:scale-110 transition-transform duration-500">
                  <TrendingUp className="h-12 w-12 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-4">Premium Strategies</h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg font-medium">
                  Access step-by-step trading strategies crafted by market veterans to help you maximize your edge.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="p-10 rounded-[2.5rem] bg-white/60 dark:bg-zinc-900/60 backdrop-blur-2xl border border-white/50 dark:border-zinc-700/50 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-2 hover:border-emerald-500/50 transition-all duration-500 text-center group">
                <div className="h-24 w-24 rounded-[2rem] bg-emerald-500/10 flex items-center justify-center mx-auto mb-8 shadow-inner border border-emerald-500/20 group-hover:scale-110 transition-transform duration-500">
                  <ShieldCheck className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-4">Trusted Brokers</h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg font-medium">
                  Trade with confidence. We only list strictly vetted, regulated brokers with the best trading conditions.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="p-10 rounded-[2.5rem] bg-white/60 dark:bg-zinc-900/60 backdrop-blur-2xl border border-white/50 dark:border-zinc-700/50 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2 hover:border-purple-500/50 transition-all duration-500 text-center group">
                <div className="h-24 w-24 rounded-[2rem] bg-purple-500/10 flex items-center justify-center mx-auto mb-8 shadow-inner border border-purple-500/20 group-hover:scale-110 transition-transform duration-500">
                  <Users className="h-12 w-12 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-4">Active Forum</h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg font-medium">
                  Engage with thousands of traders, share your chart analysis, and learn from the community's collective wisdom.
                </p>
              </div>

            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
