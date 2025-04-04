import fs from "fs";
import path from "path";
import { extractHeadings, Heading } from "@/lib/extractHeadings";
import { markdownToHtml } from "@/lib/markdownToHtml";
import Sidebar from "@/components/Sidebar";

export default async function CommandLineCheatsheetPage() {
  const markdownFilePath = path.join(process.cwd(), "content", "tips", "command-line-cheatsheet.md");
  const markdownContent = fs.readFileSync(markdownFilePath, "utf8");

  // Extract headings
  const headings: Heading[] = extractHeadings(markdownContent);

  // Convert Markdown to HTML
  const contentHtml = await markdownToHtml(markdownContent);

  return (
    <>
      <title>Command Line Cheatsheet</title>
      <div className="flex w-full flex-row p-4 md:p-12">
        {/* Sidebar for headings */}
        <Sidebar headings={headings} />

        {/* Main content */}
        <div className="markdown w-full md:w-3/4">
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
      </div>
    </>
  );
}
