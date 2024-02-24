"use client";
import { MathJaxContext } from "better-react-mathjax";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = {
    loader: { load: ["input/asciimath"] },
  };
  return (
    <html lang="en">
      <body className={inter.className}>
        <MathJaxContext config={config}>{children}</MathJaxContext>
      </body>
    </html>
  );
}
