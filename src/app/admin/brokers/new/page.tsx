import { createBroker } from "../../../actions/brokers";

export default function NewBrokerPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Create Broker</h1>
      
      <form action={createBroker} className="space-y-6 bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
        
        {/* Broker Name & Rating */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Broker Name</label>
            <input type="text" name="name" required className="w-full p-2 border rounded-md dark:bg-zinc-950 dark:border-zinc-800 dark:text-white" placeholder="e.g. IC Markets" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Rating</label>
            <input type="text" name="rating" required placeholder="e.g. 4.9/5" className="w-full p-2 border rounded-md dark:bg-zinc-950 dark:border-zinc-800 dark:text-white" />
          </div>
        </div>

        {/* Trading Specs (Regulation, Spread, Deposit) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Regulation Type</label>
            <input type="text" name="regulationType" required placeholder="e.g. FCA, ASIC" className="w-full p-2 border rounded-md dark:bg-zinc-950 dark:border-zinc-800 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Expected Spread</label>
            <input type="text" name="expectedSpread" required placeholder="e.g. 0.0 pips" className="w-full p-2 border rounded-md dark:bg-zinc-950 dark:border-zinc-800 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Min Deposit</label>
            <input type="text" name="minDeposit" required placeholder="e.g. $100" className="w-full p-2 border rounded-md dark:bg-zinc-950 dark:border-zinc-800 dark:text-white" />
          </div>
        </div>

        {/* Links (Official & IB) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Official Website URL</label>
            <input type="url" name="websiteUrl" required placeholder="https://broker.com" className="w-full p-2 border rounded-md dark:bg-zinc-950 dark:border-zinc-800 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">IB / Affiliate Link</label>
            <input type="url" name="ibLink" required placeholder="https://broker.com/ref=..." className="w-full p-2 border rounded-md dark:bg-zinc-950 dark:border-zinc-800 dark:text-white" />
          </div>
        </div>

        {/* Description (SEO Review) */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Detailed Review / Description</label>
          <textarea name="description" required rows={6} placeholder="Write a comprehensive review for SEO..." className="w-full p-2 border rounded-md dark:bg-zinc-950 dark:border-zinc-800 dark:text-white"></textarea>
        </div>

        {/* Logo Image */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Broker Logo</label>
          <input type="file" name="logo" accept="image/*" className="w-full p-2 border rounded-md dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-400" />
        </div>

        <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 rounded-md hover:bg-emerald-500 transition shadow-lg shadow-emerald-900/20">
          Save Complete Broker Profile
        </button>
      </form>
    </div>
  );
}