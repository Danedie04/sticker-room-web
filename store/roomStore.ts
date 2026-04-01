// FILE: /store/roomStore.ts

import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import type { PlacedSticker, Room, RoomTheme, HistoryEntry, EditorState } from "@/types";
import { ROOM_THEMES } from "@/lib/themes";

const MAX_HISTORY = 50;

interface RoomStore {
  // Room data
  room: Room | null;
  setRoom: (room: Room) => void;
  clearRoom: () => void;

  // Sticker operations
  addSticker: (sticker: PlacedSticker) => void;
  updateSticker: (id: string, updates: Partial<PlacedSticker>) => void;
  removeSticker: (id: string) => void;
  duplicateSticker: (id: string) => void;
  bringForward: (id: string) => void;
  sendBackward: (id: string) => void;
  bringToFront: (id: string) => void;
  sendToBack: (id: string) => void;
  clearAllStickers: () => void;

  // Theme
  setTheme: (theme: RoomTheme) => void;

  // Editor UI state
  editor: EditorState;
  setSelectedSticker: (id: string | null) => void;
  setActiveCategory: (cat: EditorState["activeCategory"]) => void;
  setSnapToGrid: (snap: boolean) => void;
  setShowGrid: (show: boolean) => void;
  setZoom: (zoom: number) => void;
  setIsSaving: (saving: boolean) => void;
  setIsExporting: (exporting: boolean) => void;

  // History (undo/redo)
  history: HistoryEntry[];
  historyIndex: number;
  pushHistory: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const defaultEditor: EditorState = {
  selectedStickerId: null,
  isDraggingFromPanel: false,
  activeCategory: "plants",
  snapToGrid: false,
  showGrid: false,
  zoom: 1,
  isSaving: false,
  isExporting: false,
};

export const useRoomStore = create<RoomStore>()(
  subscribeWithSelector((set, get) => ({
    room: null,
    editor: defaultEditor,
    history: [],
    historyIndex: -1,
    canUndo: false,
    canRedo: false,

    setRoom: (room) => {
      set({ room, history: [], historyIndex: -1, canUndo: false, canRedo: false });
    },

    clearRoom: () => {
      set({ room: null, editor: defaultEditor, history: [], historyIndex: -1 });
    },

    pushHistory: () => {
      const { room, history, historyIndex } = get();
      if (!room) return;

      const entry: HistoryEntry = {
        stickers: JSON.parse(JSON.stringify(room.stickers)),
        timestamp: Date.now(),
      };

      // Trim forward history
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(entry);

      // Limit history size
      if (newHistory.length > MAX_HISTORY) {
        newHistory.shift();
      }

      const newIndex = newHistory.length - 1;
      set({
        history: newHistory,
        historyIndex: newIndex,
        canUndo: newIndex > 0,
        canRedo: false,
      });
    },

    undo: () => {
      const { room, history, historyIndex } = get();
      if (!room || historyIndex <= 0) return;

      const newIndex = historyIndex - 1;
      const entry = history[newIndex];

      set({
        room: { ...room, stickers: JSON.parse(JSON.stringify(entry.stickers)) },
        historyIndex: newIndex,
        canUndo: newIndex > 0,
        canRedo: true,
      });
    },

    redo: () => {
      const { room, history, historyIndex } = get();
      if (!room || historyIndex >= history.length - 1) return;

      const newIndex = historyIndex + 1;
      const entry = history[newIndex];

      set({
        room: { ...room, stickers: JSON.parse(JSON.stringify(entry.stickers)) },
        historyIndex: newIndex,
        canUndo: true,
        canRedo: newIndex < history.length - 1,
      });
    },

    addSticker: (sticker) => {
      const { room } = get();
      if (!room) return;

      get().pushHistory();
      set({
        room: {
          ...room,
          stickers: [...room.stickers, sticker],
          updatedAt: Date.now(),
        },
        editor: { ...get().editor, selectedStickerId: sticker.id },
      });
    },

    updateSticker: (id, updates) => {
      const { room } = get();
      if (!room) return;

      set({
        room: {
          ...room,
          stickers: room.stickers.map((s) =>
            s.id === id ? { ...s, ...updates } : s
          ),
          updatedAt: Date.now(),
        },
      });
    },

    removeSticker: (id) => {
      const { room } = get();
      if (!room) return;

      get().pushHistory();
      set({
        room: {
          ...room,
          stickers: room.stickers.filter((s) => s.id !== id),
          updatedAt: Date.now(),
        },
        editor: {
          ...get().editor,
          selectedStickerId:
            get().editor.selectedStickerId === id
              ? null
              : get().editor.selectedStickerId,
        },
      });
    },

    duplicateSticker: (id) => {
      const { room } = get();
      if (!room) return;

      const original = room.stickers.find((s) => s.id === id);
      if (!original) return;

      get().pushHistory();
      const duplicate: PlacedSticker = {
        ...original,
        id: `sticker_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        x: original.x + 20,
        y: original.y + 20,
        zIndex: Math.max(...room.stickers.map((s) => s.zIndex), 0) + 1,
      };

      set({
        room: {
          ...room,
          stickers: [...room.stickers, duplicate],
          updatedAt: Date.now(),
        },
        editor: { ...get().editor, selectedStickerId: duplicate.id },
      });
    },

    bringForward: (id) => {
      const { room } = get();
      if (!room) return;
      const sticker = room.stickers.find((s) => s.id === id);
      if (!sticker) return;
      get().updateSticker(id, { zIndex: sticker.zIndex + 1 });
    },

    sendBackward: (id) => {
      const { room } = get();
      if (!room) return;
      const sticker = room.stickers.find((s) => s.id === id);
      if (!sticker) return;
      get().updateSticker(id, { zIndex: Math.max(0, sticker.zIndex - 1) });
    },

    bringToFront: (id) => {
      const { room } = get();
      if (!room) return;
      const maxZ = Math.max(...room.stickers.map((s) => s.zIndex), 0);
      get().updateSticker(id, { zIndex: maxZ + 1 });
    },

    sendToBack: (id) => {
      get().updateSticker(id, { zIndex: 0 });
    },

    clearAllStickers: () => {
      const { room } = get();
      if (!room) return;
      get().pushHistory();
      set({
        room: { ...room, stickers: [], updatedAt: Date.now() },
        editor: { ...get().editor, selectedStickerId: null },
      });
    },

    setTheme: (theme) => {
      const { room } = get();
      if (!room) return;
      set({ room: { ...room, theme, updatedAt: Date.now() } });
    },

    setSelectedSticker: (id) => {
      set((state) => ({ editor: { ...state.editor, selectedStickerId: id } }));
    },

    setActiveCategory: (cat) => {
      set((state) => ({ editor: { ...state.editor, activeCategory: cat } }));
    },

    setSnapToGrid: (snap) => {
      set((state) => ({
        editor: { ...state.editor, snapToGrid: snap },
        room: state.room ? { ...state.room, snapToGrid: snap } : null,
      }));
    },

    setShowGrid: (show) => {
      set((state) => ({ editor: { ...state.editor, showGrid: show } }));
    },

    setZoom: (zoom) => {
      set((state) => ({ editor: { ...state.editor, zoom } }));
    },

    setIsSaving: (saving) => {
      set((state) => ({ editor: { ...state.editor, isSaving: saving } }));
    },

    setIsExporting: (exporting) => {
      set((state) => ({ editor: { ...state.editor, isExporting: exporting } }));
    },
  }))
);
