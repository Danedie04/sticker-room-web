// FILE: /app/dashboard/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, LogOut, Trash2, Edit3, Home } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import { signInWithGoogle, signOutUser } from "@/firebase/auth";
import { getUserRooms, createNewRoom, saveRoom, deleteRoom } from "@/firebase/firestore";
import { formatDate } from "@/lib/utils";
import type { Room } from "@/types";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [creatingRoom, setCreatingRoom] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [showNameModal, setShowNameModal] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadRooms();
    }
  }, [user]);

  const loadRooms = async () => {
    if (!user) return;
    setLoadingRooms(true);
    try {
      const userRooms = await getUserRooms(user.uid);
      setRooms(userRooms);
    } catch {
      toast.error("Could not load rooms");
    } finally {
      setLoadingRooms(false);
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch {
      toast.error("Sign in failed. Please try again.");
    }
  };

  const handleSignOut = async () => {
    await signOutUser();
    setRooms([]);
    toast.success("Signed out!");
  };

  const handleCreateRoom = async () => {
    if (!user || !newRoomName.trim()) return;
    setCreatingRoom(true);
    try {
      const room = createNewRoom(user.uid, newRoomName.trim());
      await saveRoom(room);
      setRooms((prev) => [room, ...prev]);
      setShowNameModal(false);
      setNewRoomName("");
      toast.success("Room created! 🏠");
      router.push(`/editor/${room.id}`);
    } catch {
      toast.error("Could not create room");
    } finally {
      setCreatingRoom(false);
    }
  };

  const handleDeleteRoom = async (roomId: string) => {
    if (!confirm("Delete this room? This cannot be undone.")) return;
    setDeletingId(roomId);
    try {
      await deleteRoom(roomId);
      setRooms((prev) => prev.filter((r) => r.id !== roomId));
      toast.success("Room deleted");
    } catch {
      toast.error("Could not delete room");
    } finally {
      setDeletingId(null);
    }
  };

  // Auth loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl animate-float">🏠</div>
      </div>
    );
  }

  // Sign in screen
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#ffffff_0%,transparent_65%)] pointer-events-none" />
        <div className="absolute inset-0 bg-grid-pattern bg-grid-40 opacity-60 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 text-center max-w-md"
        >
          <div className="text-7xl mb-6 animate-float">🏠</div>
          <h1 className="font-display text-4xl font-bold text-cozy-dark mb-3">
            Welcome to Sticker Room
          </h1>
          <p className="text-cozy-muted mb-10">
            Sign in with Google to save your rooms and access them anywhere.
          </p>
          <button
            onClick={handleSignIn}
            className="flex items-center gap-3 mx-auto px-8 py-4 rounded-2xl bg-cozy-dark text-white font-medium shadow-strong hover:bg-primary hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="white"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="white"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="white"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="white"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>
          <Link
            href="/"
            className="block mt-5 text-sm text-cozy-muted hover:text-cozy-text transition-colors"
          >
            ← Back to home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 glass border-b border-cozy-border/40">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">🏠</span>
          <span className="font-display text-lg font-semibold text-cozy-dark">
            Sticker Room
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt={user.displayName || "User"}
              className="w-8 h-8 rounded-full border-2 border-cozy-border"
            />
          )}
          <span className="text-sm text-cozy-muted hidden sm:block">
            {user.displayName}
          </span>
          <button
            onClick={handleSignOut}
            className="p-2 rounded-xl hover:bg-accent transition-colors text-cozy-muted hover:text-cozy-dark"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-display text-3xl font-bold text-cozy-dark">
              My Rooms
            </h1>
            <p className="text-cozy-muted mt-1">
              {rooms.length === 0
                ? "Create your first room to get started"
                : `${rooms.length} room${rooms.length !== 1 ? "s" : ""}`}
            </p>
          </div>
          <button
            onClick={() => setShowNameModal(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-primary text-white font-medium shadow-glow hover:bg-primary-hover hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            New Room
          </button>
        </div>

        {/* Room grid */}
        {loadingRooms ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] rounded-3xl bg-cozy-card border border-cozy-border shimmer"
              />
            ))}
          </div>
        ) : rooms.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="text-7xl mb-6 animate-float">🏠</div>
            <h2 className="font-display text-2xl font-semibold text-cozy-dark mb-2">
              No rooms yet
            </h2>
            <p className="text-cozy-muted mb-8 max-w-xs">
              Create your first room and start decorating with stickers!
            </p>
            <button
              onClick={() => setShowNameModal(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-white font-medium shadow-glow hover:bg-primary-hover hover:scale-105 transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              Create First Room
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.07 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {rooms.map((room) => (
              <motion.div
                key={room.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="group relative bg-cozy-card rounded-3xl border border-cozy-border shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden hover:-translate-y-1 cursor-pointer"
                onClick={() => router.push(`/editor/${room.id}`)}
              >
                {/* Room preview */}
                <div
                  className="w-full aspect-[16/10] flex items-center justify-center relative overflow-hidden"
                  style={{ background: room.theme.backgroundColor }}
                >
                  {/* Floor */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1/4"
                    style={{ background: room.theme.floorColor }}
                  />
                  {/* Sticker preview */}
                  {room.stickers.slice(0, 6).map((sticker, i) => (
                    <div
                      key={sticker.id}
                      className="absolute text-3xl"
                      style={{
                        left: `${10 + (i % 3) * 30}%`,
                        top: `${20 + Math.floor(i / 3) * 35}%`,
                      }}
                    >
                      {sticker.emoji}
                    </div>
                  ))}
                  {room.stickers.length === 0 && (
                    <div className="text-4xl opacity-30">🏠</div>
                  )}
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-cozy-dark/0 group-hover:bg-cozy-dark/10 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 px-4 py-2 rounded-xl bg-white/90 text-cozy-dark text-sm font-medium shadow-soft">
                      <Edit3 className="w-3.5 h-3.5" />
                      Open Editor
                    </div>
                  </div>
                </div>

                {/* Room info */}
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{room.theme.emoji}</span>
                      <h3 className="font-medium text-cozy-dark text-sm">
                        {room.name}
                      </h3>
                    </div>
                    <p className="text-xs text-cozy-muted mt-0.5">
                      {room.stickers.length} sticker
                      {room.stickers.length !== 1 ? "s" : ""} ·{" "}
                      {formatDate(room.updatedAt)}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteRoom(room.id);
                    }}
                    disabled={deletingId === room.id}
                    className="p-2 rounded-xl opacity-0 group-hover:opacity-100 hover:bg-accent transition-all duration-200 text-cozy-muted hover:text-red-400"
                    title="Delete room"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      {/* New Room Modal */}
      <AnimatePresence>
        {showNameModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-cozy-dark/30 backdrop-blur-sm"
            onClick={() => setShowNameModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", bounce: 0.3 }}
              className="bg-cozy-card rounded-3xl p-8 shadow-strong border border-cozy-border max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-5xl mb-4 text-center">🏠</div>
              <h2 className="font-display text-2xl font-bold text-cozy-dark text-center mb-2">
                Name your room
              </h2>
              <p className="text-cozy-muted text-sm text-center mb-6">
                Give your new cozy space a name!
              </p>
              <input
                type="text"
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreateRoom()}
                placeholder="e.g. My Dream Room ✨"
                autoFocus
                maxLength={40}
                className="w-full px-4 py-3 rounded-2xl bg-background border border-cozy-border text-cozy-dark placeholder:text-cozy-muted focus:outline-none focus:border-primary transition-colors mb-4 text-sm"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setShowNameModal(false)}
                  className="flex-1 py-3 rounded-2xl border border-cozy-border text-cozy-muted hover:bg-background transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateRoom}
                  disabled={!newRoomName.trim() || creatingRoom}
                  className="flex-1 py-3 rounded-2xl bg-primary text-white font-medium shadow-glow hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm"
                >
                  {creatingRoom ? "Creating..." : "Create Room"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
