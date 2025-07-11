import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import HeaderMenu from "@/components/HeaderMenu";

const inter = Inter({ subsets: ["latin"] });

export default function BookmarkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // html/bodyタグを再定義せず、ルートレイアウトのものを使用
  return (
    <>
      <HeaderMenu />
      {children}
    </>
  );
}
