import path from "path";
import List from "@/components/List";
import { getArticles } from "@/lib/getArticles";

export default function TipsPage() {
  const articlesDirectory = path.join(process.cwd(), "content", "tips");
  const articles = getArticles(articlesDirectory);

  const listItems = articles.map((article) => ({
    title: article.title,
    href: `/tips/${article.slug}`,
  }));

  return (
    <>
      <title>Tips</title>
      <div className="flex w-full flex-col items-center p-12">
        <h1 className="text-4xl font-bold mb-8">Tips</h1>
        <List items={listItems} />
      </div>
    </>
  );
}
