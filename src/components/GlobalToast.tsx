"use client";

import { useAppStore } from "@/store/useAppStore";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";

export default function GlobalToast() {
  const toast = useAppStore((state) => state.toast);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-[#141414] border border-[#262626] rounded-lg shadow-2xl"
        >
          {toast.type === "success" && <CheckCircle2 className="w-5 h-5 text-green-500" />}
          {toast.type === "error" && <AlertCircle className="w-5 h-5 text-red-500" />}
          {toast.type === "info" && <Info className="w-5 h-5 text-blue-500" />}
          <p className="text-sm font-medium text-white">{toast.message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
