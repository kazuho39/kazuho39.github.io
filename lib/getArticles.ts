import fs from "fs";
import path from "path";
import { Article } from "@/types/Article";

export function getArticles(directory: string): Article[] {
  const filenames = fs.readdirSync(directory);

  return filenames
    .filter((filename) => filename.endsWith(".md")) // .md拡張子のファイルのみを対象にする
    .map((filename) => {
      const filePath = path.join(directory, filename);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const titleMatch = fileContent.match(/^#\s(.+)/); // Extract the first Markdown heading as the title
      const title = titleMatch ? titleMatch[1] : "Untitled";
      const slug = filename.replace(/\.md$/, ""); // Remove the .md extension
      return { title, slug };
    });
}
