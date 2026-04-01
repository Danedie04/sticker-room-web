// FILE: /components/canvas/ZoomControls.tsx

"use client";

import { motion } from "framer-motion";
import { ZoomIn, ZoomOut, Maximize } from "lucide-react";
import { useRoomStore } from "@/store/roomStore";

const ZOOM_STEPS = [0.5, 0.75, 1, 1.25, 1.5, 2];
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2;

export function ZoomControls() {
  const { editor, setZoom } = useRoomStore();

  const zoomIn = () => {
    const next = ZOOM_STEPS.find((z) => z > editor.zoom);
    if (next) setZoom(next);
  };

  const zoomOut = () => {
    const prev = [...ZOOM_STEPS].reverse().find((z) => z < editor.zoom);
    if (prev) setZoom(prev);
  };

  const resetZoom = () => setZoom(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute bottom-6 right-6 z-20 flex items-center gap-1.5 glass rounded-2xl px-2 py-1.5 shadow-soft border border-cozy-border"
    >
      <button
        onClick={zoomOut}
        disabled={editor.zoom <= MIN_ZOOM}
        className="p-1.5 rounded-lg hover:bg-accent text-cozy-muted hover:text-cozy-dark transition-all disabled:opacity-30"
        title="Zoom out"
      >
        <ZoomOut className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={resetZoom}
        className="px-2 py-1 rounded-lg hover:bg-accent text-xs font-medium text-cozy-dark min-w-[3rem] text-center transition-all"
        title="Reset zoom"
      >
        {Math.round(editor.zoom * 100)}%
      </button>

      <button
        onClick={zoomIn}
        disabled={editor.zoom >= MAX_ZOOM}
        className="p-1.5 rounded-lg hover:bg-accent text-cozy-muted hover:text-cozy-dark transition-all disabled:opacity-30"
        title="Zoom in"
      >
        <ZoomIn className="w-3.5 h-3.5" />
      </button>

      <div className="w-px h-4 bg-cozy-border mx-0.5" />

      <button
        onClick={resetZoom}
        className="p-1.5 rounded-lg hover:bg-accent text-cozy-muted hover:text-cozy-dark transition-all"
        title="Fit to screen"
      >
        <Maximize className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
}
