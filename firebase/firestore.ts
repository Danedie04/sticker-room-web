// FILE: /firebase/firestore.ts

import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  serverTimestamp,
  orderBy,
  limit,
} from "firebase/firestore";
import type { User } from "firebase/auth";
import { db } from "./config";
import type { Room, RoomTheme } from "@/types";

// ── User documents ────────────────────────────────────────────────────────────

export const createUserDocument = async (user: User): Promise<void> => {
  const userRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: serverTimestamp(),
    });
  }
};

// ── Room documents ────────────────────────────────────────────────────────────

export const saveRoom = async (room: Room): Promise<void> => {
  const roomRef = doc(db, "rooms", room.id);
  await setDoc(roomRef, {
    ...room,
    updatedAt: Date.now(),
  });
};

export const getRoom = async (roomId: string): Promise<Room | null> => {
  const roomRef = doc(db, "rooms", roomId);
  const snapshot = await getDoc(roomRef);
  if (!snapshot.exists()) return null;
  return snapshot.data() as Room;
};

export const getUserRooms = async (userId: string): Promise<Room[]> => {
  const q = query(
    collection(db, "rooms"),
    where("userId", "==", userId),
    orderBy("updatedAt", "desc"),
    limit(20)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data() as Room);
};

export const deleteRoom = async (roomId: string): Promise<void> => {
  await deleteDoc(doc(db, "rooms", roomId));
};

export const createNewRoom = (userId: string, name: string): Room => {
  const defaultTheme: RoomTheme = {
    id: "cozy",
    name: "Cozy Beige",
    wallColor: "#FAF0E6",
    floorColor: "#E8DDD0",
    backgroundColor: "#F6F1EB",
    emoji: "🏠",
  };

  return {
    id: `room_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name,
    userId,
    stickers: [],
    theme: defaultTheme,
    snapToGrid: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
};
