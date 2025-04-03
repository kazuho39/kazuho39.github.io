import { remark } from "remark";
import html from "remark-html";
import { visit } from "unist-util-visit";

export async function markdownToHtml(markdownContent: string): Promise<string> {
  const processedContent = await remark()
    .use(html, { sanitize: false }) // Allow custom attributes like id
    .use(() => (tree) => {
      visit(tree, (node: any) => {
        if (node.type === "heading") {
          const text = node.children.map((child: any) => child.value).join("");
          const id = text.toLowerCase().replace(/\s+/g, "-");
          //const sizeClass =
          //  node.depth === 1
          //    ? "text-4xl"
          //    : node.depth === 2
          //    ? "text-3xl"
          //    : node.depth === 3
          //    ? "text-2xl"
          //    : "text-xl"; // Ensure h3 is smaller than h2
          node.data = {
            hProperties: {
              id,
              className: `font-bold mt-4`,
            },
          };
        } else if (node.type === "paragraph") {
          node.data = {
            hProperties: {
              className: "text-base mb-4",
            },
          };
        } else if (node.type === "list") {
          node.data = {
            hProperties: {
              className: "list-disc list-inside mb-4",
            },
          };
        } else if (node.type === "listItem") {
          node.data = {
            hProperties: {
              className: "relative pl-6 mb-2",
            },
          };
          node.children.unshift({
            type: "html",
            value: '<span class="absolute left-0 text-gray-500">・</span>',
          });
        } else if (node.type === "code") {
          node.data = {
            hProperties: {
              className: "bg-gray-100 p-4 rounded text-sm font-mono",
            },
          };
        }
      });
    })
    .process(markdownContent);
  return processedContent.toString();
}
