// FILE: /components/layout/EditorLayout.tsx

"use client";

import { useRef, RefObject } from "react";
import { useAutoSave } from "@/hooks/useAutoSave";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { EditorToolbar } from "@/components/canvas/EditorToolbar";
import { StickerPanel } from "@/components/stickers/StickerPanel";
import { RoomCanvas } from "@/components/canvas/RoomCanvas";
import { StickerControls } from "@/components/canvas/StickerControls";
import { ThemePanel } from "@/components/canvas/ThemePanel";

interface EditorLayoutProps {
  userId: string;
}

export function EditorLayout({ userId }: EditorLayoutProps) {
  const canvasRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;

  useAutoSave(userId);
  useKeyboardShortcuts();

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      {/* Top toolbar */}
      <EditorToolbar canvasRef={canvasRef} />

      {/* Main editor area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left panel: Sticker picker */}
        <StickerPanel />

        {/* Center: Canvas */}
        <div className="flex-1 relative overflow-hidden">
          <RoomCanvas canvasRef={canvasRef} />
        </div>

        {/* Right panel: Sticker controls / Theme picker */}
        <div className="w-64 border-l border-cozy-border bg-cozy-card flex flex-col overflow-y-auto">
          <StickerControls />
          <ThemePanel />
        </div>
      </div>
    </div>
  );
}
