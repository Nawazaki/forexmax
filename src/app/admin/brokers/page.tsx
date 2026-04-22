import prisma from "../../../lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, Trash2, Building2, ExternalLink } from "lucide-react";
import { deleteBroker } from "../../actions/brokers";

export default async function AdminBrokersPage() {
  const brokers = await prisma.broker.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Manage Brokers</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Add, edit, or remove trusted brokers.</p>
        </div>
        <Link href="/admin/brokers/new" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm">
          <Plus className="h-4 w-4" /> Add Broker
        </Link>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
            <tr>
              <th className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-100">Broker</th>
              <th className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-100">Links</th>
              <th className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-100 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {brokers.map((broker) => (
              <tr key={broker.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 relative bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center overflow-hidden border border-zinc-200 dark:border-zinc-700">
                      {broker.logoUrl ? (
                        <Image src={broker.logoUrl} alt={broker.name} fill className="object-contain p-1" />
                      ) : (
                        <Building2 className="h-5 w-5 text-zinc-400" />
                      )}
                    </div>
                    <span className="font-medium text-zinc-900 dark:text-white">{broker.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 space-y-1">
                  <a href={broker.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-xs text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400">
                    <ExternalLink className="h-3 w-3 mr-1" /> Website
                  </a>
                  <a href={broker.affiliateLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-xs text-emerald-600 hover:text-emerald-700 dark:text-emerald-400">
                    <ExternalLink className="h-3 w-3 mr-1" /> Affiliate Link
                  </a>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-3">
                    <Link href={`/admin/brokers/${broker.id}`} className="p-2 text-blue-600 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                      <Edit className="h-4 w-4" />
                    </Link>
                    <form action={deleteBroker}>
                      <input type="hidden" name="id" value={broker.id} />
                      <button type="submit" className="p-2 text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {brokers.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-zinc-500 dark:text-zinc-400">
                  <Building2 className="h-10 w-10 mx-auto mb-3 text-zinc-300 dark:text-zinc-700" />
                  No brokers added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
