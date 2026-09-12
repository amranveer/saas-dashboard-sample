"use client";

import { useState } from "react";
import { Key, Copy, CheckCircle2, ShieldAlert, CreditCard, Users } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

const tabs = ["Account", "Team", "Billing", "API Keys"];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("API Keys");
  const [copied, setCopied] = useState(false);
  const setToast = useAppStore((state) => state.setToast);

  const handleCopy = () => {
    navigator.clipboard.writeText("api_key_mock_live_9382749382749328");
    setCopied(true);
    setToast("API Key copied to clipboard", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveProfile = () => {
    setToast("Profile information saved successfully", "success");
  };

  const handleInvite = () => {
    setToast("Invite link copied to clipboard", "info");
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

          {activeTab === "Account" && (
            <div className="space-y-6">
              <div className="bg-[#141414] border border-[#262626] rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white mb-6">Profile Information</h2>
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 border-2 border-[#262626] overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" alt="User" className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-2">
                    <button className="px-4 py-2 bg-[#262626] text-white text-sm font-medium rounded-md hover:bg-[#404040] transition-colors">Change Avatar</button>
                    <p className="text-xs text-gray-500">JPG, GIF or PNG. 1MB max.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-400">Full Name</label>
                    <input type="text" defaultValue="Alice Freeman" className="w-full bg-[#0A0A0A] border border-[#262626] rounded-md py-2 px-3 text-sm text-white focus:outline-none focus:border-gray-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-400">Email Address</label>
                    <input type="email" defaultValue="alice@example.com" className="w-full bg-[#0A0A0A] border border-[#262626] rounded-md py-2 px-3 text-sm text-white focus:outline-none focus:border-gray-500" />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button onClick={handleSaveProfile} className="px-4 py-2 bg-white text-black text-sm font-medium rounded-md hover:bg-gray-200 transition-colors">Save Changes</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Team" && (
            <div className="space-y-6">
              <div className="bg-[#141414] border border-[#262626] rounded-xl overflow-hidden">
                <div className="p-6 border-b border-[#262626] flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-white">Team Members</h2>
                    <p className="text-[#A3A3A3] text-sm">Manage who has access to this workspace.</p>
                  </div>
                  <button onClick={handleInvite} className="px-4 py-2 bg-white text-black text-sm font-medium rounded-md hover:bg-gray-200 transition-colors">Invite Member</button>
                </div>
                <table className="w-full text-left text-sm text-gray-400">
                  <thead className="bg-[#0A0A0A] border-b border-[#262626] text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">User</th>
                      <th className="px-6 py-4">Role</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#262626]">
                    <tr className="hover:bg-[#171717]">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">AF</div>
                        <div>
                          <p className="text-white font-medium">Alice Freeman</p>
                          <p className="text-xs">alice@example.com</p>
                        </div>
                      </td>
                      <td className="px-6 py-4"><span className="px-2 py-1 bg-[#262626] text-white rounded text-xs">Owner</span></td>
                      <td className="px-6 py-4 text-right"><button className="text-gray-500 hover:text-white">Edit</button></td>
                    </tr>
                    <tr className="hover:bg-[#171717]">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">BS</div>
                        <div>
                          <p className="text-white font-medium">Bob Smith</p>
                          <p className="text-xs">bob@example.com</p>
                        </div>
                      </td>
                      <td className="px-6 py-4"><span className="px-2 py-1 bg-[#262626] rounded text-xs">Developer</span></td>
                      <td className="px-6 py-4 text-right"><button className="text-red-500 hover:text-red-400">Remove</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "Billing" && (
            <div className="space-y-6">
              <div className="bg-[#141414] border border-[#262626] rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white mb-2">Current Plan</h2>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#0A0A0A] border border-[#262626] rounded-lg mt-4">
                  <div>
                    <p className="text-white font-bold text-xl">Pro Tier <span className="text-xs font-normal text-gray-500 bg-[#262626] px-2 py-1 rounded ml-2">$49/mo</span></p>
                    <p className="text-sm text-gray-400 mt-1">Up to 1,000,000 API requests / month</p>
                  </div>
                  <div className="mt-4 sm:mt-0 flex gap-3">
                    <button className="px-4 py-2 border border-[#262626] text-white text-sm font-medium rounded-md hover:bg-[#171717]">Cancel Plan</button>
                    <button className="px-4 py-2 bg-white text-black text-sm font-medium rounded-md hover:bg-gray-200">Upgrade</button>
                  </div>
                </div>
              </div>

              <div className="bg-[#141414] border border-[#262626] rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Payment Method</h2>
                <div className="flex items-center justify-between p-4 bg-[#0A0A0A] border border-[#262626] rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#262626] p-2 rounded">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Visa ending in 4242</p>
                      <p className="text-xs text-gray-400">Expires 12/2028</p>
                    </div>
                  </div>
                  <button className="text-sm text-blue-400 hover:text-blue-300">Update</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
