'use client'

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";

export default function TipsPage() {
  const [articles, setArticles] = useState<{ title: string; slug: string }[]>([]);

  useEffect(() => {
    // JSONファイルから記事データをフェッチ
    fetch("/content/study-note-articles.json")
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, []);

  return (
    <>
      <title>Study Note</title>
      <div className="flex w-full flex-col items-center p-12">
        <h1 className="text-4xl font-bold mb-8">Study Note</h1>
        <LinkCard
          href="study-note/architecture"
          title="Architecture"
          description="Study about architecture"
        />
        <LinkCard
          href="study-note/word"
          title="Word"
          description="Study word"
        />
        <LinkCard
          href="study-note/network"
          title="Network"
          description="Study about network"
        />
        <LinkCard
          href="study-note/security"
          title="Security"
          description="Study about security"
        />
      </div>
    </>
  );
}
