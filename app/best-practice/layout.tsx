import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import HeaderMenu from "@/components/HeaderMenu";
import { SidebarProvider } from "@/contexts/SidebarContext";

const inter = Inter({ subsets: ["latin"] });

export default function SlideDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // html/bodyタグを再定義せず、ルートレイアウトのものを使用
  return (
    <>
      <HeaderMenu />
      <SidebarProvider>
        {children}
      </SidebarProvider>
    </>
  );
}
