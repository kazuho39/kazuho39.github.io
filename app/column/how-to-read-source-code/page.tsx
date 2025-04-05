import fs from "fs";
import path from "path";
import { extractHeadings, Heading } from "@/lib/extractHeadings";
import { markdownToHtml } from "@/lib/markdownToHtml";
import LayoutMarkdownWithSidebar from "@/components/LayoutMarkdownWithSidebar";

export default async function CommandLineCheatsheetPage() {
  const markdownFilePath = path.join(process.cwd(), "content", "column", "how-to-read-source-code.md");
  const markdownContent = fs.readFileSync(markdownFilePath, "utf8");

  // Extract headings
  const headings: Heading[] = extractHeadings(markdownContent);

  // Convert Markdown to HTML
  const contentHtml = await markdownToHtml(markdownContent);

  return (
    <>
      <title>Command Line Cheatsheet</title>
      <LayoutMarkdownWithSidebar headings={headings} contentHtml={contentHtml} />
    </>
  );
}
