'use client'

import { useEffect, useState } from "react";
import SearchableList from "@/components/SearchableList";
import HeaderMenu from "@/components/HeaderMenu";

export default function SlidePage() {
  const [articles, setArticles] = useState<{ title: string; slug: string }[]>([]);

  useEffect(() => {
    // JSONファイルから記事データをフェッチ
    fetch("/content/slide-articles.json")
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, []);

  return (
    <>
      <title>スライド</title>
      <HeaderMenu />
      <div className="flex w-full flex-col items-center p-12">
        <h1 className="text-4xl font-bold mb-8">スライド一覧</h1>
        <SearchableList articles={articles} path="/slide" />
      </div>
    </>
  );
}
