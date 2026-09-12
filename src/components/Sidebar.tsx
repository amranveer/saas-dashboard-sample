"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Activity, Settings, HelpCircle, Triangle } from "lucide-react";

const navigation = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "Analytics", href: "/analytics", icon: Activity },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen flex-col justify-between border-r border-[#262626] bg-[#0A0A0A] w-64 p-6 hidden md:flex sticky top-0">
      <div>
        <div className="flex items-center gap-3 mb-10 text-[#FAFAFA]">
          <div className="bg-white text-black p-1.5 rounded-md">
            <Triangle className="w-5 h-5 fill-current" />
          </div>
          <span className="text-xl font-bold tracking-tight">Nexus.</span>
        </div>

        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive 
                    ? "bg-[#171717] text-white font-medium" 
                    : "text-[#A3A3A3] hover:text-white hover:bg-[#141414]"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-[#262626] pt-6">
        <button className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-md text-sm text-[#A3A3A3] hover:text-white hover:bg-[#141414] transition-colors">
          <HelpCircle className="w-4 h-4" />
          Help & Support
        </button>
      </div>
    </div>
  );
}
