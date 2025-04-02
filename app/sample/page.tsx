import fs from "fs";
import path from "path";
import { remark } from "remark";
import html from "remark-html";
import { visit } from "unist-util-visit";

interface Heading {
  text: string;
  id: string;
  level: number;
}

function extractHeadings(markdownContent: string): Heading[] {
  const headings: Heading[] = [];
  const processor = remark().use(() => (tree) => {
    visit(tree, "heading", (node: any) => {
      const text = node.children.map((child: any) => child.value).join("");
      const id = text.toLowerCase().replace(/\s+/g, "-");
      headings.push({ text, id, level: node.depth });
    });
  });
  processor.processSync(markdownContent);
  return headings;
}

export default async function SamplePage() {
  const markdownFilePath = path.join(process.cwd(), "content", "sample.md");
  const markdownContent = fs.readFileSync(markdownFilePath, "utf8");

  // Extract headings
  const headings = extractHeadings(markdownContent);

  // Convert Markdown to HTML with IDs for headings
  const processedContent = await remark()
    .use(html, { sanitize: false }) // Allow custom attributes like id
    .use(() => (tree) => {
      visit(tree, "heading", (node: any) => {
        const text = node.children.map((child: any) => child.value).join("");
        const id = text.toLowerCase().replace(/\s+/g, "-");
        node.data = {
          hProperties: { id }, // Add id attribute to heading
        };
      });
    })
    .process(markdownContent);
  const contentHtml = processedContent.toString();

  return (
    <main className="flex min-h-screen flex-row p-24">
      {/* Sidebar for headings */}
      <aside className="w-1/4 pr-8">
        <nav className="sticky top-0">
          <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
          <ul className="space-y-2">
            {headings.map((heading) => (
              <li key={heading.id} className={`ml-${heading.level * 2}`}>
                <a href={`#${heading.id}`} className="text-blue-500 hover:underline">
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="markdown w-3/4">
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </div>
    </main>
  );
}
