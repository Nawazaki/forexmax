import { getSettings } from "@/app/actions/settings";
import { ShieldAlert } from "lucide-react";

export default async function DisclaimerPage() {
  const settings = await getSettings();

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-3xl w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 md:p-12 shadow-xl">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-amber-100 dark:bg-amber-500/10 rounded-full">
            <ShieldAlert className="h-12 w-12 text-amber-600 dark:text-amber-500" />
          </div>
        </div>
        
        <h1 className="text-3xl font-black text-center text-zinc-900 dark:text-white mb-8 tracking-tight">
          Risk Disclosure
        </h1>
        
        <div className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-center md:text-left space-y-6 text-lg">
          {settings.riskDisclaimer.split('\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-100 dark:border-zinc-800 text-center">
          <p className="text-sm text-zinc-500 dark:text-zinc-500 italic">
            By using ForexMax, you acknowledge that you have read and understood the risks associated with financial trading.
          </p>
        </div>
      </div>
    </div>
  );
}
