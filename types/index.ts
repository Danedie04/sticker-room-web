// FILE: /types/index.ts

export type StickerCategory = "plants" | "decor" | "pets" | "furniture" | "food" | "misc";

export interface StickerAsset {
  id: string;
  name: string;
  emoji: string;
  category: StickerCategory;
  width: number;
  height: number;
}

export interface PlacedSticker {
  id: string;
  assetId: string;
  emoji: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  zIndex: number;
  locked: boolean;
  flipX: boolean;
}

export interface RoomTheme {
  id: string;
  name: string;
  wallColor: string;
  floorColor: string;
  backgroundColor: string;
  emoji: string;
}

export interface Room {
  id: string;
  name: string;
  userId: string;
  stickers: PlacedSticker[];
  theme: RoomTheme;
  snapToGrid: boolean;
  createdAt: number;
  updatedAt: number;
  thumbnail?: string;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface HistoryEntry {
  stickers: PlacedSticker[];
  timestamp: number;
}

export interface EditorState {
  selectedStickerId: string | null;
  isDraggingFromPanel: boolean;
  activeCategory: StickerCategory;
  snapToGrid: boolean;
  showGrid: boolean;
  zoom: number;
  isSaving: boolean;
  isExporting: boolean;
}
