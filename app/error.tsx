// FILE: /app/error.tsx

"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#ffffff_0%,transparent_65%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10"
      >
        <div className="text-7xl mb-6">😢</div>
        <h1 className="font-display text-4xl font-bold text-cozy-dark mb-3">
          Something went wrong
        </h1>
        <p className="text-cozy-muted mb-8 max-w-sm mx-auto">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 rounded-2xl bg-primary text-white font-medium shadow-glow hover:bg-primary-hover hover:scale-105 active:scale-95 transition-all"
          >
            Try Again
          </button>
          <a
            href="/"
            className="px-6 py-3 rounded-2xl bg-cozy-card border border-cozy-border text-cozy-text hover:shadow-soft hover:scale-105 transition-all"
          >
            Go Home
          </a>
        </div>
      </motion.div>
    </div>
  );
}
