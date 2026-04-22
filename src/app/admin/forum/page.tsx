import prisma from "../../../lib/prisma";
import { MessageSquare, Trash2, User as UserIcon, AlertCircle } from "lucide-react";
import { deleteTopic } from "../../actions/forum";

export default async function AdminForumPage() {
  const topics = await prisma.forumTopic.findMany({ 
    include: { author: true },
    orderBy: { createdAt: "desc" } 
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-blue-600" /> Forum Moderation
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Monitor community discussions and remove inappropriate content.
          </p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg font-semibold text-sm border border-blue-100 dark:border-blue-800">
          Total Topics: {topics.length}
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
            <tr>
              <th className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-100 w-1/2">Topic Title</th>
              <th className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-100">Author</th>
              <th className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-100">Date Posted</th>
              <th className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-100 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {topics.map((topic) => (
              <tr key={topic.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-zinc-900 dark:text-white mb-1 line-clamp-1">
                    {topic.title}
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                    {topic.content}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-600 dark:text-zinc-300">
                      {topic.author?.email?.charAt(0).toUpperCase() || <UserIcon className="h-3 w-3" />}
                    </div>
                    <span className="text-zinc-700 dark:text-zinc-300">
                      {topic.author?.email?.split('@')[0] || "Unknown"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-zinc-500 dark:text-zinc-400">
                  {new Date(topic.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end">
                    <form action={deleteTopic}>
                      <input type="hidden" name="id" value={topic.id} />
                      <button 
                        type="submit" 
                        className="p-2 text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors flex items-center gap-2" 
                        title="Delete Topic"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="hidden md:inline text-xs font-medium">Delete</span>
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {topics.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-zinc-500 dark:text-zinc-400">
                  <AlertCircle className="h-10 w-10 mx-auto mb-3 text-zinc-300 dark:text-zinc-700" />
                  No forum topics have been created yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
