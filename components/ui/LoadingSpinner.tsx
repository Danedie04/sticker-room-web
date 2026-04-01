// FILE: /components/ui/LoadingSpinner.tsx

import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  message?: string;
  emoji?: string;
}

export function LoadingSpinner({
  message = "Loading...",
  emoji = "🏠",
}: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <motion.div
        animate={{ rotate: [0, 15, -15, 15, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="text-5xl"
      >
        {emoji}
      </motion.div>
      <p className="text-cozy-muted text-sm animate-pulse">{message}</p>
    </div>
  );
}
