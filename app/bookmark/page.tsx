import type { Metadata } from "next";
import PageTitle from "@/components/PageTitle";
import bookmarksData from "@/content/bookmark/bookmarks.json";
import Link from "next/link";

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
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {categories.map((cat) => (
        <div key={cat.category} className="mb-8">
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
        </div>
      ))}
    </div>
  );
}
