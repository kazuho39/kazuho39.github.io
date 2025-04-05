import path from "path";
import List from "@/components/List";
import { getArticles } from "@/lib/getArticles";

export default function TipsPage() {
  const articlesDirectory = path.join(process.cwd(), "content", "column");
  const articles = getArticles(articlesDirectory);

  const listItems = articles.map((article) => ({
    title: article.title,
    href: `/column/${article.slug}`,
  }));

  return (
    <>
      <title>Column</title>
      <div className="flex w-full flex-col items-center p-12">
        <h1 className="text-4xl font-bold mb-8">Column</h1>
        <List items={listItems} />
      </div>
    </>
  );
}
