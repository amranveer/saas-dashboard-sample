import { Activity, CreditCard, DollarSign, Users, ArrowUpRight, ArrowDownRight, MoreHorizontal } from "lucide-react";
import { MainChart } from "@/components/DashboardCharts";

const stats = [
  { name: "Total Revenue", value: "$45,231.89", change: "+20.1%", trend: "up", icon: DollarSign },
  { name: "Active Subscriptions", value: "2,350", change: "+15.1%", trend: "up", icon: Users },
  { name: "API Calls", value: "12,234,300", change: "-4.5%", trend: "down", icon: Activity },
  { name: "Compute Cost", value: "$3,421.12", change: "+2.1%", trend: "up", icon: CreditCard },
];

const recentActivity = [
  { id: 1, user: "Alice Freeman", action: "Upgraded to Pro plan", time: "2 hours ago", amount: "+$49.00" },
  { id: 2, user: "Stripe", action: "Monthly payout processed", time: "5 hours ago", amount: "+$12,450.00" },
  { id: 3, user: "AWS AWS", action: "Invoice paid", time: "1 day ago", amount: "-$3,421.12" },
  { id: 4, user: "Bob Smith", action: "Canceled subscription", time: "1 day ago", amount: "-$15.00" },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Overview</h1>
          <p className="text-[#A3A3A3] text-sm">Monitor your platform's performance and revenue.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-[#141414] border border-[#262626] text-white text-sm font-medium rounded-md hover:bg-[#171717] transition-colors">
            Download Report
          </button>
          <button className="px-4 py-2 bg-white text-black text-sm font-medium rounded-md hover:bg-gray-200 transition-colors">
            Create Campaign
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-[#141414] border border-[#262626] p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-[#A3A3A3]">{stat.name}</h3>
              <stat.icon className="w-4 h-4 text-[#A3A3A3]" />
            </div>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <span className={`flex items-center text-xs font-medium ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#141414] border border-[#262626] p-6 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-white">Platform Usage</h2>
            <button className="text-[#A3A3A3] hover:text-white"><MoreHorizontal className="w-5 h-5" /></button>
          </div>
          <p className="text-[#A3A3A3] text-sm mb-6">API and Compute metrics across all projects.</p>
          <MainChart />
        </div>

        <div className="bg-[#141414] border border-[#262626] p-6 rounded-xl flex flex-col">
          <h2 className="text-lg font-semibold text-white mb-2">Recent Activity</h2>
          <p className="text-[#A3A3A3] text-sm mb-6">Latest transactions and platform events.</p>
          
          <div className="space-y-6 flex-1">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full bg-[#262626] flex items-center justify-center flex-shrink-0 text-white font-medium text-xs border border-[#404040]">
                    {activity.user.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{activity.user}</p>
                    <p className="text-xs text-[#A3A3A3]">{activity.action}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${activity.amount.startsWith('+') ? 'text-green-400' : 'text-white'}`}>{activity.amount}</p>
                  <p className="text-xs text-[#A3A3A3]">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
