import fs from "fs";
import path from "path";
import { extractHeadings, Heading } from "@/lib/extractHeadings";
import { markdownToHtml } from "@/lib/markdownToHtml";
import LayoutMarkdownWithSidebar from "@/components/LayoutMarkdownWithSidebar";

export default async function LaravelDirectoryStructurePage() {
  const markdownFilePath = path.join(process.cwd(), "content", "study-note/architecture", "null-object.md");
  const markdownContent = fs.readFileSync(markdownFilePath, "utf8");

  // Extract headings
  const headings: Heading[] = extractHeadings(markdownContent);

  // Convert Markdown to HTML
  const contentHtml = await markdownToHtml(markdownContent);

  return (
    <>
      <title>Null Object</title>
      <LayoutMarkdownWithSidebar headings={headings} contentHtml={contentHtml} />
    </>
  );
}
