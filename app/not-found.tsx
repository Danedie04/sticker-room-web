// FILE: /app/not-found.tsx

"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#ffffff_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern bg-grid-40 opacity-60 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0], y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="text-8xl mb-6"
        >
          🏚️
        </motion.div>

        <h1 className="font-display text-5xl font-bold text-cozy-dark mb-3">
          Room Not Found
        </h1>
        <p className="text-cozy-muted mb-10 max-w-sm mx-auto">
          This room doesn't exist — or it wandered off. Let's head back home.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-white font-medium shadow-glow hover:bg-primary-hover hover:scale-105 active:scale-95 transition-all duration-200"
        >
          🏠 Go Home
        </Link>
      </motion.div>
    </div>
  );
}
