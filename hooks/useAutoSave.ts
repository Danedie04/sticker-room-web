// FILE: /hooks/useAutoSave.ts

"use client";

import { useEffect, useRef } from "react";
import { useRoomStore } from "@/store/roomStore";
import { saveRoom } from "@/firebase/firestore";
import toast from "react-hot-toast";

export function useAutoSave(userId: string | null, delay: number = 3000) {
  const room = useRoomStore((s) => s.room);
  const setIsSaving = useRoomStore((s) => s.setIsSaving);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastSavedRef = useRef<number>(0);

  useEffect(() => {
    if (!room || !userId) return;
    if (room.updatedAt <= lastSavedRef.current) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(async () => {
      try {
        setIsSaving(true);
        await saveRoom(room);
        lastSavedRef.current = room.updatedAt;
      } catch {
        toast.error("Failed to auto-save");
      } finally {
        setIsSaving(false);
      }
    }, delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [room, userId, delay, setIsSaving]);
}
