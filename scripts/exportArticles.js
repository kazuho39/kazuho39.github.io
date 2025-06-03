const fs = require("fs");
const path = require("path");

const directories = [
  { input: "content/tips", output: "public/content/tips-articles.json" },
  { input: "content/best-practice", output: "public/content/best-practice-articles.json" },
  { input: "content/column", output: "public/content/column-articles.json" },
  { input: "content/study-note/architecture", output: "public/content/study-note/architecture-articles.json" },
  { input: "content/study-note/word", output: "public/content/study-note/word-articles.json" },
  { input: "content/study-note/network", output: "public/content/study-note/network-articles.json" },
];

function getArticles(directory) {
  const files = fs.readdirSync(directory);

  return files
    .filter((file) => file.endsWith(".md")) // Markdownファイルのみを対象
    .map((file) => {
      const filePath = path.join(directory, file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const titleMatch = fileContents.match(/^#\s(.+)/); // Extract the first Markdown heading as the title
      const title = titleMatch ? titleMatch[1] : "Untitled";

      return {
        title: title || "Untitled", // タイトルがない場合はデフォルト値
        slug: file.replace(/\.md$/, ""), // ファイル名をスラッグとして使用
      };
    });
}

directories.forEach(({ input, output }) => {
  const directoryPath = path.join(process.cwd(), input);
  const outputPath = path.join(process.cwd(), output);

  const articles = getArticles(directoryPath);

  // JSONファイルとしてエクスポート
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(articles, null, 2));

  console.log(`Articles exported to ${output}`);
});

