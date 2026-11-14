import type { Metadata } from "next";
import { Inter, Mrs_Saint_Delafield } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Handwriting, only for the signature / name in the reward previews
const script = Mrs_Saint_Delafield({
  variable: "--font-saint",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Campus Ambassador Program | Catalyst by upGrad School of Technology",
  description:
    "Bring the tech industry's know-how to your campus. Host live sessions with industry experts and Vishwa Mohan, and win exciting rewards. Register in 2 minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${script.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
