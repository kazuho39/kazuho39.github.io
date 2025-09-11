import fs from "fs";
import path from "path";
import { extractHeadings, Heading } from "@/lib/extractHeadings";
import { markdownToHtml } from "@/lib/markdownToHtml";
import LayoutMarkdownWithSidebar from "@/components/LayoutMarkdownWithSidebar";

export default async function Page() {
  const markdownFileName = "cloudfront";
  const markdownFilePath = path.join(process.cwd(), "content", "aws", "storage-delivery", markdownFileName + ".md");
  const markdownContent = fs.readFileSync(markdownFilePath, "utf8");

  // Extract headings
  const headings: Heading[] = extractHeadings(markdownContent);

  // Convert Markdown to HTML
  const contentHtml = await markdownToHtml(markdownContent);

  return (
    <>
      <title>{markdownFileName}</title>
      <LayoutMarkdownWithSidebar headings={headings} contentHtml={contentHtml} />
    </>
  );
}
