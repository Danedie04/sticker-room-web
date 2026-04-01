// FILE: /lib/stickers.ts

import type { StickerAsset, StickerCategory } from "@/types";

export const STICKER_CATALOG: StickerAsset[] = [
  // Plants
  { id: "plant_01", name: "Monstera", emoji: "🪴", category: "plants", width: 80, height: 100 },
  { id: "plant_02", name: "Cactus", emoji: "🌵", category: "plants", width: 60, height: 90 },
  { id: "plant_03", name: "Sunflower", emoji: "🌻", category: "plants", width: 70, height: 100 },
  { id: "plant_04", name: "Tulip", emoji: "🌷", category: "plants", width: 60, height: 90 },
  { id: "plant_05", name: "Rose", emoji: "🌹", category: "plants", width: 70, height: 90 },
  { id: "plant_06", name: "Cherry Blossom", emoji: "🌸", category: "plants", width: 80, height: 80 },
  { id: "plant_07", name: "Herb Pot", emoji: "🌿", category: "plants", width: 70, height: 70 },
  { id: "plant_08", name: "Bamboo", emoji: "🎋", category: "plants", width: 50, height: 110 },
  { id: "plant_09", name: "Mushroom", emoji: "🍄", category: "plants", width: 60, height: 70 },
  { id: "plant_10", name: "Four Leaf Clover", emoji: "🍀", category: "plants", width: 60, height: 60 },
  { id: "plant_11", name: "Bouquet", emoji: "💐", category: "plants", width: 80, height: 90 },
  { id: "plant_12", name: "Maple Leaf", emoji: "🍁", category: "plants", width: 60, height: 60 },

  // Decor
  { id: "decor_01", name: "Lantern", emoji: "🏮", category: "decor", width: 60, height: 80 },
  { id: "decor_02", name: "Candle", emoji: "🕯️", category: "decor", width: 40, height: 80 },
  { id: "decor_03", name: "Picture Frame", emoji: "🖼️", category: "decor", width: 90, height: 90 },
  { id: "decor_04", name: "Mirror", emoji: "🪞", category: "decor", width: 70, height: 100 },
  { id: "decor_05", name: "Broom", emoji: "🧹", category: "decor", width: 50, height: 100 },
  { id: "decor_06", name: "Basket", emoji: "🧺", category: "decor", width: 80, height: 70 },
  { id: "decor_07", name: "Star", emoji: "⭐", category: "decor", width: 60, height: 60 },
  { id: "decor_08", name: "Rainbow", emoji: "🌈", category: "decor", width: 100, height: 70 },
  { id: "decor_09", name: "Moon", emoji: "🌙", category: "decor", width: 60, height: 60 },
  { id: "decor_10", name: "Balloon", emoji: "🎈", category: "decor", width: 60, height: 80 },
  { id: "decor_11", name: "Wind Chime", emoji: "🎐", category: "decor", width: 50, height: 90 },
  { id: "decor_12", name: "String Lights", emoji: "✨", category: "decor", width: 90, height: 60 },

  // Pets
  { id: "pet_01", name: "Cat", emoji: "🐱", category: "pets", width: 80, height: 80 },
  { id: "pet_02", name: "Dog", emoji: "🐶", category: "pets", width: 80, height: 80 },
  { id: "pet_03", name: "Rabbit", emoji: "🐰", category: "pets", width: 70, height: 80 },
  { id: "pet_04", name: "Hamster", emoji: "🐹", category: "pets", width: 60, height: 60 },
  { id: "pet_05", name: "Bird", emoji: "🐦", category: "pets", width: 60, height: 60 },
  { id: "pet_06", name: "Fish", emoji: "🐠", category: "pets", width: 70, height: 60 },
  { id: "pet_07", name: "Turtle", emoji: "🐢", category: "pets", width: 70, height: 60 },
  { id: "pet_08", name: "Hedgehog", emoji: "🦔", category: "pets", width: 70, height: 60 },
  { id: "pet_09", name: "Frog", emoji: "🐸", category: "pets", width: 60, height: 60 },
  { id: "pet_10", name: "Bear", emoji: "🐻", category: "pets", width: 80, height: 80 },
  { id: "pet_11", name: "Panda", emoji: "🐼", category: "pets", width: 80, height: 80 },
  { id: "pet_12", name: "Fox", emoji: "🦊", category: "pets", width: 80, height: 80 },

  // Furniture
  { id: "furn_01", name: "Sofa", emoji: "🛋️", category: "furniture", width: 130, height: 80 },
  { id: "furn_02", name: "Bed", emoji: "🛏️", category: "furniture", width: 130, height: 100 },
  { id: "furn_03", name: "Desk", emoji: "🪑", category: "furniture", width: 90, height: 90 },
  { id: "furn_04", name: "Bookshelf", emoji: "📚", category: "furniture", width: 100, height: 110 },
  { id: "furn_05", name: "Lamp", emoji: "🪔", category: "furniture", width: 60, height: 100 },
  { id: "furn_06", name: "Clock", emoji: "🕰️", category: "furniture", width: 70, height: 80 },
  { id: "furn_07", name: "TV", emoji: "📺", category: "furniture", width: 120, height: 80 },
  { id: "furn_08", name: "Window", emoji: "🪟", category: "furniture", width: 100, height: 100 },
  { id: "furn_09", name: "Door", emoji: "🚪", category: "furniture", width: 80, height: 120 },
  { id: "furn_10", name: "Piano", emoji: "🎹", category: "furniture", width: 130, height: 90 },
  { id: "furn_11", name: "Carpet", emoji: "🪆", category: "furniture", width: 110, height: 80 },
  { id: "furn_12", name: "Fireplace", emoji: "🔥", category: "furniture", width: 110, height: 100 },

  // Food
  { id: "food_01", name: "Tea Cup", emoji: "🍵", category: "food", width: 60, height: 60 },
  { id: "food_02", name: "Coffee", emoji: "☕", category: "food", width: 60, height: 60 },
  { id: "food_03", name: "Cake", emoji: "🎂", category: "food", width: 80, height: 80 },
  { id: "food_04", name: "Cookies", emoji: "🍪", category: "food", width: 60, height: 60 },
  { id: "food_05", name: "Strawberry", emoji: "🍓", category: "food", width: 55, height: 60 },
  { id: "food_06", name: "Ice Cream", emoji: "🍦", category: "food", width: 55, height: 80 },
  { id: "food_07", name: "Bento Box", emoji: "🍱", category: "food", width: 80, height: 70 },
  { id: "food_08", name: "Croissant", emoji: "🥐", category: "food", width: 70, height: 60 },

  // Misc
  { id: "misc_01", name: "Rainbow", emoji: "🌈", category: "misc", width: 100, height: 70 },
  { id: "misc_02", name: "Gift Box", emoji: "🎁", category: "misc", width: 80, height: 80 },
  { id: "misc_03", name: "Diary", emoji: "📔", category: "misc", width: 70, height: 80 },
  { id: "misc_04", name: "Pencil", emoji: "✏️", category: "misc", width: 50, height: 80 },
  { id: "misc_05", name: "Heart", emoji: "❤️", category: "misc", width: 60, height: 60 },
  { id: "misc_06", name: "Sparkles", emoji: "✨", category: "misc", width: 70, height: 70 },
  { id: "misc_07", name: "Crystal Ball", emoji: "🔮", category: "misc", width: 70, height: 70 },
  { id: "misc_08", name: "Music Note", emoji: "🎵", category: "misc", width: 55, height: 70 },
];

export const STICKER_CATEGORIES: { id: StickerCategory; label: string; emoji: string }[] = [
  { id: "plants", label: "Plants", emoji: "🌿" },
  { id: "decor", label: "Decor", emoji: "✨" },
  { id: "pets", label: "Pets", emoji: "🐱" },
  { id: "furniture", label: "Furniture", emoji: "🛋️" },
  { id: "food", label: "Food", emoji: "🍵" },
  { id: "misc", label: "Misc", emoji: "🎁" },
];

export const getStickersByCategory = (category: StickerCategory): StickerAsset[] => {
  return STICKER_CATALOG.filter((s) => s.category === category);
};

export const getStickerById = (id: string): StickerAsset | undefined => {
  return STICKER_CATALOG.find((s) => s.id === id);
};
