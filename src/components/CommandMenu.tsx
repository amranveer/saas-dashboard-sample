"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { Search, LayoutDashboard, Users, Activity, Settings, CreditCard, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

const actions = [
  { id: "home", name: "Go to Dashboard", icon: LayoutDashboard, route: "/" },
  { id: "analytics", name: "View Analytics", icon: Activity, route: "/analytics" },
  { id: "customers", name: "Manage Customers", icon: Users, route: "/customers" },
  { id: "settings", name: "Account Settings", icon: Settings, route: "/settings" },
  { id: "billing", name: "Billing & Invoices", icon: CreditCard, route: "/settings" },
  { id: "docs", name: "API Documentation", icon: FileText, route: "#" },
];

export default function CommandMenu() {
  const { isCommandOpen, setCommandOpen } = useAppStore();
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen(!isCommandOpen);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isCommandOpen, setCommandOpen]);

  if (!isCommandOpen) return null;

  const filteredActions = actions.filter((action) =>
    action.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          onClick={() => setCommandOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="relative w-full max-w-xl bg-[#141414] border border-[#262626] rounded-xl shadow-2xl overflow-hidden flex flex-col"
        >
          <div className="flex items-center px-4 py-3 border-b border-[#262626]">
            <Search className="w-5 h-5 text-gray-500 mr-3" />
            <input
              autoFocus
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500 text-sm"
              placeholder="Type a command or search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <kbd className="hidden sm:inline-flex px-2 py-1 text-[10px] font-medium text-gray-400 bg-[#262626] border border-[#404040] rounded">ESC</kbd>
          </div>
          
          <div className="max-h-[300px] overflow-y-auto p-2">
            {filteredActions.length === 0 ? (
              <p className="text-center text-sm text-gray-500 py-6">No results found.</p>
            ) : (
              <div className="space-y-1">
                <p className="px-2 py-1.5 text-xs font-semibold text-gray-500">Suggestions</p>
                {filteredActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => {
                      router.push(action.route);
                      setCommandOpen(false);
                    }}
                    className="w-full flex items-center px-3 py-2 text-sm text-[#A3A3A3] hover:text-white hover:bg-[#262626] rounded-md transition-colors"
                  >
                    <action.icon className="w-4 h-4 mr-3" />
                    {action.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="px-4 py-3 bg-[#0A0A0A] border-t border-[#262626] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Navigate with</span>
              <kbd className="px-1.5 py-0.5 text-[10px] text-gray-400 bg-[#141414] border border-[#262626] rounded">↑</kbd>
              <kbd className="px-1.5 py-0.5 text-[10px] text-gray-400 bg-[#141414] border border-[#262626] rounded">↓</kbd>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Select with</span>
              <kbd className="px-1.5 py-0.5 text-[10px] text-gray-400 bg-[#141414] border border-[#262626] rounded">Enter</kbd>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
