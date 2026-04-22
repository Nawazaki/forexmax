import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, Users, BookOpen, FileText, 
  MessageSquare, Briefcase, LogOut, TrendingUp
} from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  const navItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Brokers", href: "/admin/brokers", icon: Briefcase },
    { name: "Strategies", href: "/admin/strategies", icon: TrendingUp },
    { name: "Articles", href: "/admin/articles", icon: FileText },
    { name: "Forum Moderation", href: "/admin/forum", icon: MessageSquare },
    { name: "Users", href: "/admin/users", icon: Users },
  ];

  return (
    <div className="min-h-screen flex bg-zinc-50 dark:bg-zinc-950">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col hidden md:flex fixed h-full z-10">
        <div className="h-16 flex items-center px-6 border-b border-zinc-200 dark:border-zinc-800">
          <BookOpen className="h-6 w-6 text-blue-600 mr-2" />
          <span className="text-lg font-bold text-zinc-900 dark:text-white">Admin Portal</span>
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all group"
            >
              <item.icon className="h-5 w-5 mr-3 text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center px-3 py-2">
            <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 dark:text-blue-400 font-bold mr-3">
              A
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-zinc-900 dark:text-white">Admin</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 truncate w-32">{session.user.email}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 flex flex-col">
        {/* Top Header */}
        <header className="h-16 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-6 sticky top-0 z-10">
          <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            ForexMax Command Center
          </h2>
          <Link href="/" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2">
            <LogOut className="h-4 w-4" /> Return to Site
          </Link>
        </header>

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}