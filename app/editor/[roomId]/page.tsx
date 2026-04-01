// FILE: /app/editor/[roomId]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { getRoom } from "@/firebase/firestore";
import { useRoomStore } from "@/store/roomStore";
import { EditorLayout } from "@/components/layout/EditorLayout";

export default function EditorPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = params.roomId as string;
  const { user, isLoading: authLoading } = useAuth();
  const { setRoom, clearRoom } = useRoomStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace("/dashboard");
      return;
    }

    const load = async () => {
      try {
        const room = await getRoom(roomId);
        if (!room) {
          setError("Room not found");
          return;
        }
        if (room.userId !== user.uid) {
          setError("You don't have access to this room");
          return;
        }
        setRoom(room);
      } catch {
        setError("Failed to load room");
      } finally {
        setLoading(false);
      }
    };

    load();
    return () => clearRoom();
  }, [roomId, user, authLoading, router, setRoom, clearRoom]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <motion.div
          animate={{ rotate: [0, 10, -10, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-6xl"
        >
          🏠
        </motion.div>
        <p className="text-cozy-muted text-sm animate-pulse">Loading your room...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
        <div className="text-6xl">😕</div>
        <h2 className="font-display text-2xl font-bold text-cozy-dark">{error}</h2>
        <button
          onClick={() => router.push("/dashboard")}
          className="px-6 py-3 rounded-2xl bg-primary text-white hover:bg-primary-hover transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return <EditorLayout userId={user!.uid} />;
}
