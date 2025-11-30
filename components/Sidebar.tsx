'use client'

import { Heading } from "@/lib/extractHeadings";
import { useSidebar } from "@/contexts/SidebarContext";

interface SidebarProps {
  headings: Heading[];
}

export default function Sidebar({ headings }: SidebarProps) {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <>
      {/* ハンバーガーメニューアイコン */}
      <button
        className="md:hidden fixed top-12 right-4 z-50 bg-blue-500 text-white p-2 rounded w-10 text-lg"
        onClick={toggleSidebar}
      >
        {isOpen ? "✗" : "☰"}
      </button>

      {/* PC用折りたたみボタン（スクロール追従・固定配置） */}
      <button
        className={`hidden md:block fixed ${isOpen ? 'left-[calc(25%-2rem)]' : 'left-8'} top-1/2 -translate-y-1/2 z-50 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded shadow-lg transition-all duration-300`}
        onClick={toggleSidebar}
        aria-label={isOpen ? 'サイドバーを閉じる' : 'サイドバーを開く'}
        aria-expanded={isOpen}
      >
        <span className="text-lg">{isOpen ? '◀' : '▶'}</span>
      </button>

      {/* サイドバー */}
      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 w-3/4 h-full bg-gray-800 bg-opacity-90 shadow-lg transform transition-all duration-300 z-40 
        md:static md:sticky md:top-0 md:translate-x-0 ${isOpen ? 'md:w-1/4 md:pr-8' : 'md:w-16 md:pr-2'} md:bg-transparent md:bg-opacity-100 md:block`}
      >
        <nav className={`sticky top-0 max-h-screen overflow-y-auto ${!isOpen ? 'md:hidden' : ''}`}>
          <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
          <ul className="space-y-2">
            {headings.map((heading) => (
              <li
                key={heading.id}
                style={{ marginLeft: `${(heading.level - 1) * 0.8}rem` }}
              >
                <a href={`#${heading.id}`} className="text-blue-300 hover:underline">
                  {heading.text}
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
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}
