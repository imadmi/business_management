'use client';
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider, User } from "./UserContext";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <html lang="en">
      <AppProvider>
        <body className={inter.className}>{children}</body>
      </AppProvider>
    </html>
  );
}
