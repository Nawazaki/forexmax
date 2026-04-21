import prisma from "../../lib/prisma";
import { Users, Briefcase, BookOpen, FileText, MessageSquare, Mail, Activity } from "lucide-react";

export default async function AdminDashboard() {
  const [userCount, brokerCount, strategyCount, articleCount, topicCount, subscriberCount] = await Promise.all([
    prisma.user.count(),
    prisma.broker.count(),
    prisma.strategy.count(),
    prisma.article.count(),
    prisma.forumTopic.count(),
    prisma.subscriber.count()
  ]);

  const stats = [
    { label: "Total Users", value: userCount, icon: Users, gradient: "from-blue-500 to-indigo-600" },
    { label: "Brokers Listed", value: brokerCount, icon: Briefcase, gradient: "from-emerald-400 to-teal-600" },
    { label: "Pro Strategies", value: strategyCount, icon: BookOpen, gradient: "from-purple-500 to-violet-600" },
    { label: "Published Articles", value: articleCount, icon: FileText, gradient: "from-orange-400 to-rose-500" },
    { label: "Forum Topics", value: topicCount, icon: MessageSquare, gradient: "from-cyan-400 to-blue-600" },
    { label: "Newsletter Subs", value: subscriberCount, icon: Mail, gradient: "from-pink-500 to-rose-600" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">Dashboard Overview</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1 flex items-center gap-2">
          <Activity className="h-4 w-4 text-emerald-500" /> System running smoothly
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div 
            key={stat.label} 
            className="relative overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between z-10 relative">
              <div>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                  {stat.label}
                </p>
                <p className="text-4xl font-bold text-zinc-900 dark:text-white">
                  {stat.value.toLocaleString()}
                </p>
              </div>
              <div className={`p-4 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
            {/* Subtle background glow effect */}
            <div className={`absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br ${stat.gradient} opacity-10 blur-2xl rounded-full group-hover:opacity-20 transition-opacity`}></div>
          </div>
        ))}
      </div>
    </div>
  );
}