import { getBrokers, deleteBroker } from "@/app/actions/brokers";
import Link from "next/link";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";

export default async function AdminBrokersPage() {
  const brokers = await getBrokers();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Brokers Management</h1>
        <Link 
          href="/admin/brokers/new" 
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus size={18} /> Add Broker
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 font-semibold text-slate-600">Logo</th>
              <th className="p-4 font-semibold text-slate-600">Name</th>
              <th className="p-4 font-semibold text-slate-600">Website</th>
              <th className="p-4 font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {brokers.map((broker) => (
              <tr key={broker.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4">
                  <img 
                    src={broker.logoUrl || "/placeholder-broker.png"} 
                    alt={broker.name} 
                    className="w-10 h-10 rounded-md object-cover border border-slate-200" 
                  />
                </td>
                <td className="p-4 font-medium text-slate-800">{broker.name}</td>
                <td className="p-4 text-slate-600 truncate max-w-xs">{broker.websiteUrl}</td>
                <td className="p-4 flex items-center gap-3">
                  <Link href={`/admin/brokers/${broker.id}`} className="text-slate-500 hover:text-indigo-600">
                    <Pencil size={18} />
                  </Link>
                  <form action={async () => { "use server"; await deleteBroker(broker.id); }}>
                    <button type="submit" className="text-slate-500 hover:text-red-600">
                      <Trash2 size={18} />
                    </button>
                  </form>
                  <a href={broker.websiteUrl} target="_blank" className="text-slate-500 hover:text-slate-800">
                    <ExternalLink size={18} />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
