import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "スライド表示 | 学習メモ",
  description: "プレゼンテーションスライド表示ページ",
};

export default function SlideDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // html/bodyタグを再定義せず、ルートレイアウトのものを使用
  return (
    // スライド表示専用のコンテナ
    <div className="slide-container h-screen w-screen overflow-hidden m-0 p-0">
      {children}
    </div>
  );
}
