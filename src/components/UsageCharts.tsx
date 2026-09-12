"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export function RadialUsageChart({ value, total, color }: { value: number, total: number, color: string }) {
  const data = [
    { name: "Used", value: value },
    { name: "Remaining", value: total - value }
  ];

  return (
    <div className="relative h-40 w-40 mx-auto">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            stroke="none"
          >
            <Cell key="cell-0" fill={color} />
            <Cell key="cell-1" fill="#262626" />
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#141414', borderColor: '#262626', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
            itemStyle={{ color: '#fff' }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-xl font-bold text-white">{Math.round((value / total) * 100)}%</span>
      </div>
    </div>
  );
}
