// FILE: /components/canvas/EditorToolbar.tsx

"use client";

import { RefObject } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Undo2,
  Redo2,
  Download,
  Save,
  Grid3x3,
  Trash2,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useRoomStore } from "@/store/roomStore";
import { saveRoom } from "@/firebase/firestore";
import { exportCanvasAsPng } from "@/lib/utils";
import { soundManager } from "@/lib/sounds";
import toast from "react-hot-toast";
import { useState } from "react";

interface EditorToolbarProps {
  canvasRef: RefObject<HTMLDivElement>;
}

export function EditorToolbar({ canvasRef }: EditorToolbarProps) {
  const {
    room,
    undo,
    redo,
    canUndo,
    canRedo,
    editor,
    setSnapToGrid,
    setShowGrid,
    setIsSaving,
    setIsExporting,
    clearAllStickers,
  } = useRoomStore();

  const [soundOn, setSoundOn] = useState(true);

  const handleSave = async () => {
    if (!room) return;
    setIsSaving(true);
    try {
      await saveRoom(room);
      soundManager.playSave();
      toast.success("Room saved! ✨");
    } catch {
      toast.error("Save failed");
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = async () => {
    if (!canvasRef.current) return;
    setIsExporting(true);
    try {
      await exportCanvasAsPng(canvasRef.current, room?.name ?? "my-room");
      toast.success("Exported as PNG! 📸");
    } catch {
      toast.error("Export failed");
    } finally {
      setIsExporting(false);
    }
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    soundManager.setEnabled(next);
  };

  const handleClear = () => {
    if (room && room.stickers.length > 0) {
      clearAllStickers();
      toast("Canvas cleared", { icon: "🗑️" });
    }
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 glass border-b border-cozy-border/60 z-30">
      {/* Left */}
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-accent text-cozy-muted hover:text-cozy-dark transition-all text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:block">Rooms</span>
        </Link>

        <div className="w-px h-5 bg-cozy-border" />

        <div className="flex items-center gap-1.5">
          <span className="text-lg">{room?.theme.emoji}</span>
          <span className="font-display font-semibold text-cozy-dark text-sm">
            {room?.name ?? "Loading..."}
          </span>
          {editor.isSaving && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-cozy-muted ml-1"
            >
              Saving...
            </motion.span>
          )}
        </div>
      </div>

      {/* Center: History + Grid controls */}
      <div className="flex items-center gap-1">
        <ToolbarButton
          onClick={undo}
          disabled={!canUndo}
          title="Undo (Cmd+Z)"
          icon={<Undo2 className="w-4 h-4" />}
        />
        <ToolbarButton
          onClick={redo}
          disabled={!canRedo}
          title="Redo (Cmd+Shift+Z)"
          icon={<Redo2 className="w-4 h-4" />}
        />

        <div className="w-px h-5 bg-cozy-border mx-1" />

        <ToolbarButton
          onClick={() => setShowGrid(!editor.showGrid)}
          active={editor.showGrid}
          title="Toggle grid"
          icon={<Grid3x3 className="w-4 h-4" />}
        />

        <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl cursor-pointer hover:bg-accent transition-colors text-xs text-cozy-muted">
          <input
            type="checkbox"
            checked={editor.snapToGrid}
            onChange={(e) => setSnapToGrid(e.target.checked)}
            className="accent-primary rounded"
          />
          <span className="hidden sm:block">Snap</span>
        </label>

        <div className="w-px h-5 bg-cozy-border mx-1" />

        <ToolbarButton
          onClick={handleClear}
          title="Clear all stickers"
          icon={<Trash2 className="w-4 h-4" />}
          danger
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <ToolbarButton
          onClick={toggleSound}
          title={soundOn ? "Mute sounds" : "Unmute sounds"}
          icon={soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        />

        <button
          onClick={handleExport}
          disabled={editor.isExporting}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary text-cozy-dark text-sm font-medium hover:bg-secondary-hover hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:block">Export</span>
        </button>

        <button
          onClick={handleSave}
          disabled={editor.isSaving}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-white text-sm font-medium shadow-glow hover:bg-primary-hover hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
        >
          <Save className="w-3.5 h-3.5" />
          <span className="hidden sm:block">
            {editor.isSaving ? "Saving..." : "Save"}
          </span>
        </button>
      </div>
    </header>
  );
}

function ToolbarButton({
  onClick,
  disabled,
  active,
  title,
  icon,
  danger,
}: {
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  title?: string;
  icon: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`
        p-2 rounded-xl transition-all
        ${disabled ? "opacity-30 cursor-not-allowed" : "hover:scale-105 active:scale-95"}
        ${active ? "bg-primary/15 text-primary" : ""}
        ${danger ? "hover:bg-red-50 hover:text-red-400 text-cozy-muted" : "hover:bg-accent text-cozy-muted hover:text-cozy-dark"}
      `}
    >
      {icon}
    </button>
  );
}
