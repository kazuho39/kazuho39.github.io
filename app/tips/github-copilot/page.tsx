import fs from "fs";
import path from "path";
import { extractHeadings, Heading } from "@/lib/extractHeadings";
import { markdownToHtml } from "@/lib/markdownToHtml";
import LayoutMarkdownWithSidebar from "@/components/LayoutMarkdownWithSidebar";

export default async function GitCommandCheatsheetPage() {
  const markdownFilePath = path.join(process.cwd(), "content", "tips", "github-copilot.md");
  const markdownContent = fs.readFileSync(markdownFilePath, "utf8");

  // Extract headings
  const headings: Heading[] = extractHeadings(markdownContent);

  // Convert Markdown to HTML
  const contentHtml = await markdownToHtml(markdownContent);

  return (
    <>
      <title>github-copilot</title>
      <LayoutMarkdownWithSidebar headings={headings} contentHtml={contentHtml} />
    </>
  );
}
