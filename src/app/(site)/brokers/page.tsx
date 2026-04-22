import prisma from "../../../lib/prisma";
import Image from "next/image";
import { ShieldCheck, ExternalLink, Building2, Star, ArrowRight } from "lucide-react";

export default async function BrokersPage() {
  const brokers = await prisma.broker.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col min-h-screen font-sans relative bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      {/* GLOBAL VIP BACKGROUND */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/20 dark:bg-emerald-500/15 blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-screen"></div>
        <div className="absolute top-[40%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 dark:bg-purple-600/15 blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="container relative mx-auto px-4 py-24 z-10 max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-black uppercase tracking-wider mb-6 border border-emerald-500/20 shadow-sm backdrop-blur-md">
            <Star className="h-3.5 w-3.5 fill-current" /> Trusted Partners
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-zinc-900 dark:text-white mb-6">
            Elite Forex Brokers
          </h1>
          <p className="text-lg text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto font-medium">
            We have partnered with the most reliable and strictly regulated brokers in the industry. Open an account today to experience premium trading conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brokers.map((broker) => (
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
                  <a href={broker.affiliateLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold py-4 rounded-xl hover:bg-gradient-to-r hover:from-emerald-500 hover:to-emerald-600 hover:text-white transition-all duration-300 shadow-md group-hover:shadow-xl group">
                    Open Account <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
          {brokers.length === 0 && (
            <div className="col-span-full py-20 text-center text-zinc-500 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-white/50 dark:border-zinc-800/50">
              <Building2 className="h-12 w-12 mx-auto mb-4 text-zinc-400" />
              <p className="text-lg font-bold">Premium brokers will appear here soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
