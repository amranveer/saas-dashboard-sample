"use client";

import { Bell, Search, Menu } from "lucide-react";
import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";

export default function Header() {
  const [isFocused, setIsFocused] = useState(false);
  const setCommandOpen = useAppStore((state) => state.setCommandOpen);

  return (
    <header className="h-16 border-b border-[#262626] bg-[#0A0A0A] flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <button className="md:hidden text-[#A3A3A3] hover:text-white">
          <Menu className="w-5 h-5" />
        </button>
        <div 
          onClick={() => setCommandOpen(true)}
          className={`hidden md:flex cursor-pointer items-center gap-2 px-3 py-1.5 rounded-md border transition-colors max-w-md w-full ${isFocused ? 'border-gray-500 bg-[#141414]' : 'border-[#262626] bg-[#0A0A0A]'}`}
        >
          <Search className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-500 flex-1">Search resources, docs...</span>
          <div className="flex gap-1">
            <kbd className="text-[10px] text-gray-500 border border-[#262626] rounded px-1.5 py-0.5 bg-[#141414]">⌘</kbd>
            <kbd className="text-[10px] text-gray-500 border border-[#262626] rounded px-1.5 py-0.5 bg-[#141414]">K</kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-[#A3A3A3] hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute 1 top-0 right-0 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#0A0A0A]"></span>
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 cursor-pointer overflow-hidden border border-[#262626]">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" alt="User" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
}
