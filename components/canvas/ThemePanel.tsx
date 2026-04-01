// FILE: /components/canvas/ThemePanel.tsx

"use client";

import { motion } from "framer-motion";
import { useRoomStore } from "@/store/roomStore";
import { ROOM_THEMES } from "@/lib/themes";

export function ThemePanel() {
  const { room, setTheme } = useRoomStore();

  if (!room) return null;

  return (
    <div className="p-4">
      <h3 className="font-display font-semibold text-cozy-dark text-sm mb-3">
        Room Theme
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {ROOM_THEMES.map((theme) => {
          const isActive = room.theme.id === theme.id;
          return (
            <motion.button
              key={theme.id}
              onClick={() => setTheme(theme)}
              whileTap={{ scale: 0.93 }}
              className={`
                relative p-3 rounded-2xl border transition-all text-left
                ${
                  isActive
                    ? "border-primary bg-primary/10 shadow-glow"
                    : "border-cozy-border bg-background hover:border-primary/50 hover:shadow-soft"
                }
              `}
            >
              {/* Color preview */}
              <div className="w-full h-10 rounded-xl mb-2 overflow-hidden border border-cozy-border/50">
                <div
                  className="w-full h-3/4"
                  style={{ background: theme.wallColor }}
                />
                <div
                  className="w-full h-1/4"
                  style={{ background: theme.floorColor }}
                />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm">{theme.emoji}</span>
                <span className="text-xs text-cozy-dark font-medium truncate">
                  {theme.name}
                </span>
              </div>
              {isActive && (
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
