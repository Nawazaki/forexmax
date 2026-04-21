import prisma from "../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { MessageSquare, Calendar, Lock, MessageCircle, ArrowRight } from "lucide-react";
import { createTopic } from "../../actions/forum";
import Link from "next/link";

export default async function ForumPage() {
  const session = await getServerSession(authOptions);
  const topics = await prisma.forumTopic.findMany({
    include: { author: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col min-h-screen font-sans relative bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      {/* GLOBAL VIP BACKGROUND */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[40%] w-[50%] h-[50%] bg-purple-600/20 dark:bg-purple-600/15 blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/20 dark:bg-emerald-500/10 blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="container relative mx-auto px-4 py-24 z-10 max-w-6xl">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-400 text-xs font-black uppercase tracking-wider mb-6 border border-purple-500/20 shadow-sm backdrop-blur-md">
            <MessageSquare className="h-3.5 w-3.5 fill-current" /> Elite Discussions
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-zinc-900 dark:text-white mb-6">Community Forum</h1>
          <p className="text-lg text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto font-medium">
            Explore discussions, market analysis, and trading strategies shared by our elite members.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              {session ? (
                <div className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-2xl rounded-[2rem] border border-white/50 dark:border-zinc-700/50 p-8 shadow-xl">
                  <h3 className="text-xl font-black mb-6 flex items-center gap-3 text-zinc-900 dark:text-white">
                    <MessageSquare className="h-6 w-6 text-purple-500" /> Start a Topic
                  </h3>
                  <form action={createTopic} className="space-y-5">
                    <div>
                      <input type="text" name="title" required placeholder="Topic Title..." className="w-full px-5 py-4 rounded-xl border border-zinc-200/50 dark:border-zinc-700/50 bg-white/50 dark:bg-zinc-950/50 dark:text-white outline-none focus:ring-2 focus:ring-purple-500 font-medium transition-all" />
                    </div>
                    <div>
                      <textarea name="content" required rows={5} placeholder="Share your insights..." className="w-full px-5 py-4 rounded-xl border border-zinc-200/50 dark:border-zinc-700/50 bg-white/50 dark:bg-zinc-950/50 dark:text-white outline-none focus:ring-2 focus:ring-purple-500 font-medium resize-none transition-all"></textarea>
                    </div>
                    <button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all transform hover:-translate-y-0.5">
                      Post Topic
                    </button>
                  </form>
                </div>
              ) : (
                <div className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-2xl rounded-[2rem] border border-white/50 dark:border-zinc-700/50 p-10 text-center shadow-xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="bg-purple-100 dark:bg-purple-500/20 w-20 h-20 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-inner border border-purple-500/20">
                      <Lock className="h-10 w-10 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-4">Join the Conversation</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-8 font-medium">
                      You are in read-only mode. Register now to post topics and connect with traders.
                    </p>
                    <Link href="/register" className="flex items-center justify-center w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all mb-3">
                      Create Free Account
                    </Link>
                    <Link href="/login" className="flex items-center justify-center w-full bg-white/50 dark:bg-zinc-800/50 text-zinc-900 dark:text-white font-bold py-4 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-white dark:hover:bg-zinc-800 transition-all">
                      Log In
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Topics Feed */}
          <div className="lg:col-span-2 space-y-6">
            {topics.map((topic) => (
              <div key={topic.id} className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-2xl rounded-[2rem] border border-white/50 dark:border-zinc-700/50 p-8 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 group">
                <h2 className="text-2xl font-black text-zinc-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-4">
                  {topic.title}
                </h2>
                <p className="text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed mb-8 whitespace-pre-wrap">
                  {topic.content}
                </p>
                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-zinc-200/50 dark:border-zinc-800/50">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-500/20 dark:to-purple-600/20 flex items-center justify-center font-black text-purple-700 dark:text-purple-300 shadow-inner border border-purple-500/20">
                      {topic.author?.email?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span className="block text-sm font-black text-zinc-900 dark:text-white">
                        {topic.author?.email?.split('@')[0]}
                      </span>
                      <span className="flex items-center text-xs font-bold text-zinc-500 dark:text-zinc-400 mt-1">
                        <Calendar className="h-3 w-3 mr-1.5" /> {new Date(topic.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div>
                    {session ? (
                      <button className="flex items-center text-sm font-bold text-zinc-600 dark:text-zinc-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors bg-white/50 dark:bg-zinc-800/50 px-4 py-2 rounded-xl border border-zinc-200/50 dark:border-zinc-700/50">
                        <MessageCircle className="h-4 w-4 mr-2" /> Reply
                      </button>
                    ) : (
                      <Link href="/login" className="flex items-center text-sm font-bold text-purple-600 dark:text-purple-400 hover:text-purple-500 bg-purple-500/10 px-4 py-2 rounded-xl">
                        <Lock className="h-3.5 w-3.5 mr-2" /> Log in to reply
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {topics.length === 0 && (
              <div className="text-center py-24 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md rounded-[2rem] border border-white/50 dark:border-zinc-700/50">
                <div className="bg-zinc-100 dark:bg-zinc-800/50 w-20 h-20 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <MessageSquare className="h-10 w-10 text-zinc-400" />
                </div>
                <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-2">No Discussions Yet</h3>
                <p className="text-zinc-500 font-medium">Be the first trader to share an insight!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
