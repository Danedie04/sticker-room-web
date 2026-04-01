// FILE: /app/dashboard/loading.tsx

"use client";

import { motion } from "framer-motion";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen">
      {/* Nav skeleton */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 glass border-b border-cozy-border/40">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg shimmer" />
          <div className="w-28 h-5 rounded-lg shimmer" />
        </div>
        <div className="w-20 h-8 rounded-xl shimmer" />
      </div>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="w-32 h-8 rounded-xl shimmer mb-2" />
            <div className="w-20 h-4 rounded-lg shimmer" />
          </div>
          <div className="w-28 h-11 rounded-2xl shimmer" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-cozy-card rounded-3xl border border-cozy-border overflow-hidden"
            >
              <div className="aspect-[16/10] shimmer" />
              <div className="p-4 flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg shimmer" />
                <div>
                  <div className="w-24 h-4 rounded-lg shimmer mb-1.5" />
                  <div className="w-16 h-3 rounded-lg shimmer" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
