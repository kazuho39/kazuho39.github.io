import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm'
import { visit } from 'unist-util-visit';
import type { Node } from 'unist';

import bash from 'highlight.js/lib/languages/bash';
import php from 'highlight.js/lib/languages/php';
import json from 'highlight.js/lib/languages/json';

function remarkRemovePublicPath() {
  return (tree: Node) => {
    visit(tree, 'image', (node: any) => {
      if (node.url && typeof node.url === 'string' && node.url.startsWith('../../public')) {
        node.url = node.url.replace('../../public', '');
      }
    });
  };
}

function rehypeInlineCodeClass() {
  return (tree: Node) => {
    visit(tree, 'element', (node: any) => {
      if (node.tagName === 'code' && !node.properties?.className) {
        node.properties = node.properties || {};
        node.properties.className = ['inline-code']; // クラス名を指定
      }
    });
  };
}

export async function markdownToHtml(markdownContent: string): Promise<string> {
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRemovePublicPath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeHighlight, {languages: {bash, php, json}})
    .use(rehypeInlineCodeClass)
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdownContent);
  return processedContent.toString();
}
