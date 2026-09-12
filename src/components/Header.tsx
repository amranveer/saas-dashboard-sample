"use client";

import { Bell, Search, Menu, LogOut, Settings, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Header() {
  const [isFocused, setIsFocused] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const setCommandOpen = useAppStore((state) => state.setCommandOpen);

  return (
    <header className="h-16 border-b border-[#262626] bg-[#0A0A0A] flex items-center justify-between px-6 sticky top-0 z-30">
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

      <div className="flex items-center gap-6 relative">
        <button 
          onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
          onBlur={() => setTimeout(() => setIsNotificationsOpen(false), 200)}
          className="relative text-[#A3A3A3] hover:text-white transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute 1 top-0 right-0 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#0A0A0A]"></span>
        </button>

        <AnimatePresence>
          {isNotificationsOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-12 right-12 w-80 bg-[#141414] border border-[#262626] rounded-xl shadow-2xl overflow-hidden z-50"
            >
              <div className="p-4 border-b border-[#262626]">
                <h3 className="text-sm font-semibold text-white">Notifications</h3>
              </div>
              <div className="p-4 text-sm text-gray-400 text-center">
                No new notifications.
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative">
          <button 
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            onBlur={() => setTimeout(() => setIsUserMenuOpen(false), 200)}
            className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 cursor-pointer overflow-hidden border border-[#262626]"
          >
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" alt="User" className="w-full h-full object-cover" />
          </button>
          
          <AnimatePresence>
            {isUserMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-12 right-0 w-48 bg-[#141414] border border-[#262626] rounded-xl shadow-2xl py-2 z-50"
              >
                <div className="px-4 py-2 border-b border-[#262626] mb-2">
                  <p className="text-sm font-medium text-white">Alice Freeman</p>
                  <p className="text-xs text-gray-500">alice@example.com</p>
                </div>
                <Link href="/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-[#262626] transition-colors w-full text-left">
                  <User className="w-4 h-4" /> Profile
                </Link>
                <Link href="/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-[#262626] transition-colors w-full text-left">
                  <Settings className="w-4 h-4" /> Settings
                </Link>
                <button className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors w-full text-left mt-2 border-t border-[#262626] pt-2">
                  <LogOut className="w-4 h-4" /> Sign out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
