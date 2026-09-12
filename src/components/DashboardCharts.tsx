"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Area, AreaChart, CartesianGrid } from "recharts";

const data = [
  { name: "Mon", api: 4000, compute: 2400 },
  { name: "Tue", api: 3000, compute: 1398 },
  { name: "Wed", api: 2000, compute: 9800 },
  { name: "Thu", api: 2780, compute: 3908 },
  { name: "Fri", api: 1890, compute: 4800 },
  { name: "Sat", api: 2390, compute: 3800 },
  { name: "Sun", api: 3490, compute: 4300 },
];

export function MainChart() {
  return (
    <div className="h-[300px] w-full mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorApi" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorCompute" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#262626" />
          <XAxis dataKey="name" stroke="#525252" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#525252" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#141414', borderColor: '#262626', borderRadius: '8px', color: '#fff' }}
            itemStyle={{ color: '#fff' }}
          />
          <Area type="monotone" dataKey="api" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorApi)" />
          <Area type="monotone" dataKey="compute" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorCompute)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
