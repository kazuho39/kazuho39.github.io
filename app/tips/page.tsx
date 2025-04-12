'use client'

import { useEffect, useState } from "react";
import SearchableList from "@/components/SearchableList";

export default function TipsPage() {
  const [articles, setArticles] = useState<{ title: string; slug: string }[]>([]);

  useEffect(() => {
    // JSONファイルから記事データをフェッチ
    fetch("/content/tips-articles.json")
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, []);

  return (
    <>
      <title>Tips</title>
      <div className="flex w-full flex-col items-center p-12">
        <h1 className="text-4xl font-bold mb-8">Tips</h1>
        <SearchableList articles={articles} path="/tips" />
      </div>
    </>
  );
}
