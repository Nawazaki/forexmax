import prisma from "../../../lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, BarChart } from "lucide-react";

export default async function StrategyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const strategy = await prisma.strategy.findUnique({
    where: { id },
    include: { author: true },
  });

  if (!strategy) notFound();

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <Link href="/strategies" className="inline-flex items-center text-sm text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Strategies
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-semibold rounded-full flex items-center gap-1">
            <BarChart className="h-4 w-4" />
            {strategy.difficulty}
          </span>
          <span className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {new Date(strategy.createdAt).toLocaleDateString()}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
          {strategy.title}
        </h1>
        <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-8">
          <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-bold text-zinc-500">
            {strategy.author?.email.charAt(0).toUpperCase()}
          </div>
          <div className="text-sm">
            <p className="font-medium text-zinc-900 dark:text-white">
              {strategy.author?.email.split('@')[0]}
            </p>
            <p className="text-zinc-500 dark:text-zinc-400">Market Expert</p>
          </div>
        </div>
      </div>

      {strategy.imageUrl && (
        <div className="relative w-full h-[400px] mb-12 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900">
          <Image src={strategy.imageUrl} alt={strategy.title} fill className="object-cover" />
        </div>
      )}

      <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed">
        {strategy.content}
      </div>
    </article>
  );
}
