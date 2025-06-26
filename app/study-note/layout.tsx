import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import HeaderMenu from "@/components/HeaderMenu";

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
      <div className="slide-container h-screen w-screen overflow-hidden m-0 p-0">
        {children}
      </div>
    </>
  );
}
