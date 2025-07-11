import type { Metadata } from "next";
import PageTitle from "@/components/PageTitle";
import bookmarksData from "@/content/bookmark/bookmarks.json";
import Link from "next/link";
import BookmarkIndexSidebar from "@/components/BookmarkIndexSidebar";

type Bookmark = {
  title: string;
  url: string;
  description: string;
};
type BookmarkCategory = {
  category: string;
  bookmarks: Bookmark[];
};

export const metadata: Metadata = {
  title: "ブックマーク",
  description: "よく使う・参考になるサイトのリンク集ページです。",
};

export default function BookmarkPage() {
  const categories = bookmarksData as BookmarkCategory[];
  
  // カテゴリ名をIDとして使うためにサニタイズする関数
  const sanitizeId = (text: string): string => {
    return text.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '')
      .replace(/^-+|-+$/g, '');
  };
  
  // 目次用カテゴリ配列（IDをサニタイズ）
  const indexCategories = categories.map((cat) => ({ 
    category: cat.category,
    id: sanitizeId(cat.category) || `category-${Math.random().toString(36).substring(2, 9)}`
  }));
  
  return (
    <div className="flex w-full flex-row p-4 md:p-8">
      {/* サイドバー目次 (PC用) */}
      <div className="hidden md:block md:w-1/5 md:mr-6">
        <BookmarkIndexSidebar categories={indexCategories} />
      </div>
      
      {/* モバイル用サイドバー */}
      <div className="md:hidden">
        <BookmarkIndexSidebar categories={indexCategories} />
      </div>
      
      {/* メインコンテンツ */}
      <main className="w-full md:w-4/5">
        {categories.map((cat, index) => (
          <section 
            key={cat.category} 
            className="mb-8" 
            id={indexCategories[index].id}
          >
            <PageTitle title={cat.category} className="text-2xl md:text-3xl" />
            <ul className="flex flex-col gap-2 mt-2 pl-6 border-l-4 border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-gray-800/40 rounded-md py-3">
              {cat.bookmarks.map((bm) => (
                <li key={bm.url} className="">
                  <Link
                    href={bm.url}
                    className="block hover:underline text-blue-600 dark:text-blue-400 text-sm font-medium"
                    target="_blank" rel="noopener noreferrer"
                  >
                    {bm.title}
                  </Link>
                  <span className="text-gray-600 dark:text-gray-400 text-xs">{bm.description}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
    </div>
  );
}
