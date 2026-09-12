"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Activity, Settings, HelpCircle, Triangle, BarChart2, X, MessageSquare, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const navigation = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "Analytics", href: "/analytics", icon: Activity },
  { name: "Usage & Limits", href: "/usage", icon: BarChart2 },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <>
      <div className="flex h-screen flex-col justify-between border-r border-[#262626] bg-[#0A0A0A] w-64 p-6 hidden md:flex sticky top-0 z-20">
        <div>
          <div className="flex items-center gap-3 mb-10 text-[#FAFAFA]">
            <div className="bg-white text-black p-1.5 rounded-md">
              <Triangle className="w-5 h-5 fill-current" />
            </div>
            <span className="text-xl font-bold tracking-tight">Nexus.</span>
          </div>

          <nav className="space-y-1 relative">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative flex items-center gap-3 px-3 py-2 text-sm transition-colors z-10 rounded-md ${
                    isActive 
                      ? "text-white font-medium" 
                      : "text-[#A3A3A3] hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 bg-[#171717] rounded-md -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-[#262626] pt-6">
          <button onClick={() => setIsHelpOpen(true)} className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-md text-sm text-[#A3A3A3] hover:text-white hover:bg-[#141414] transition-colors">
            <HelpCircle className="w-4 h-4" />
            Help & Support
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isHelpOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsHelpOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-[#141414] border border-[#262626] rounded-xl shadow-2xl z-50 p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Help & Support</h2>
                <button onClick={() => setIsHelpOpen(false)} className="text-gray-500 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-[#262626] bg-[#0A0A0A] hover:bg-[#171717] transition-colors text-left text-white text-sm">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="font-medium">Documentation</p>
                    <p className="text-xs text-gray-500">Read our API guides</p>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-[#262626] bg-[#0A0A0A] hover:bg-[#171717] transition-colors text-left text-white text-sm">
                  <MessageSquare className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="font-medium">Contact Support</p>
                    <p className="text-xs text-gray-500">Chat with our team</p>
                  </div>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
