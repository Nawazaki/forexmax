import prisma from "../../../lib/prisma";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { deleteStrategy } from "../../actions/strategies";

export default async function AdminStrategiesPage() {
  const strategies = await prisma.strategy.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Manage Strategies</h1>
        <Link href="/admin/strategies/new" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
          <Plus className="h-4 w-4" /> New Strategy
        </Link>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
            <tr>
              <th className="px-6 py-3 font-medium text-zinc-900 dark:text-zinc-100">Title</th>
              <th className="px-6 py-3 font-medium text-zinc-900 dark:text-zinc-100">Difficulty</th>
              <th className="px-6 py-3 font-medium text-zinc-900 dark:text-zinc-100 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {strategies.map((strategy) => (
              <tr key={strategy.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">{strategy.title}</td>
                <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">{strategy.difficulty}</td>
                <td className="px-6 py-4 flex justify-end gap-3">
                  <Link href={`/admin/strategies/${strategy.id}`} className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
                    <Edit className="h-5 w-5" />
                  </Link>
                  <form action={deleteStrategy}>
                    <input type="hidden" name="id" value={strategy.id} />
                    <button type="submit" className="text-red-600 hover:text-red-800 dark:hover:text-red-400">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {strategies.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-zinc-500 dark:text-zinc-400">No strategies found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}