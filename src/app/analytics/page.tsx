"use client";

import { Download, Filter, Search, X, Code2 } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tableData = [
  { id: "req_1a2b3c", endpoint: "/api/v1/models/generate", method: "POST", status: 200, latency: "145ms", cost: "$0.02", date: "Oct 24, 14:32:01", payload: '{\n  "model": "nexus-v2",\n  "prompt": "Generate...",\n  "max_tokens": 512\n}' },
  { id: "req_2x9y8z", endpoint: "/api/v1/auth/verify", method: "POST", status: 401, latency: "45ms", cost: "$0.00", date: "Oct 24, 14:31:55", payload: '{\n  "token": "invalid_token_xyz"\n}' },
  { id: "req_3p4q5r", endpoint: "/api/v1/users/profile", method: "GET", status: 200, latency: "82ms", cost: "$0.00", date: "Oct 24, 14:30:12", payload: 'null' },
  { id: "req_4m5n6o", endpoint: "/api/v1/models/train", method: "POST", status: 202, latency: "1,204ms", cost: "$1.45", date: "Oct 24, 14:28:44", payload: '{\n  "dataset_id": "ds_938102",\n  "epochs": 10,\n  "batch_size": 32\n}' },
  { id: "req_5t6u7v", endpoint: "/api/v1/billing/invoices", method: "GET", status: 200, latency: "112ms", cost: "$0.00", date: "Oct 24, 14:25:33", payload: 'null' },
  { id: "req_6w7x8y", endpoint: "/api/v1/models/generate", method: "POST", status: 500, latency: "4,021ms", cost: "$0.05", date: "Oct 24, 14:20:10", payload: '{\n  "model": "nexus-v1",\n  "prompt": "Internal Error test",\n  "max_tokens": 1024\n}' },
  { id: "req_7z8a9b", endpoint: "/api/v1/webhooks/stripe", method: "POST", status: 200, latency: "230ms", cost: "$0.00", date: "Oct 24, 14:15:00", payload: '{\n  "type": "invoice.paid",\n  "customer": "cus_9283"\n}' },
];

export default function AnalyticsPage() {
  const [selectedRow, setSelectedRow] = useState<typeof tableData[0] | null>(null);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof typeof tableData[0]>("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const handleSort = (key: keyof typeof tableData[0]) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("desc");
    }
  };

  const filteredData = tableData
    .filter(row => 
      row.id.toLowerCase().includes(search.toLowerCase()) || 
      row.endpoint.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  return (
    <div className="space-y-6 max-w-7xl mx-auto relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">API Request Logs</h1>
          <p className="text-[#A3A3A3] text-sm">Detailed telemetry and tracing for all incoming API requests.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#141414] border border-[#262626] text-white text-sm font-medium rounded-md hover:bg-[#171717] transition-colors">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="bg-[#141414] border border-[#262626] rounded-xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-[#262626] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by Request ID or Endpoint..." 
              className="w-full bg-[#0A0A0A] border border-[#262626] rounded-md py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-gray-500 transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-[#A3A3A3] text-sm font-medium rounded-md hover:text-white transition-colors">
            <Filter className="w-4 h-4" />
            Advanced Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#A3A3A3]">
            <thead className="bg-[#0A0A0A] border-b border-[#262626] text-xs font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('id')}>Request ID</th>
                <th className="px-6 py-4 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('endpoint')}>Endpoint</th>
                <th className="px-6 py-4 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('status')}>Status</th>
                <th className="px-6 py-4 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('latency')}>Latency</th>
                <th className="px-6 py-4 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('cost')}>Cost</th>
                <th className="px-6 py-4 text-right cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('date')}>Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262626]">
              {filteredData.map((row) => (
                <tr 
                  key={row.id} 
                  onClick={() => setSelectedRow(row)}
                  className="hover:bg-[#171717] transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4 font-mono text-xs text-blue-400">{row.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${row.method === 'GET' ? 'bg-blue-500/10 text-blue-400' : 'bg-green-500/10 text-green-400'}`}>
                        {row.method}
                      </span>
                      <span className="text-white">{row.endpoint}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${row.status === 200 || row.status === 202 ? 'bg-green-500' : row.status === 401 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                      <span>{row.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{row.latency}</td>
                  <td className="px-6 py-4">{row.cost}</td>
                  <td className="px-6 py-4 text-right">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-[#262626] flex items-center justify-between text-xs text-gray-500">
          <span>Showing 1 to 7 of 1,234 results</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-[#262626] rounded hover:bg-[#262626] transition-colors disabled:opacity-50">Previous</button>
            <button className="px-3 py-1 border border-[#262626] rounded hover:bg-[#262626] transition-colors">Next</button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedRow && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRow(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0A0A0A] border-l border-[#262626] z-50 shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-[#262626] flex items-center justify-between bg-[#141414]">
                <div>
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-gray-400" /> Request Details
                  </h2>
                  <p className="text-xs font-mono text-gray-500 mt-1">{selectedRow.id}</p>
                </div>
                <button onClick={() => setSelectedRow(null)} className="text-gray-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 flex-1 overflow-y-auto space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#141414] border border-[#262626] p-4 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-semibold">Status</p>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${selectedRow.status === 200 || selectedRow.status === 202 ? 'bg-green-500' : selectedRow.status === 401 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                      <span className="text-white font-medium">{selectedRow.status}</span>
                    </div>
                  </div>
                  <div className="bg-[#141414] border border-[#262626] p-4 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-semibold">Latency</p>
                    <p className="text-white font-medium">{selectedRow.latency}</p>
                  </div>
                  <div className="bg-[#141414] border border-[#262626] p-4 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-semibold">Method</p>
                    <p className="text-white font-mono font-medium">{selectedRow.method}</p>
                  </div>
                  <div className="bg-[#141414] border border-[#262626] p-4 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-semibold">Cost</p>
                    <p className="text-white font-medium">{selectedRow.cost}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white mb-3">Endpoint Path</h3>
                  <div className="bg-[#141414] border border-[#262626] p-3 rounded-lg text-sm text-gray-300 font-mono break-all">
                    {selectedRow.endpoint}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white mb-3">Request Payload</h3>
                  <div className="bg-[#141414] border border-[#262626] rounded-lg overflow-hidden">
                    <div className="bg-[#0A0A0A] px-4 py-2 border-b border-[#262626] text-xs font-mono text-gray-500 flex justify-between">
                      <span>application/json</span>
                      <button className="hover:text-white transition-colors">Copy</button>
                    </div>
                    <pre className="p-4 text-xs font-mono text-green-400 overflow-x-auto">
                      <code>{selectedRow.payload}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
