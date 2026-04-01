// FILE: /app/layout.tsx

import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Sticker Room — Design Your Dream Space",
  description:
    "Place stickers, decorate rooms, and create your cozy dream space. A playful room design tool with drag-and-drop stickers.",
  keywords: ["stickers", "room design", "decoration", "cozy", "creative"],
  openGraph: {
    title: "Sticker Room",
    description: "Design your dream cozy room with stickers!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#FFF8F3",
              color: "#6B4F4F",
              border: "1px solid #EDE0D8",
              borderRadius: "16px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
              boxShadow: "0 8px 32px rgba(107, 79, 79, 0.12)",
            },
            success: {
              iconTheme: {
                primary: "#C8E6C9",
                secondary: "#4E3B3B",
              },
            },
            error: {
              iconTheme: {
                primary: "#FADADD",
                secondary: "#4E3B3B",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
