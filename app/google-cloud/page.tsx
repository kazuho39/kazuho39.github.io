'use client'

import { useEffect, useState } from "react";
import SearchableList from "@/components/SearchableList";
import LinkCard from "@/components/LinkCard";

export default function BestPracticePage() {
  const [articles, setArticles] = useState<{ title: string; slug: string }[]>([]);

  useEffect(() => {
    // JSONファイルから記事データをフェッチ
    fetch("/content/google-cloud-articles.json")
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, []);

  return (
    <>
      <title>Google Cloud Platform</title>
      <div className="flex w-full flex-col items-center p-12">
        <h1 className="text-4xl font-bold mb-8">Google Cloud Platform</h1>
        <div className="flex w-full justify-center mb-8">
          <LinkCard
            href="google-cloud/gcp"
            title="GCP"
            description="Study about GCP"
          />
        </div>
        <SearchableList articles={articles} path="/google-cloud" />
      </div>
    </>
  );
}
