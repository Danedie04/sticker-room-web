# 🏠 Sticker Room Web

A production-ready cozy room decoration app built with Next.js 14, TypeScript, Tailwind CSS, Zustand, Framer Motion, and Firebase.

Place stickers, decorate rooms, save to the cloud, export as PNG — all wrapped in an Apple-inspired cinematic UI.

---

## ✨ Features

- 🎨 **Drag-and-drop canvas** — place, move, resize, rotate stickers freely
- 🏠 **8 room themes** — cozy beige, lavender, mint, blush, sky, sunshine, peach, sage
- 🐱 **60+ stickers** — plants, decor, pets, furniture, food, misc
- ☁️ **Cloud sync** — Firebase Firestore auto-save every 3 seconds
- ↩️ **Undo / Redo** — full history stack (50 levels)
- 📸 **Export as PNG** — high-resolution 2x canvas export
- 🔒 **Google Auth** — secure sign-in, session persistence
- 🔊 **Sound system** — satisfying peel & drop sounds
- 📐 **Snap to grid** — optional 20px grid alignment
- 🔢 **Layer control** — z-index management per sticker
- ⌨️ **Keyboard shortcuts** — ⌘Z undo, ⌘D duplicate, Delete, [ ], Escape

---

## 🗂 Project Structure

```
sticker-room-web/
├── app/
│   ├── layout.tsx              # Root layout, fonts, toaster
│   ├── page.tsx                # Landing page (cinematic Apple-style)
│   ├── dashboard/
│   │   └── page.tsx            # User rooms dashboard
│   └── editor/
│       └── [roomId]/
│           └── page.tsx        # Editor page
├── components/
│   ├── canvas/
│   │   ├── EditorToolbar.tsx   # Top toolbar (save, export, undo, etc.)
│   │   ├── RoomCanvas.tsx      # Main drag-drop canvas
│   │   ├── StickerControls.tsx # Right panel: selected sticker controls
│   │   └── ThemePanel.tsx      # Right panel: room theme picker
│   ├── layout/
│   │   └── EditorLayout.tsx    # Editor shell layout
│   ├── stickers/
│   │   ├── StickerPanel.tsx    # Left panel: sticker browser
│   │   └── StickerItem.tsx     # Individual draggable sticker
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Modal.tsx
│       ├── Tooltip.tsx
│       └── LoadingSpinner.tsx
├── firebase/
│   ├── config.ts               # Firebase app initialization
│   ├── auth.ts                 # Google auth helpers
│   └── firestore.ts            # Room CRUD operations
├── hooks/
│   ├── useAuth.ts              # Auth state listener
│   ├── useAutoSave.ts          # Debounced auto-save to Firestore
│   └── useKeyboardShortcuts.ts # Global keyboard bindings
├── lib/
│   ├── stickers.ts             # Sticker catalog (60+ stickers)
│   ├── themes.ts               # Room theme definitions
│   ├── sounds.ts               # Web Audio API sound manager
│   └── utils.ts                # Utilities (cn, snapToGrid, export)
├── store/
│   ├── roomStore.ts            # Zustand: room state + history
│   └── authStore.ts            # Zustand: auth state
├── styles/
│   └── globals.css             # Tailwind + custom animations
├── types/
│   └── index.ts                # TypeScript type definitions
├── public/
│   └── stickers/               # Optional custom sticker PNGs
├── .env.example
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🚀 Setup Guide

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/yourname/sticker-room-web.git
cd sticker-room-web

npm install
# or
yarn install
# or
pnpm install
```

### 2. Set Up Firebase

#### a) Create a Firebase Project
1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Click **"Add project"** → name it (e.g. `sticker-room`)
3. Disable Google Analytics (optional) → **Create project**

#### b) Enable Authentication
1. In Firebase console → **Authentication** → **Get started**
2. Under **Sign-in method** → enable **Google**
3. Add your app domain to **Authorized domains** (e.g. `localhost`, your Vercel URL)

#### c) Create Firestore Database
1. Firebase console → **Firestore Database** → **Create database**
2. Choose **Production mode** → select a region → **Done**
3. Go to **Rules** tab and paste:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /rooms/{roomId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

4. Click **Publish**

#### d) Create Firestore Indexes
In Firestore → **Indexes** → **Composite** → Add index:
- Collection: `rooms`
- Fields: `userId` (Ascending), `updatedAt` (Descending)

#### e) Get Firebase Config
1. Firebase console → **Project Settings** (gear icon) → **General**
2. Scroll to **"Your apps"** → click **"</>"** (Web)
3. Register app → copy the `firebaseConfig` object

### 3. Configure Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Firebase values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## ☁️ Deploy to Vercel

### Option A: Vercel CLI (Recommended)

```bash
npm install -g vercel
vercel

# Follow prompts, then set env vars:
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID
vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
vercel env add NEXT_PUBLIC_FIREBASE_APP_ID
vercel env add NEXT_PUBLIC_APP_URL

# Deploy to production
vercel --prod
```

### Option B: Vercel Dashboard

1. Push code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Add all `NEXT_PUBLIC_FIREBASE_*` environment variables
5. Click **Deploy**

### After Deployment

Add your Vercel URL to Firebase:
- Firebase console → **Authentication** → **Settings** → **Authorized domains**
- Add: `your-app.vercel.app`

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `⌘Z` / `Ctrl+Z` | Undo |
| `⌘⇧Z` / `Ctrl+Y` | Redo |
| `⌘D` / `Ctrl+D` | Duplicate selected sticker |
| `Delete` / `Backspace` | Delete selected sticker |
| `Escape` | Deselect |
| `[` | Send sticker backward |
| `]` | Bring sticker forward |

---

## 🛠 Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| Next.js | 14.2.5 | App Router, SSR |
| TypeScript | 5.5 | Type safety |
| Tailwind CSS | 3.4 | Styling |
| Framer Motion | 11 | Animations |
| Zustand | 4.5 | State management |
| Firebase | 10.12 | Auth + Firestore |
| react-rnd | 10.4 | Drag/resize |
| html2canvas | 1.4 | PNG export |
| react-hot-toast | 2.4 | Notifications |
| lucide-react | 0.417 | Icons |

---

## 🧩 Extending the App

### Add More Stickers
Edit `/lib/stickers.ts` — add entries to `STICKER_CATALOG`:
```ts
{ id: "plant_99", name: "Bonsai", emoji: "🌳", category: "plants", width: 80, height: 100 },
```

### Add More Themes
Edit `/lib/themes.ts` — add entries to `ROOM_THEMES`:
```ts
{
  id: "ocean",
  name: "Ocean Breeze",
  wallColor: "#E0F4FF",
  floorColor: "#B8DFF5",
  backgroundColor: "#EBF9FF",
  emoji: "🌊",
}
```

### Custom Sound Effects
Edit `/lib/sounds.ts` and replace the Web Audio API tones with actual audio files using `new Audio()`.

---

## 📄 License

MIT — use freely for personal and commercial projects.

---

Made with ❤️ and lots of stickers 🌸
