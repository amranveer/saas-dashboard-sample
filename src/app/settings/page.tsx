"use client";

import { useState } from "react";
import { Key, Copy, CheckCircle2, ShieldAlert, CreditCard, Users, Bell } from "lucide-react";

const tabs = ["Account", "Team", "Billing", "API Keys"];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("API Keys");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("api_key_mock_live_9382749382749328");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-white">Settings</h1>
        <p className="text-[#A3A3A3] text-sm">Manage your account preferences and configurations.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-48 flex-shrink-0">
          <nav className="flex md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-2 text-sm font-medium rounded-md text-left transition-colors whitespace-nowrap ${
                  activeTab === tab 
                    ? "bg-[#141414] text-white border border-[#262626]" 
                    : "text-[#A3A3A3] hover:text-white hover:bg-[#141414]"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </aside>

        <div className="flex-1 space-y-6">
          {activeTab === "API Keys" && (
            <div className="space-y-6">
              <div className="bg-[#141414] border border-[#262626] rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white mb-2">Production Keys</h2>
                <p className="text-[#A3A3A3] text-sm mb-6">These keys will allow you to authenticate API requests.</p>
                
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                    <div className="flex-1 space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Secret Key</label>
                      <div className="flex items-center gap-2 px-3 py-2 bg-[#0A0A0A] border border-[#262626] rounded-md text-sm font-mono text-white">
                        <Key className="w-4 h-4 text-gray-500" />
                        <input 
                          type="password" 
                          value="api_key_mock_live_9382749382749328" 
                          readOnly 
                          className="bg-transparent border-none outline-none w-full"
                        />
                      </div>
                    </div>
                    <button 
                      onClick={handleCopy}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-black text-sm font-medium rounded-md hover:bg-gray-200 transition-colors w-full sm:w-auto h-9"
                    >
                      {copied ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                      {copied ? "Copied" : "Copy Key"}
                    </button>
                  </div>
                  <p className="text-xs text-yellow-500 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    Do not share this key with anyone or commit it to version control.
                  </p>
                </div>
              </div>

              <div className="bg-[#141414] border border-red-900/30 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-red-500 mb-2">Danger Zone</h2>
                <p className="text-[#A3A3A3] text-sm mb-6">Permanently delete your project and all of its data.</p>
                <button className="px-4 py-2 bg-red-500/10 border border-red-500/50 text-red-500 text-sm font-medium rounded-md hover:bg-red-500 hover:text-white transition-colors">
                  Delete Project
                </button>
              </div>
            </div>
          )}

          {activeTab !== "API Keys" && (
            <div className="bg-[#141414] border border-[#262626] rounded-xl p-12 text-center">
              <div className="w-12 h-12 rounded-full bg-[#262626] flex items-center justify-center mx-auto mb-4">
                {activeTab === "Account" && <ShieldAlert className="w-5 h-5 text-gray-400" />}
                {activeTab === "Team" && <Users className="w-5 h-5 text-gray-400" />}
                {activeTab === "Billing" && <CreditCard className="w-5 h-5 text-gray-400" />}
              </div>
              <h2 className="text-lg font-semibold text-white mb-2">{activeTab} Settings</h2>
              <p className="text-[#A3A3A3] text-sm">This section is currently under development.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
