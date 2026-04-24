import { getSettings, updateSettings } from "@/app/actions/settings";
import { Save, ShieldAlert, Send } from "lucide-react";

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-zinc-900 dark:text-white">Global Settings</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Manage legal disclaimers and community contact links.</p>
      </div>

      <form action={updateSettings} className="space-y-8 bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-bold">
            <ShieldAlert className="h-5 w-5 text-emerald-500" />
            <h2>Risk Disclaimer</h2>
          </div>
          <textarea 
            name="riskDisclaimer" 
            defaultValue={settings.riskDisclaimer} 
            rows={8} 
            required 
            className="w-full p-4 border rounded-xl bg-zinc-50 dark:bg-zinc-950 dark:border-zinc-800 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            placeholder="Enter the full legal risk disclaimer here..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-bold">
              <Send className="h-5 w-5 text-blue-500" />
              <h2>Telegram Channel</h2>
            </div>
            <input 
              type="url" 
              name="telegramChannel" 
              defaultValue={settings.telegramChannel} 
              required 
              className="w-full p-3 border rounded-xl bg-zinc-50 dark:bg-zinc-950 dark:border-zinc-800 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 transition-all" 
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-bold">
              <Send className="h-5 w-5 text-blue-500" />
              <h2>Support Username</h2>
            </div>
            <input 
              type="text" 
              name="telegramSupport" 
              defaultValue={settings.telegramSupport} 
              required 
              className="w-full p-3 border rounded-xl bg-zinc-50 dark:bg-zinc-950 dark:border-zinc-800 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 transition-all" 
            />
          </div>
        </div>

        <button type="submit" className="flex items-center justify-center gap-2 w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/20">
          <Save className="h-5 w-5" /> Save All Settings
        </button>
      </form>
    </div>
  );
}
