import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Building2, ArrowRight, Star, ShieldCheck } from "lucide-react";

// 🛑 منع الكاش لضمان التحديث الفوري
export const revalidate = 0;

export default async function BrokersPage() {
  // جلب البيانات الحقيقية من قاعدة البيانات
  const brokers = await prisma.broker.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col min-h-screen font-sans relative bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      {/* GLOBAL VIP BACKGROUND */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 dark:bg-emerald-500/10 blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-screen"></div>
        <div className="absolute bottom-[20%] left-[10%] w-[50%] h-[50%] bg-purple-600/10 dark:bg-purple-600/15 blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="container relative mx-auto px-4 py-24 z-10 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-black uppercase tracking-wider mb-6 border border-emerald-500/20 shadow-sm backdrop-blur-md">
            <ShieldCheck className="h-3.5 w-3.5 fill-current" /> Verified Partners
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-zinc-900 dark:text-white mb-6">
            Trusted Brokers
          </h1>
          <p className="text-lg text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto font-medium">
            We've strictly vetted the industry's most reliable brokers to ensure your capital is safe and your execution is flawless.
          </p>
        </div>

        {/* Brokers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brokers.length === 0 ? (
            <div className="col-span-full py-20 text-center text-zinc-500 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-white/50 dark:border-zinc-800/50 shadow-xl">
              <Building2 className="h-12 w-12 mx-auto mb-4 text-zinc-400" />
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">No Brokers Yet</h3>
              <p className="text-lg font-medium">Our team is currently vetting the best brokers. Check back soon!</p>
            </div>
          ) : (
            brokers.map((broker) => (
              <div key={broker.id} className="group block h-full">
                <div className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-2xl rounded-[2rem] shadow-xl hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 border border-white/50 dark:border-zinc-700/50 overflow-hidden hover:-translate-y-2 hover:border-emerald-500/50 h-full flex flex-col">
                  
                  {/* Logo Area */}
                  <div className="relative h-48 w-full bg-gradient-to-br from-white/40 to-white/10 dark:from-zinc-800/40 dark:to-zinc-900/40 overflow-hidden border-b border-zinc-200/50 dark:border-zinc-800/50 flex items-center justify-center">
                    {broker.logoUrl ? (
                      <Image 
                        src={broker.logoUrl} 
                        alt={broker.name} 
                        fill 
                        className="object-contain p-8 group-hover:scale-110 transition-transform duration-700" 
                      />
                    ) : (
                      <Building2 className="h-14 w-14 text-emerald-500/50 dark:text-emerald-500/30 group-hover:scale-110 transition-transform duration-500" />
                    )}
                    
                    {/* Rating Badge */}
                    <div className="absolute top-5 left-5">
                      <span className="px-4 py-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md text-emerald-600 dark:text-emerald-400 text-xs font-black rounded-xl shadow-lg border border-emerald-500/20 uppercase tracking-widest flex items-center gap-1">
                        <Star className="h-3 w-3 fill-current" /> {broker.rating || "5.0/5"}
                      </span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-4 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                      {broker.name}
                    </h3>
                    
                    <p className="text-zinc-600 dark:text-zinc-400 line-clamp-3 mb-8 leading-relaxed font-medium">
                      {broker.description || "A premium broker strictly vetted by the ForexMax team."}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between gap-4">
                      <Link 
                        href={broker.websiteUrl} 
                        target="_blank"
                        className="flex-grow text-center px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors border border-zinc-200 dark:border-zinc-700"
                      >
                        Visit Site
                      </Link>
                      <Link 
                        href={broker.affiliateLink} 
                        target="_blank"
                        className="inline-flex items-center text-sm font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 transition-colors"
                      >
                        Open Account <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}