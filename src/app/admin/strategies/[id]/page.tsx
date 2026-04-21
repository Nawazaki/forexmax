import prisma from "../../../../lib/prisma";
import { updateStrategy } from "../../../../actions/strategies";
import { notFound } from "next/navigation";

export default async function EditStrategyPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const strategy = await prisma.strategy.findUnique({
    where: { id },
  });

  if (!strategy) notFound();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Edit Strategy</h1>
      
      <form action={updateStrategy} className="space-y-6 bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
        <input type="hidden" name="id" value={strategy.id} />
        
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Title</label>
          <input type="text" name="title" defaultValue={strategy.title} required className="w-full p-2 border rounded-md dark:bg-zinc-950 dark:border-zinc-800 dark:text-white" />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Difficulty</label>
          <select name="difficulty" defaultValue={strategy.difficulty} required className="w-full p-2 border rounded-md dark:bg-zinc-950 dark:border-zinc-800 dark:text-white">
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Cover Image (Leave empty to keep current)</label>
          <input type="file" name="image" accept="image/*" className="w-full p-2 border rounded-md dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-400" />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Content</label>
          <textarea name="content" defaultValue={strategy.content} required rows={10} className="w-full p-2 border rounded-md dark:bg-zinc-950 dark:border-zinc-800 dark:text-white"></textarea>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
          Update Strategy
        </button>
      </form>
    </div>
  );
}