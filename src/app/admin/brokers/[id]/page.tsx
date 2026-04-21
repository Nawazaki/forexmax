import prisma from "../../../../lib/prisma";
import { updateBroker } from "../../../../actions/brokers";
import { notFound } from "next/navigation";
import { Building2, Link as LinkIcon, Globe } from "lucide-react";

export default async function EditBrokerPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const broker = await prisma.broker.findUnique({ where: { id } });
  
  if (!broker) notFound();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Edit Broker</h1>
      <form action={updateBroker} className="space-y-6 bg-white dark:bg-zinc-900 p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <input type="hidden" name="id" value={broker.id} />
        <div>
          <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Broker Name</label>
          <div className="relative">
            <Building2 className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
            <input type="text" name="name" defaultValue={broker.name} required className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-zinc-950 dark:border-zinc-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Website URL</label>
          <div className="relative">
            <Globe className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
            <input type="url" name="websiteUrl" defaultValue={broker.websiteUrl} required className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-zinc-950 dark:border-zinc-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Affiliate Link</label>
          <div className="relative">
            <LinkIcon className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
            <input type="url" name="affiliateLink" defaultValue={broker.affiliateLink} required className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-zinc-950 dark:border-zinc-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Broker Logo (Leave empty to keep current)</label>
          <input type="file" name="logo" accept="image/*" className="w-full p-2 border rounded-lg dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-400" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition shadow-md">
          Update Broker
        </button>
      </form>
    </div>
  );
}
