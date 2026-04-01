// FILE: /components/stickers/StickerItem.tsx

"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";
import { useRoomStore } from "@/store/roomStore";
import { generateId, snapToGrid } from "@/lib/utils";
import { soundManager } from "@/lib/sounds";
import type { StickerAsset, PlacedSticker } from "@/types";

interface StickerItemProps {
  sticker: StickerAsset;
  index: number;
}

// Default canvas center placement when clicked
const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 600;

export function StickerItem({ sticker, index }: StickerItemProps) {
  const { room, addSticker, editor } = useRoomStore();

  const handleDragStart = useCallback(
    (e: React.DragEvent) => {
      e.dataTransfer.setData(
        "application/sticker",
        JSON.stringify(sticker)
      );
      e.dataTransfer.effectAllowed = "copy";
      soundManager.playPeel();

      // Ghost image
      const ghost = document.createElement("div");
      ghost.innerHTML = sticker.emoji;
      ghost.style.cssText = `
        font-size: 48px;
        position: fixed;
        top: -100px;
        left: -100px;
        pointer-events: none;
      `;
      document.body.appendChild(ghost);
      e.dataTransfer.setDragImage(ghost, 24, 24);
      setTimeout(() => document.body.removeChild(ghost), 0);
    },
    [sticker]
  );

  const handleClick = useCallback(() => {
    if (!room) return;

    const maxZ = room.stickers.length > 0
      ? Math.max(...room.stickers.map((s) => s.zIndex))
      : 0;

    // Place roughly in center of canvas with slight random offset
    const offsetX = (Math.random() - 0.5) * 200;
    const offsetY = (Math.random() - 0.5) * 100;
    let x = (CANVAS_WIDTH - sticker.width) / 2 + offsetX;
    let y = (CANVAS_HEIGHT - sticker.height) / 2 + offsetY;

    if (editor.snapToGrid) {
      x = snapToGrid(x);
      y = snapToGrid(y);
    }

    x = Math.max(0, Math.min(x, CANVAS_WIDTH - sticker.width));
    y = Math.max(0, Math.min(y, CANVAS_HEIGHT - sticker.height));

    const newSticker: PlacedSticker = {
      id: generateId(),
      assetId: sticker.id,
      emoji: sticker.emoji,
      name: sticker.name,
      x,
      y,
      width: sticker.width,
      height: sticker.height,
      rotation: 0,
      zIndex: maxZ + 1,
      locked: false,
      flipX: false,
    };

    addSticker(newSticker);
    soundManager.playDrop();
  }, [sticker, room, editor.snapToGrid, addSticker]);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.2,
        delay: Math.min(index * 0.03, 0.3),
      }}
      draggable
      onDragStart={handleDragStart}
      onClick={handleClick}
      title={sticker.name}
      className="
        sticker-panel-item
        flex flex-col items-center justify-center gap-1
        p-2 rounded-2xl
        bg-background border border-cozy-border
        hover:border-primary hover:shadow-soft hover:bg-accent/30
        active:scale-95
        transition-all duration-150
        cursor-grab active:cursor-grabbing
      "
    >
      <span className="text-3xl leading-none select-none">{sticker.emoji}</span>
      <span className="text-[10px] text-cozy-muted truncate w-full text-center leading-tight">
        {sticker.name}
      </span>
    </motion.button>
  );
}
