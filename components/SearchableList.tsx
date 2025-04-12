'use client'

import { useState } from "react";
import List from "@/components/List";

interface Article {
  title: string;
  slug: string;
}

interface SearchableListProps {
  articles: Article[];
  path: string; // ベースパスを指定
}

export default function SearchableList({ articles, path }: SearchableListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // 検索クエリに基づいて記事をフィルタリング
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const listItems = filteredArticles.map((article) => ({
    title: article.title,
    href: `${path}/${article.slug}`, // pathを使用して動的に生成
  }));

  return (
    <div className="flex w-full flex-col items-center">
      <input
        type="text"
        placeholder="Search articles..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded text-black"
      />
      <List items={listItems} />
    </div>
  );
}
