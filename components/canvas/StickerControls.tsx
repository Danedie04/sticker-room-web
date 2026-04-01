// FILE: /components/canvas/StickerControls.tsx

"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  Copy,
  RotateCcw,
  FlipHorizontal,
  Lock,
  Unlock,
  ArrowUp,
  ArrowDown,
  ChevronsUp,
  ChevronsDown,
} from "lucide-react";
import { useRoomStore } from "@/store/roomStore";
import { soundManager } from "@/lib/sounds";

export function StickerControls() {
  const {
    room,
    editor,
    updateSticker,
    removeSticker,
    duplicateSticker,
    bringForward,
    sendBackward,
    bringToFront,
    sendToBack,
    pushHistory,
  } = useRoomStore();

  const selectedId = editor.selectedStickerId;
  const sticker = room?.stickers.find((s) => s.id === selectedId);

  const handleDelete = () => {
    if (!selectedId) return;
    removeSticker(selectedId);
    soundManager.playDelete();
  };

  const handleDuplicate = () => {
    if (!selectedId) return;
    duplicateSticker(selectedId);
    soundManager.playDrop();
  };

  const handleRotate = () => {
    if (!sticker) return;
    pushHistory();
    updateSticker(sticker.id, { rotation: (sticker.rotation + 15) % 360 });
  };

  const handleFlip = () => {
    if (!sticker) return;
    updateSticker(sticker.id, { flipX: !sticker.flipX });
  };

  const handleLock = () => {
    if (!sticker) return;
    updateSticker(sticker.id, { locked: !sticker.locked });
  };

  const handleRotationSlider = (val: number) => {
    if (!sticker) return;
    updateSticker(sticker.id, { rotation: val });
  };

  const handleScaleSlider = (val: number) => {
    if (!sticker) return;
    const ratio = sticker.height / sticker.width;
    const newW = val;
    const newH = Math.round(val * ratio);
    updateSticker(sticker.id, { width: newW, height: newH });
  };

  return (
    <div className="p-4 border-b border-cozy-border">
      <h3 className="font-display font-semibold text-cozy-dark text-sm mb-3">
        {sticker ? "Sticker Controls" : "Properties"}
      </h3>

      <AnimatePresence mode="wait">
        {sticker ? (
          <motion.div
            key="controls"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Sticker preview */}
            <div className="flex items-center gap-3 p-3 bg-background rounded-2xl border border-cozy-border">
              <div className="text-3xl">{sticker.emoji}</div>
              <div>
                <p className="font-medium text-cozy-dark text-sm">{sticker.name}</p>
                <p className="text-xs text-cozy-muted">
                  {sticker.width}×{sticker.height}px
                </p>
              </div>
            </div>

            {/* Rotation */}
            <div>
              <label className="text-xs text-cozy-muted mb-1 block">
                Rotation: {sticker.rotation}°
              </label>
              <input
                type="range"
                min={0}
                max={359}
                value={sticker.rotation}
                onChange={(e) => handleRotationSlider(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            {/* Scale */}
            <div>
              <label className="text-xs text-cozy-muted mb-1 block">
                Size: {sticker.width}px
              </label>
              <input
                type="range"
                min={30}
                max={250}
                value={sticker.width}
                onChange={(e) => handleScaleSlider(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            {/* Actions row 1 */}
            <div className="grid grid-cols-4 gap-1.5">
              <ControlBtn onClick={handleRotate} icon={<RotateCcw className="w-3.5 h-3.5" />} label="Rotate" />
              <ControlBtn onClick={handleFlip} icon={<FlipHorizontal className="w-3.5 h-3.5" />} label="Flip" />
              <ControlBtn onClick={handleLock} icon={sticker.locked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />} label={sticker.locked ? "Unlock" : "Lock"} active={sticker.locked} />
              <ControlBtn onClick={handleDuplicate} icon={<Copy className="w-3.5 h-3.5" />} label="Copy" />
            </div>

            {/* Layer controls */}
            <div>
              <label className="text-xs text-cozy-muted mb-1.5 block">
                Layer (z: {sticker.zIndex})
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                <ControlBtn onClick={() => sendToBack(sticker.id)} icon={<ChevronsDown className="w-3.5 h-3.5" />} label="Back" />
                <ControlBtn onClick={() => sendBackward(sticker.id)} icon={<ArrowDown className="w-3.5 h-3.5" />} label="Down" />
                <ControlBtn onClick={() => bringForward(sticker.id)} icon={<ArrowUp className="w-3.5 h-3.5" />} label="Up" />
                <ControlBtn onClick={() => bringToFront(sticker.id)} icon={<ChevronsUp className="w-3.5 h-3.5" />} label="Front" />
              </div>
            </div>

            {/* Delete */}
            <button
              onClick={handleDelete}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-red-50 text-red-400 hover:bg-red-100 transition-colors text-sm font-medium"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete Sticker
            </button>

            {/* Keyboard hints */}
            <div className="text-xs text-cozy-muted space-y-0.5">
              <p>⌘D duplicate · Del delete</p>
              <p>[ ] layer · Esc deselect</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-6"
          >
            <div className="text-4xl mb-2">👆</div>
            <p className="text-xs text-cozy-muted">
              Click a sticker to edit it
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ControlBtn({
  onClick,
  icon,
  label,
  active,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={`
        flex flex-col items-center gap-0.5 p-2 rounded-xl text-xs transition-all hover:scale-105 active:scale-95
        ${active
          ? "bg-primary/15 text-primary"
          : "bg-background border border-cozy-border text-cozy-muted hover:text-cozy-dark hover:border-primary"
        }
      `}
    >
      {icon}
      <span className="text-[10px] leading-none">{label}</span>
    </button>
  );
}
