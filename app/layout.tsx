import type { Metadata } from "next";
import "../globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "Polymarket Tracker",
  description: "Track Polymarket traders and get notified on their trades",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
