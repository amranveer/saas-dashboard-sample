import { RadialUsageChart } from "@/components/UsageCharts";
import { Zap, Database, Globe, ArrowRight } from "lucide-react";

export default function UsagePage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto relative">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-white">Usage & Limits</h1>
        <p className="text-[#A3A3A3] text-sm">Monitor your current billing cycle limits and resource utilization.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 text-center flex flex-col items-center">
          <div className="p-3 bg-blue-500/10 rounded-full mb-4 text-blue-500">
            <Zap className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-semibold text-white">API Calls</h2>
          <p className="text-sm text-gray-400 mb-6">Pro Tier Limit: 1,000,000</p>
          <RadialUsageChart value={850000} total={1000000} color="#3b82f6" />
          <p className="text-xs text-gray-500 mt-4">850k calls used this cycle</p>
        </div>

        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 text-center flex flex-col items-center">
          <div className="p-3 bg-purple-500/10 rounded-full mb-4 text-purple-500">
            <Database className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-semibold text-white">Storage</h2>
          <p className="text-sm text-gray-400 mb-6">Pro Tier Limit: 50 GB</p>
          <RadialUsageChart value={22} total={50} color="#a855f7" />
          <p className="text-xs text-gray-500 mt-4">22 GB used this cycle</p>
        </div>

        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 text-center flex flex-col items-center">
          <div className="p-3 bg-green-500/10 rounded-full mb-4 text-green-500">
            <Globe className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-semibold text-white">Bandwidth</h2>
          <p className="text-sm text-gray-400 mb-6">Pro Tier Limit: 100 GB</p>
          <RadialUsageChart value={95} total={100} color="#22c55e" />
          <p className="text-xs text-red-400 mt-4 font-medium">95 GB used! Nearing limit.</p>
        </div>
      </div>

      <div className="mt-8 bg-gradient-to-r from-indigo-900/40 via-purple-900/40 to-[#141414] border border-indigo-500/30 rounded-xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-indigo-500/20 blur-3xl rounded-full pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Need more power? Upgrade to Enterprise.</h2>
            <p className="text-indigo-200 text-sm max-w-xl">
              You are currently utilizing 85% of your API limits and 95% of your bandwidth. Upgrade to the Enterprise tier for unlimited API requests, dedicated support, and custom SLAs.
            </p>
          </div>
          <button className="flex-shrink-0 flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-indigo-50 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Contact Sales
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
