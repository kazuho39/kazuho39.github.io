'use client'

import { useEffect, useState } from "react";
import SearchableList from "@/components/SearchableList";

export default function ColumnPage() {
  const [articles, setArticles] = useState<{ title: string; slug: string }[]>([]);

  useEffect(() => {
    // JSONファイルから記事データをフェッチ
    fetch("/content/column-articles.json")
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, []);

  return (
    <>
      <title>Column</title>
      <div className="flex w-full flex-col items-center p-12">
        <h1 className="text-4xl font-bold mb-8">Column</h1>
        <SearchableList articles={articles} path="/column" />
      </div>
    </>
  );
}
