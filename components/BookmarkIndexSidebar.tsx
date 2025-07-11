'use client'

import React, { useState } from "react";

type Props = {
  categories: { category: string; id: string }[];
};

/**
 * ブックマークページ用 目次サイドバー
 * カテゴリ一覧をアンカーリンクで表示
 * 記事ページのSidebarコンポーネントと統一感のあるスタイル
 */
const BookmarkIndexSidebar: React.FC<Props> = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* ハンバーガーメニューアイコン */}
      <button
        className="md:hidden fixed top-12 right-4 z-50 bg-blue-500 text-white p-2 rounded w-10 text-lg"
        onClick={toggleMenu}
      >
        {isOpen ? "✗" : "☰"}
      </button>

      {/* サイドバー */}
      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 w-3/4 h-full bg-gray-800 bg-opacity-90 shadow-lg transform transition-transform duration-300 z-40 md:static md:sticky md:top-0 md:translate-x-0 md:w-full md:bg-transparent md:bg-opacity-100 md:block`}
      >
        <nav className="sticky top-0 max-h-screen overflow-y-auto p-4 pt-24 md:p-0 md:pt-0">
          <h2 className="text-lg font-bold mb-3">カテゴリ一覧</h2>
          <ul className="space-y-1">
            {categories.map((cat) => (
              <li key={cat.id}>
                <a
                  href={`#${cat.id}`}
                  className="text-blue-300 hover:underline text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  {cat.category}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* 背景のオーバーレイ（メニューが開いているときのみ表示） */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
};

export default BookmarkIndexSidebar;
