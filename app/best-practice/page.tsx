import path from "path";
import List from "@/components/List";
import { getArticles } from "@/lib/getArticles";

export default function BestPracticePage() {
  const articlesDirectory = path.join(process.cwd(), "content", "best-practice");
  const articles = getArticles(articlesDirectory);

  const listItems = articles.map((article) => ({
    title: article.title,
    href: `/best-practice/${article.slug}`,
  }));

  return (
    <>
      <title>Best Practice</title>
      <div className="flex w-full flex-col items-center p-12">
        <h1 className="text-4xl font-bold mb-8">Best Practice</h1>
        <List items={listItems} />
      </div>
    </>
  );
}
