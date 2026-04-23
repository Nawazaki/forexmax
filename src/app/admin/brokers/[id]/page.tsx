import { getBrokerById, updateBroker } from "@/app/actions/brokers";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditBrokerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const broker = await getBrokerById(id);
  if (!broker) notFound();

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Link href="/admin/brokers" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-6 transition-colors">
        <ArrowLeft size={18} /> Back to Brokers
      </Link>
      
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Edit Broker: {broker.name}</h1>
      
      <form action={updateBroker} encType="multipart/form-data" className="space-y-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <input type="hidden" name="id" value={broker.id} />
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Broker Name</label>
            <input name="name" defaultValue={broker.name} required type="text" className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Website URL</label>
            <input name="websiteUrl" defaultValue={broker.websiteUrl} required type="url" className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Affiliate Link</label>
            <input name="affiliateLink" defaultValue={broker.affiliateLink} required type="url" className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Update Logo (Leave empty to keep current)</label>
            <input name="logo" type="file" accept="image/*" className="w-full p-1 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
            {broker.logoUrl && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs text-slate-400">Current:</span>
                <img src={broker.logoUrl} alt="Current logo" className="w-8 h-8 rounded-md object-cover" />
              </div>
            )}
          </div>
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors mt-4">
          Update Broker
        </button>
      </form>
    </div>
  );
}
