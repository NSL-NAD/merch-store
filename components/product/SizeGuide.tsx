"use client";

import { useState } from "react";
import { X, Ruler } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SIZE_CHART } from "@/lib/constants";

export default function SizeGuide() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 font-mono text-xs text-text-secondary hover:text-white transition-colors cursor-pointer"
      >
        <Ruler size={14} />
        Size Guide
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60"
              onClick={() => setOpen(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
            >
              <div className="bg-bg-secondary border border-border-default rounded-sm w-full max-w-md">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-border-default">
                  <h3 className="font-display text-lg uppercase tracking-wider">
                    Size Guide
                  </h3>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-text-secondary hover:text-white transition-colors cursor-pointer"
                    aria-label="Close size guide"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Table */}
                <div className="px-6 py-4">
                  <p className="font-mono text-xs text-text-muted mb-4">
                    Premium Faded Tee, Relaxed Unisex Fit
                  </p>
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border-default">
                        <th className="py-2 text-left font-mono text-[10px] uppercase tracking-widest text-text-muted">
                          Size
                        </th>
                        <th className="py-2 text-left font-mono text-[10px] uppercase tracking-widest text-text-muted">
                          Chest
                        </th>
                        <th className="py-2 text-left font-mono text-[10px] uppercase tracking-widest text-text-muted">
                          Length
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {SIZE_CHART.map((row) => (
                        <tr
                          key={row.size}
                          className="border-b border-border-default last:border-0"
                        >
                          <td className="py-2 font-mono text-sm text-text-primary">
                            {row.size}
                          </td>
                          <td className="py-2 font-mono text-sm text-text-secondary">
                            {row.chest}
                          </td>
                          <td className="py-2 font-mono text-sm text-text-secondary">
                            {row.length}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
