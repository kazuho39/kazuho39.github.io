import fs from "fs";
import path from "path";
import List from "@/components/List";
import { Article } from "@/types/Article";

export default function BestPracticePage() {
  const articlesDirectory = path.join(process.cwd(), "content", "best-practice");
  const filenames = fs.readdirSync(articlesDirectory);

  const articles: Article[] = filenames.map((filename) => {
    const filePath = path.join(articlesDirectory, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const titleMatch = fileContent.match(/^#\s(.+)/); // Extract the first Markdown heading as the title
    const title = titleMatch ? titleMatch[1] : "Untitled";
    const slug = filename.replace(/\.md$/, ""); // Remove the .md extension
    return { title, slug };
  });

  const listItems = articles.map((article) => ({
    title: article.title,
    href: `/best-practice/${article.slug}`,
  }));

  return (
    <div className="flex w-full flex-col items-center p-12">
      <h1 className="text-4xl font-bold mb-8">Best Practice</h1>
      <List items={listItems} />
    </div>
  );
}
