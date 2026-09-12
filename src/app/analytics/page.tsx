"use client";

import { Download, Filter, Search, X, Code2, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
} from '@tanstack/react-table';

type RequestLog = {
  id: string;
  endpoint: string;
  method: string;
  status: number;
  latency: string;
  cost: string;
  date: string;
  payload: string;
};

// Generate 50 mock records for pagination testing
const generateMockData = (): RequestLog[] => {
  const methods = ["GET", "POST", "PUT", "DELETE"];
  const endpoints = ["/api/v1/models/generate", "/api/v1/users/profile", "/api/v1/billing", "/api/v1/auth/verify"];
  const data: RequestLog[] = [];
  
  for (let i = 0; i < 55; i++) {
    data.push({
      id: `req_${Math.random().toString(36).substr(2, 9)}`,
      endpoint: endpoints[Math.floor(Math.random() * endpoints.length)],
      method: methods[Math.floor(Math.random() * methods.length)],
      status: Math.random() > 0.8 ? (Math.random() > 0.5 ? 401 : 500) : 200,
      latency: `${Math.floor(Math.random() * 800 + 20)}ms`,
      cost: `$0.0${Math.floor(Math.random() * 9)}`,
      date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleString(),
      payload: '{"mock": "data"}'
    });
  }
  return data;
};

const columnHelper = createColumnHelper<RequestLog>();

export default function AnalyticsPage() {
  const [data] = useState(() => generateMockData());
  const [selectedRow, setSelectedRow] = useState<RequestLog | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState({});
  const setToast = useAppStore((state) => state.setToast);

  const columns = useMemo(() => [
    columnHelper.display({
      id: 'select',
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllPageRowsSelected()}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
          className="rounded border-gray-600 bg-transparent text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
          className="rounded border-gray-600 bg-transparent text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
        />
      ),
    }),
    columnHelper.accessor('id', {
      header: 'Request ID',
      cell: info => <span className="font-mono text-xs">{info.getValue()}</span>,
    }),
    columnHelper.accessor('method', {
      header: 'Method',
      cell: info => {
        const val = info.getValue();
        return (
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
            val === 'GET' ? 'bg-blue-500/10 text-blue-400' : 
            val === 'POST' ? 'bg-green-500/10 text-green-400' : 
            val === 'DELETE' ? 'bg-red-500/10 text-red-400' : 
            'bg-yellow-500/10 text-yellow-400'
          }`}>{val}</span>
        );
      }
    }),
    columnHelper.accessor('endpoint', {
      header: 'Endpoint',
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: info => {
        const val = info.getValue();
        return (
          <span className={`flex items-center gap-1.5 ${
            val === 200 || val === 202 ? 'text-green-500' : 
            val >= 500 ? 'text-red-500' : 'text-yellow-500'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${
              val === 200 || val === 202 ? 'bg-green-500' : 
              val >= 500 ? 'bg-red-500' : 'bg-yellow-500'
            }`} />
            {val}
          </span>
        );
      }
    }),
    columnHelper.accessor('latency', {
      header: 'Latency',
    }),
    columnHelper.accessor('date', {
      header: 'Timestamp',
    }),
    columnHelper.display({
      id: 'actions',
      cell: () => <button className="text-gray-500 hover:text-white"><MoreHorizontal className="w-4 h-4" /></button>
    })
  ], []);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      rowSelection,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleExport = () => {
    setToast("Generating CSV report... Check your downloads.", "info");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto relative h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">API Request Logs</h1>
          <p className="text-[#A3A3A3] text-sm">Enterprise-grade telemetry with advanced filtering and pagination.</p>
        </div>
        <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-[#141414] border border-[#262626] text-white text-sm font-medium rounded-md hover:bg-[#171717] transition-colors">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="bg-[#141414] border border-[#262626] rounded-xl overflow-hidden flex flex-col flex-1">
        <div className="p-4 border-b border-[#262626] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Filter endpoints or IDs..." 
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#262626] rounded-md py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-gray-500 transition-colors"
            />
          </div>
          <div className="flex gap-2">
            {Object.keys(rowSelection).length > 0 && (
              <button onClick={() => setToast(`Deleted ${Object.keys(rowSelection).length} logs`, "success")} className="px-3 py-2 bg-red-500/10 text-red-500 text-sm font-medium rounded-md hover:bg-red-500/20 transition-colors">
                Delete Selected
              </button>
            )}
            <button className="flex items-center gap-2 px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-[#A3A3A3] text-sm font-medium rounded-md hover:text-white transition-colors">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-[#0A0A0A] border-b border-[#262626] text-xs uppercase tracking-wider">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="px-6 py-4 cursor-pointer hover:text-white transition-colors" onClick={header.column.getToggleSortingHandler()}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-[#262626]">
              {table.getRowModel().rows.map(row => (
                <tr 
                  key={row.id} 
                  onClick={(e) => {
                    if ((e.target as HTMLElement).tagName !== 'INPUT') {
                      setSelectedRow(row.original);
                    }
                  }}
                  className="hover:bg-[#171717] cursor-pointer transition-colors"
                >
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-white">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Controls */}
        <div className="p-4 border-t border-[#262626] flex items-center justify-between bg-[#0A0A0A]">
          <span className="text-sm text-gray-500">
            Showing {table.getRowModel().rows.length} of {table.getFilteredRowModel().rows.length} results
          </span>
          <div className="flex gap-2 items-center">
            <button 
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-1 rounded bg-[#141414] border border-[#262626] disabled:opacity-50 text-white hover:bg-[#262626]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-white px-2">Page {table.getState().pagination.pageIndex + 1}</span>
            <button 
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-1 rounded bg-[#141414] border border-[#262626] disabled:opacity-50 text-white hover:bg-[#262626]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-xl bg-[#0A0A0A] border-l border-[#262626] shadow-2xl z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-[#262626] bg-[#141414]">
                <div>
                  <h2 className="text-lg font-bold text-white mb-1">Request Details</h2>
                  <p className="text-sm text-gray-500 font-mono">{selectedRow.id}</p>
                </div>
                <button onClick={() => setSelectedRow(null)} className="p-2 text-gray-400 hover:text-white bg-[#262626] rounded-full transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-[#141414] border border-[#262626] rounded-lg">
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Endpoint</p>
                    <p className="text-sm text-white font-medium">{selectedRow.endpoint}</p>
                  </div>
                  <div className="p-4 bg-[#141414] border border-[#262626] rounded-lg">
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Timestamp</p>
                    <p className="text-sm text-white font-medium">{selectedRow.date}</p>
                  </div>
                  <div className="p-4 bg-[#141414] border border-[#262626] rounded-lg">
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Status Code</p>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${selectedRow.status === 200 || selectedRow.status === 202 ? 'bg-green-500' : selectedRow.status >= 500 ? 'bg-red-500' : 'bg-yellow-500'}`} />
                      <p className="text-sm text-white font-medium">{selectedRow.status}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-[#141414] border border-[#262626] rounded-lg">
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Latency</p>
                    <p className="text-sm text-white font-medium">{selectedRow.latency}</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Code2 className="w-4 h-4 text-gray-400" />
                    <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Payload Body</h3>
                  </div>
                  <div className="bg-[#141414] border border-[#262626] rounded-lg p-4 overflow-x-auto">
                    <pre className="text-xs text-blue-300 font-mono leading-relaxed">
                      {selectedRow.payload}
                    </pre>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-[#262626] bg-[#141414] flex gap-3">
                <button onClick={() => setToast("Payload copied to clipboard", "success")} className="flex-1 px-4 py-2 bg-[#262626] text-white text-sm font-medium rounded-md hover:bg-[#404040] transition-colors">
                  Copy JSON
                </button>
                <button className="flex-1 px-4 py-2 bg-white text-black text-sm font-medium rounded-md hover:bg-gray-200 transition-colors">
                  Replay Request
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
