import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import PantryModal from "@/components/modals/pantry-modal";
import ConfirmModal from "@/components/modals/receipe-modal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pantry",
  description: "Pantry App"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>

        <PantryModal />
        <ConfirmModal />
        <Toaster />
      </body>
    </html>
  );
}
