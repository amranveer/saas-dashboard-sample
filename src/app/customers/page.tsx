"use client";

import { Search, Filter, MoreHorizontal, Mail, MapPin } from "lucide-react";
import { useState } from "react";

const customersData = [
  { id: "cus_1", name: "Acme Corp", email: "billing@acmecorp.com", status: "Active", spend: "$1,245.00", location: "San Francisco, CA" },
  { id: "cus_2", name: "Globex Inc", email: "accounts@globex.com", status: "Past Due", spend: "$850.00", location: "New York, NY" },
  { id: "cus_3", name: "Soylent", email: "finance@soylent.io", status: "Active", spend: "$4,320.00", location: "London, UK" },
  { id: "cus_4", name: "Initech", email: "peter@initech.com", status: "Canceled", spend: "$120.00", location: "Austin, TX" },
  { id: "cus_5", name: "Umbrella", email: "admin@umbrella.net", status: "Active", spend: "$9,450.00", location: "Tokyo, JP" },
];

export default function CustomersPage() {
  const [search, setSearch] = useState("");

  const filteredCustomers = customersData.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Customers</h1>
          <p className="text-[#A3A3A3] text-sm">Manage your active subscriptions and accounts.</p>
        </div>
        <button className="px-4 py-2 bg-white text-black text-sm font-medium rounded-md hover:bg-gray-200 transition-colors">
          Add Customer
        </button>
      </div>

      <div className="bg-[#141414] border border-[#262626] rounded-xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-[#262626] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search customers..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#262626] rounded-md py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-gray-500 transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-[#A3A3A3] text-sm font-medium rounded-md hover:text-white transition-colors">
            <Filter className="w-4 h-4" />
            Filter Status
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {filteredCustomers.map((customer) => (
            <div key={customer.id} className="bg-[#0A0A0A] border border-[#262626] p-5 rounded-lg hover:border-gray-600 transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-sm group-hover:text-blue-400 transition-colors">{customer.name}</h3>
                    <div className="flex items-center gap-1.5 text-[#A3A3A3] text-xs mt-0.5">
                      <Mail className="w-3 h-3" />
                      {customer.email}
                    </div>
                  </div>
                </div>
                <button className="text-gray-500 hover:text-white"><MoreHorizontal className="w-4 h-4" /></button>
              </div>
              
              <div className="flex items-center justify-between text-xs mt-6 pt-4 border-t border-[#262626]">
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500 font-medium">Status</span>
                  <span className={`px-2 py-0.5 rounded-full font-medium ${
                    customer.status === 'Active' ? 'bg-green-500/10 text-green-400' :
                    customer.status === 'Past Due' ? 'bg-yellow-500/10 text-yellow-400' :
                    'bg-red-500/10 text-red-400'
                  }`}>
                    {customer.status}
                  </span>
                </div>
                <div className="flex flex-col gap-1 text-right">
                  <span className="text-gray-500 font-medium">LTV</span>
                  <span className="text-white font-medium">{customer.spend}</span>
                </div>
              </div>
            </div>
          ))}
          {filteredCustomers.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500 text-sm">
              No customers match your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
