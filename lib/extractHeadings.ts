import { remark } from "remark";
import { visit } from "unist-util-visit";

export interface Heading {
  text: string;
  id: string;
  level: number;
}

export function extractHeadings(markdownContent: string): Heading[] {
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
