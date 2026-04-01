// FILE: /hooks/useKeyboardShortcuts.ts

"use client";

import { useEffect } from "react";
import { useRoomStore } from "@/store/roomStore";
import { soundManager } from "@/lib/sounds";

export function useKeyboardShortcuts() {
  const {
    editor,
    undo,
    redo,
    canUndo,
    canRedo,
    removeSticker,
    duplicateSticker,
    setSelectedSticker,
    bringForward,
    sendBackward,
  } = useRoomStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.includes("Mac");
      const mod = isMac ? e.metaKey : e.ctrlKey;
      const selected = editor.selectedStickerId;

      // Undo
      if (mod && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        if (canUndo) {
          undo();
          soundManager.playUndo();
        }
        return;
      }

      // Redo
      if ((mod && e.shiftKey && e.key === "z") || (mod && e.key === "y")) {
        e.preventDefault();
        if (canRedo) redo();
        return;
      }

      // Delete selected sticker
      if ((e.key === "Delete" || e.key === "Backspace") && selected) {
        // Don't fire if user is typing in an input
        if (
          document.activeElement?.tagName === "INPUT" ||
          document.activeElement?.tagName === "TEXTAREA"
        )
          return;
        e.preventDefault();
        removeSticker(selected);
        soundManager.playDelete();
        return;
      }

      // Duplicate
      if (mod && e.key === "d" && selected) {
        e.preventDefault();
        duplicateSticker(selected);
        soundManager.playDrop();
        return;
      }

      // Deselect
      if (e.key === "Escape") {
        setSelectedSticker(null);
        return;
      }

      // Layer controls
      if (e.key === "]" && selected) {
        bringForward(selected);
        return;
      }
      if (e.key === "[" && selected) {
        sendBackward(selected);
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    editor.selectedStickerId,
    undo,
    redo,
    canUndo,
    canRedo,
    removeSticker,
    duplicateSticker,
    setSelectedSticker,
    bringForward,
    sendBackward,
  ]);
}
