// FILE: /components/canvas/RoomCanvas.tsx

"use client";

import { RefObject, useCallback, useRef } from "react";
import { Rnd } from "react-rnd";
import { motion, AnimatePresence } from "framer-motion";
import { useRoomStore } from "@/store/roomStore";
import { snapToGrid, generateId, clampValue } from "@/lib/utils";
import { soundManager } from "@/lib/sounds";
import { ZoomControls } from "./ZoomControls";
import type { PlacedSticker } from "@/types";

interface RoomCanvasProps {
  canvasRef: RefObject<HTMLDivElement>;
}

const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 600;

export function RoomCanvas({ canvasRef }: RoomCanvasProps) {
  const {
    room,
    editor,
    addSticker,
    updateSticker,
    setSelectedSticker,
    setZoom,
    pushHistory,
  } = useRoomStore();

  const isDragOver = useRef(false);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      const newZoom = clampValue(
        Math.round((editor.zoom + delta) * 10) / 10,
        0.5,
        2
      );
      setZoom(newZoom);
    },
    [editor.zoom, setZoom]
  );

  const handleCanvasClick = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest(".sticker-rnd")) return;
      setSelectedSticker(null);
    },
    [setSelectedSticker]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    isDragOver.current = true;
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      isDragOver.current = false;
      if (!room || !canvasRef.current) return;

      const raw = e.dataTransfer.getData("application/sticker");
      if (!raw) return;

      const asset = JSON.parse(raw);
      const rect = canvasRef.current.getBoundingClientRect();
      const scale = editor.zoom;

      let x = (e.clientX - rect.left) / scale - asset.width / 2;
      let y = (e.clientY - rect.top) / scale - asset.height / 2;

      if (editor.snapToGrid) {
        x = snapToGrid(x);
        y = snapToGrid(y);
      }

      x = Math.max(0, Math.min(x, CANVAS_WIDTH - asset.width));
      y = Math.max(0, Math.min(y, CANVAS_HEIGHT - asset.height));

      const maxZ = room.stickers.length > 0
        ? Math.max(...room.stickers.map((s) => s.zIndex))
        : 0;

      const newSticker: PlacedSticker = {
        id: generateId(),
        assetId: asset.id,
        emoji: asset.emoji,
        name: asset.name,
        x,
        y,
        width: asset.width,
        height: asset.height,
        rotation: 0,
        zIndex: maxZ + 1,
        locked: false,
        flipX: false,
      };

      addSticker(newSticker);
      soundManager.playDrop();
    },
    [room, editor.snapToGrid, editor.zoom, addSticker, canvasRef]
  );

  if (!room) return null;

  const { theme } = room;

  return (
    <div
      className="w-full h-full overflow-auto flex items-center justify-center p-8 relative"
      style={{ background: "#EDE5DC" }}
      onWheel={handleWheel}
    >
      <ZoomControls />
      {/* Canvas wrapper */}
      <div
        style={{
          transform: `scale(${editor.zoom})`,
          transformOrigin: "center center",
          transition: "transform 0.2s ease",
        }}
      >
        <div
          ref={canvasRef}
          id="room-canvas"
          className="relative overflow-hidden rounded-3xl shadow-strong no-select"
          style={{
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            background: theme.wallColor,
            cursor: "default",
          }}
          onClick={handleCanvasClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {/* Grid overlay */}
          {editor.showGrid && (
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(107,79,79,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(107,79,79,0.07) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
          )}

          {/* Floor */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1/4 rounded-b-3xl"
            style={{ background: theme.floorColor }}
          />

          {/* Baseboard */}
          <div
            className="absolute pointer-events-none"
            style={{
              bottom: "25%",
              left: 0,
              right: 0,
              height: 4,
              background: `${theme.floorColor}CC`,
            }}
          />

          {/* Placed stickers */}
          <AnimatePresence>
            {room.stickers
              .slice()
              .sort((a, b) => a.zIndex - b.zIndex)
              .map((sticker) => (
                <StickerRnd
                  key={sticker.id}
                  sticker={sticker}
                  isSelected={editor.selectedStickerId === sticker.id}
                  snapToGridEnabled={editor.snapToGrid}
                  onSelect={() => {
                    setSelectedSticker(sticker.id);
                    soundManager.playSelect();
                  }}
                  onUpdate={(updates) => updateSticker(sticker.id, updates)}
                  onPushHistory={pushHistory}
                />
              ))}
          </AnimatePresence>

          {/* Empty state */}
          {room.stickers.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="text-6xl mb-4 opacity-30"
              >
                🏠
              </motion.div>
              <p className="text-cozy-muted text-sm opacity-50">
                Drag stickers here to decorate!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Individual placed sticker (Rnd wrapper) ────────────────────────────────

interface StickerRndProps {
  sticker: PlacedSticker;
  isSelected: boolean;
  snapToGridEnabled: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<PlacedSticker>) => void;
  onPushHistory: () => void;
}

function StickerRnd({
  sticker,
  isSelected,
  snapToGridEnabled,
  onSelect,
  onUpdate,
  onPushHistory,
}: StickerRndProps) {
  const dragStart = useRef<{ x: number; y: number } | null>(null);

  return (
    <motion.div
      key={sticker.id}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ type: "spring", bounce: 0.4, duration: 0.4 }}
      className="sticker-rnd"
      style={{
        position: "absolute",
        zIndex: sticker.zIndex,
        left: sticker.x,
        top: sticker.y,
        width: sticker.width,
        height: sticker.height,
      }}
    >
      <Rnd
        size={{ width: sticker.width, height: sticker.height }}
        position={{ x: 0, y: 0 }}
        dragGrid={snapToGridEnabled ? [20, 20] : [1, 1]}
        resizeGrid={snapToGridEnabled ? [20, 20] : [1, 1]}
        bounds="parent"
        disableDragging={sticker.locked}
        enableResizing={!sticker.locked}
        onMouseDown={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        onDragStart={() => {
          dragStart.current = { x: sticker.x, y: sticker.y };
          onPushHistory();
        }}
        onDragStop={(_e, d) => {
          let newX = sticker.x + d.x;
          let newY = sticker.y + d.y;
          if (snapToGridEnabled) {
            newX = snapToGrid(newX);
            newY = snapToGrid(newY);
          }
          onUpdate({ x: newX, y: newY });
          soundManager.playDrop();
        }}
        onResizeStart={() => {
          onPushHistory();
        }}
        onResizeStop={(_e, _dir, ref, _delta, pos) => {
          onUpdate({
            width: parseInt(ref.style.width),
            height: parseInt(ref.style.height),
            x: sticker.x + pos.x,
            y: sticker.y + pos.y,
          });
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className={`
            w-full h-full flex items-center justify-center select-none transition-all duration-100
            ${isSelected ? "ring-2 ring-primary ring-offset-1 ring-offset-transparent rounded-xl" : ""}
            ${sticker.locked ? "cursor-not-allowed" : "cursor-grab active:cursor-grabbing"}
          `}
          style={{
            transform: `rotate(${sticker.rotation}deg) scaleX(${sticker.flipX ? -1 : 1})`,
          }}
        >
          <span
            style={{
              fontSize: Math.min(sticker.width, sticker.height) * 0.7,
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            {sticker.emoji}
          </span>
        </div>
      </Rnd>
    </motion.div>
  );
}
