import { getBrokers } from "@/app/actions/brokers";
import { ExternalLink } from "lucide-react";

export default async function PublicBrokersPage() {
  const brokers = await getBrokers();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Top Recommended Forex Brokers</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Discover the best trading platforms based on reliability, spreads, and user experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brokers.map((broker) => (
          <div key={broker.id} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-shadow flex flex-col h-full">
            <div className="flex items-center gap-4 mb-6">
              <img 
                src={broker.logoUrl || "/placeholder-broker.png"} 
                alt={broker.name} 
                className="w-16 h-16 rounded-xl object-cover border border-slate-100" 
              />
              <h3 className="text-xl font-bold text-slate-900">{broker.name}</h3>
            </div>
            
            <div className="flex-grow mb-6">
              <p className="text-slate-500 text-sm mb-2">Official Website:</p>
              <p className="text-slate-700 text-sm truncate">{broker.websiteUrl}</p>
            </div>
            
            <a 
              href={broker.affiliateLink} 
              target="_blank" 
              className="flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-xl font-medium hover:bg-slate-800 transition-colors"
            >
              Open Account <ExternalLink size={16} />
            </a>
          </div>
        ))}
      </div>

      {brokers.length === 0 && (
        <div className="text-center py-20 text-slate-500">
          No brokers listed yet. Please check back later.
        </div>
      )}
    </div>
  );
}
