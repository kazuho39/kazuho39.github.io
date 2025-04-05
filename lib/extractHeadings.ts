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
      const id = text
        .toLowerCase()  // テキストを小文字に変換
        .replace(/\s+/g, "-") // 連続する空白をハイフンに置き換え
        .replace(/、|「|」|・/g, "") //「、」を削除
        .replace(/[^a-z0-9\u3040-\u30FF\u4E00-\u9FFF\-_\s]/g, "") // 許可されていない文字を削除
        .replace(/\(|\)|\:|\//g, ""); // 丸括弧,コロン,スラッシュを削除
      headings.push({ text, id, level: node.depth });
    });
  });
  processor.processSync(markdownContent);
  return headings;
}
