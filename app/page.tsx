// FILE: /app/page.tsx

"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Sparkles, ArrowRight, Layers, Download, Undo2 } from "lucide-react";

const FEATURES = [
  {
    icon: "🎨",
    title: "Drag & Drop Canvas",
    description:
      "Place stickers anywhere on your room canvas. Move, resize, and rotate with ease. Your creativity has no limits.",
  },
  {
    icon: "🏠",
    title: "Room Themes",
    description:
      "Choose from 8 beautiful room themes — from cozy beige to lavender dreams. Every space tells a story.",
  },
  {
    icon: "🐱",
    title: "60+ Stickers",
    description:
      "Plants, pets, furniture, food and more. A growing library of cute stickers waiting to decorate your world.",
  },
  {
    icon: "☁️",
    title: "Cloud Sync",
    description:
      "Your rooms are saved automatically. Sign in with Google and access your creations from anywhere.",
  },
  {
    icon: "↩️",
    title: "Undo / Redo",
    description:
      "Made a mistake? No worries. Full undo/redo history keeps your creative flow going without friction.",
  },
  {
    icon: "📸",
    title: "Export as PNG",
    description:
      "When your room is perfect, export it as a high-quality PNG. Share it, print it, frame it.",
  },
];

const STICKER_SHOWCASE = [
  { emoji: "🪴", delay: 0, x: -40, y: -60 },
  { emoji: "🐱", delay: 0.3, x: 60, y: -30 },
  { emoji: "🛋️", delay: 0.6, x: -60, y: 40 },
  { emoji: "🌸", delay: 0.9, x: 80, y: 60 },
  { emoji: "☕", delay: 1.2, x: -20, y: 80 },
  { emoji: "✨", delay: 1.5, x: 40, y: -80 },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof FEATURES)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="bg-cozy-card rounded-3xl p-7 border border-cozy-border shadow-soft hover:shadow-medium transition-all duration-300 group hover:-translate-y-1"
    >
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {feature.icon}
      </div>
      <h3 className="font-display text-xl font-semibold text-cozy-dark mb-2">
        {feature.title}
      </h3>
      <p className="text-cozy-muted text-sm leading-relaxed">{feature.description}</p>
    </motion.div>
  );
}

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* ── Nav ─────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 glass border-b border-cozy-border/40">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <span className="text-2xl">🏠</span>
          <span className="font-display text-lg font-semibold text-cozy-dark">
            Sticker Room
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <Link
            href="/dashboard"
            className="text-sm text-cozy-muted hover:text-cozy-text transition-colors px-4 py-2"
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard"
            className="text-sm px-5 py-2.5 rounded-2xl bg-primary text-white font-medium shadow-glow hover:bg-primary-hover hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Start Creating
          </Link>
        </motion.div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden pt-20"
        style={{ background: "#F6F1EB" }}
      >
        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#ffffff_0%,transparent_65%)]" />

        {/* Grid texture */}
        <div className="absolute inset-0 bg-grid-pattern bg-grid-40 opacity-60" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 px-6 max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-accent-hover text-cozy-text text-sm font-medium mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Design your cozy dream room
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(2.8rem,7vw,5.5rem)] font-bold text-cozy-dark leading-[1.1] tracking-tight mb-6"
          >
            Place. Play.
            <br />
            <span className="text-primary">Personalize.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="text-lg text-cozy-muted max-w-xl mx-auto leading-relaxed mb-10"
          >
            Create your perfect cozy room with drag-and-drop stickers. Decorate,
            save, and share your dreamy spaces with the world.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/dashboard"
              className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-cozy-dark text-white font-medium shadow-strong hover:bg-primary hover:scale-105 active:scale-95 transition-all duration-300 text-base"
            >
              Start Decorating
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#features"
              className="px-8 py-4 rounded-2xl bg-cozy-card border border-cozy-border text-cozy-text font-medium hover:shadow-soft hover:scale-105 active:scale-95 transition-all duration-300 text-base"
            >
              See Features
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating stickers around the hero */}
        <div className="absolute inset-0 pointer-events-none">
          {STICKER_SHOWCASE.map((sticker, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 1 + sticker.delay,
                duration: 0.5,
                type: "spring",
                bounce: 0.5,
              }}
              style={{
                position: "absolute",
                left: `calc(50% + ${sticker.x * 4}px)`,
                top: `calc(50% + ${sticker.y * 2}px)`,
                animation: `float ${6 + i}s ease-in-out ${i * 0.5}s infinite`,
              }}
              className="text-5xl md:text-6xl select-none"
            >
              {sticker.emoji}
            </motion.div>
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cozy-muted text-xs"
        >
          <span>Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-5 h-5 rounded-full border-2 border-cozy-border flex items-center justify-center"
          >
            <div className="w-1 h-1 rounded-full bg-cozy-muted" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Sticker strip ────────────────────────────────────────── */}
      <section className="py-6 bg-primary overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-6 whitespace-nowrap"
        >
          {[...Array(4)].map((_, row) =>
            ["🪴", "🐱", "🛋️", "🌸", "☕", "✨", "🎈", "🌵", "🐰", "🍵", "📚", "🎨"].map(
              (emoji, i) => (
                <span
                  key={`${row}-${i}`}
                  className="text-2xl opacity-80 inline-block"
                >
                  {emoji}
                </span>
              )
            )
          )}
        </motion.div>
      </section>

      {/* ── Features ────────────────────────────────────────────── */}
      <section id="features" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold text-cozy-dark mb-4"
            >
              Everything you need to
              <br />
              <span className="text-primary">create magic</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-cozy-muted max-w-md mx-auto"
            >
              Thoughtfully designed tools that feel as delightful as the rooms
              you create.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((feature, i) => (
              <FeatureCard key={i} feature={feature} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────────── */}
      <section className="py-28 px-6 bg-cozy-card">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold text-cozy-dark mb-4"
            >
              Three steps to cozy
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-px bg-cozy-border" />

            {[
              {
                step: "01",
                title: "Choose a room",
                desc: "Pick from beautiful room themes and give your space a name.",
                emoji: "🏠",
              },
              {
                step: "02",
                title: "Add stickers",
                desc: "Browse 60+ stickers and drag them onto your canvas. Resize, rotate, layer.",
                emoji: "🌿",
              },
              {
                step: "03",
                title: "Save & share",
                desc: "Your room auto-saves to the cloud. Export as PNG whenever you're ready.",
                emoji: "✨",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-3xl bg-background border border-cozy-border flex items-center justify-center text-4xl mb-5 shadow-soft">
                  {item.emoji}
                </div>
                <div className="text-xs font-medium text-primary mb-2 tracking-widest">
                  STEP {item.step}
                </div>
                <h3 className="font-display text-xl font-semibold text-cozy-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-cozy-muted text-sm leading-relaxed max-w-xs">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quick feature highlights ────────────────────────────── */}
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-bold text-cozy-dark mb-6 leading-tight">
              Powerful tools,
              <br />
              <span className="text-primary">playful experience</span>
            </h2>
            <div className="space-y-4">
              {[
                { icon: <Layers className="w-4 h-4" />, text: "Layer control — bring stickers forward or send back" },
                { icon: <Undo2 className="w-4 h-4" />, text: "Unlimited undo/redo history" },
                { icon: <Download className="w-4 h-4" />, text: "Export as high-resolution PNG" },
                { icon: <Sparkles className="w-4 h-4" />, text: "Snap-to-grid for perfect alignment" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-cozy-muted text-sm">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    {item.icon}
                  </div>
                  {item.text}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Mock room preview */}
            <div className="relative w-full aspect-square max-w-sm mx-auto">
              <div
                className="w-full h-full rounded-4xl shadow-strong border border-cozy-border overflow-hidden"
                style={{ background: "#FAF0E6" }}
              >
                {/* Room floor */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1/4 rounded-b-4xl"
                  style={{ background: "#E8DDD0" }}
                />
                {/* Scattered stickers */}
                {[
                  { emoji: "🛋️", top: "50%", left: "25%", size: "4rem" },
                  { emoji: "🪴", top: "30%", left: "65%", size: "3rem" },
                  { emoji: "☕", top: "55%", left: "55%", size: "2.5rem" },
                  { emoji: "📚", top: "30%", left: "15%", size: "3rem" },
                  { emoji: "🐱", top: "60%", left: "70%", size: "3rem" },
                  { emoji: "✨", top: "20%", left: "45%", size: "2rem" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="absolute animate-float"
                    style={{
                      top: s.top,
                      left: s.left,
                      fontSize: s.size,
                      animationDelay: `${i * 0.7}s`,
                      animationDuration: `${5 + i}s`,
                    }}
                  >
                    {s.emoji}
                  </div>
                ))}
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-4xl bg-primary opacity-10 blur-3xl -z-10 scale-110" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="py-28 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center bg-cozy-card rounded-4xl border border-cozy-border shadow-strong p-16 relative overflow-hidden"
        >
          {/* Background blobs */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary opacity-10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-secondary opacity-20 blur-3xl" />

          <div className="relative z-10">
            <div className="text-6xl mb-6">🏠</div>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold text-cozy-dark mb-4">
              Your room awaits
            </h2>
            <p className="text-cozy-muted mb-10 max-w-md mx-auto">
              Sign in with Google and start decorating your first room in
              seconds. It's free, it's cozy, it's yours.
            </p>
            <Link
              href="/dashboard"
              className="group inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-cozy-dark text-white font-medium shadow-strong hover:bg-primary hover:scale-105 active:scale-95 transition-all duration-300 text-base"
            >
              Start for free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="py-10 px-6 border-t border-cozy-border text-center">
        <div className="flex items-center justify-center gap-2 text-cozy-muted text-sm">
          <span>🏠</span>
          <span className="font-display font-semibold text-cozy-dark">Sticker Room</span>
          <span>— Made with ❤️ and stickers</span>
        </div>
      </footer>
    </main>
  );
}
