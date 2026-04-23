import { createBroker } from "@/app/actions/brokers";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewBrokerPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Link href="/admin/brokers" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-6 transition-colors">
        <ArrowLeft size={18} /> Back to Brokers
      </Link>
      
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Add New Broker</h1>
      
      <form action={createBroker} encType="multipart/form-data" className="space-y-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Broker Name</label>
            <input name="name" required type="text" className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Website URL</label>
            <input name="websiteUrl" required type="url" className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Affiliate Link</label>
            <input name="affiliateLink" required type="url" className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Logo Image</label>
            <input name="logo" type="file" accept="image/*" required className="w-full p-1 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
          </div>
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors mt-4">
          Save Broker
        </button>
      </form>
    </div>
  );
}
