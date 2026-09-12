export default function Loading() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-pulse">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-[#141414] rounded-md"></div>
          <div className="h-4 w-64 bg-[#141414] rounded-md"></div>
        </div>
        <div className="h-10 w-32 bg-[#141414] rounded-md"></div>
      </div>

      <div className="bg-[#141414] border border-[#262626] rounded-xl overflow-hidden h-[500px]">
        <div className="p-4 border-b border-[#262626] flex justify-between">
          <div className="h-10 w-64 bg-[#262626] rounded-md"></div>
          <div className="h-10 w-32 bg-[#262626] rounded-md"></div>
        </div>
        <div className="p-6 space-y-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex gap-4">
              <div className="h-6 w-32 bg-[#262626] rounded"></div>
              <div className="h-6 w-64 bg-[#262626] rounded"></div>
              <div className="h-6 w-16 bg-[#262626] rounded"></div>
              <div className="h-6 w-24 bg-[#262626] rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
