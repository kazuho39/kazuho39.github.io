'use client'

import { useEffect, useState } from "react";
import SearchableList from "@/components/SearchableList";

export default function TipsPage() {
  const [articles, setArticles] = useState<{ title: string; slug: string }[]>([]);

  useEffect(() => {
    // JSONファイルから記事データをフェッチ
    fetch("/content/study-note/architecture-word.json")
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, []);

  return (
    <>
      <title>Study Note</title>
      <div className="flex w-full flex-col items-center p-12">
        <h1 className="text-4xl font-bold mb-8">Study Note - Word</h1>
        <SearchableList articles={articles} path="/study-note/word" />
      </div>
    </>
  );
}
