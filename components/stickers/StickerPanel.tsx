// FILE: /components/stickers/StickerPanel.tsx

"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { useRoomStore } from "@/store/roomStore";
import { STICKER_CATALOG, STICKER_CATEGORIES, getStickersByCategory } from "@/lib/stickers";
import { StickerItem } from "./StickerItem";
import type { StickerCategory } from "@/types";

export function StickerPanel() {
  const { editor, setActiveCategory } = useRoomStore();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStickers = useMemo(() => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return STICKER_CATALOG.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.category.includes(q) ||
          s.emoji.includes(q)
      );
    }
    return getStickersByCategory(editor.activeCategory);
  }, [searchQuery, editor.activeCategory]);

  return (
    <aside className="w-56 border-r border-cozy-border bg-cozy-card flex flex-col">
      {/* Search */}
      <div className="p-3 border-b border-cozy-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-cozy-muted" />
          <input
            type="text"
            placeholder="Search stickers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-2 rounded-xl bg-background border border-cozy-border text-sm text-cozy-dark placeholder:text-cozy-muted focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      {/* Category tabs */}
      {!searchQuery && (
        <div className="flex flex-col gap-0.5 p-2 border-b border-cozy-border">
          {STICKER_CATEGORIES.map((cat) => (
            <CategoryTab
              key={cat.id}
              category={cat}
              isActive={editor.activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
            />
          ))}
        </div>
      )}

      {/* Sticker grid */}
      <div className="flex-1 overflow-y-auto p-3">
        {searchQuery && (
          <p className="text-xs text-cozy-muted mb-2">
            {filteredStickers.length} result{filteredStickers.length !== 1 ? "s" : ""}
          </p>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={searchQuery || editor.activeCategory}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="grid grid-cols-3 gap-2"
          >
            {filteredStickers.map((sticker, i) => (
              <StickerItem key={sticker.id} sticker={sticker} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredStickers.length === 0 && (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">🔍</div>
            <p className="text-xs text-cozy-muted">No stickers found</p>
          </div>
        )}
      </div>

      {/* Hint */}
      <div className="p-3 border-t border-cozy-border">
        <p className="text-[11px] text-cozy-muted text-center">
          Drag or click stickers to place them
        </p>
      </div>
    </aside>
  );
}

function CategoryTab({
  category,
  isActive,
  onClick,
}: {
  category: { id: StickerCategory; label: string; emoji: string };
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all text-left
        ${isActive
          ? "bg-primary/15 text-primary font-medium"
          : "text-cozy-muted hover:bg-background hover:text-cozy-dark"
        }
      `}
    >
      <span className="text-base">{category.emoji}</span>
      <span>{category.label}</span>
    </button>
  );
}
