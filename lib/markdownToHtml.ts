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

// コードブロックにコピーボタンを追加するrehypeプラグイン
function rehypeAddCopyButton() {
  return (tree: Node) => {
    visit(tree, 'element', (node: any) => {
      // <pre> 内の <code> を探す（コードブロック）
      if (node.tagName === 'pre') {
        const codeNode = node.children?.find(
          (child: any) => child.tagName === 'code'
        );
        
        if (codeNode) {
          // コードの内容を取得
          const codeText = extractTextFromNode(codeNode);
          
          // ボタン要素を追加
          node.children.unshift({
            type: 'element',
            tagName: 'button',
            properties: {
              className: ['copy-button'],
              'data-code': codeText,
              'aria-label': 'Copy code to clipboard',
              type: 'button',
            },
            children: [
              {
                type: 'element',
                tagName: 'span',
                properties: { className: ['copy-icon'] },
                children: [{ type: 'text', value: '📋' }],
              },
            ],
          });
          
          // pre要素にクラスを追加
          node.properties = node.properties || {};
          node.properties.className = [
            ...(Array.isArray(node.properties.className) ? node.properties.className : []),
            'code-block-with-copy',
          ];
        }
      }
    });
  };
}

// ヘルパー関数:ノードからテキストを再帰的に抽出
function extractTextFromNode(node: any): string {
  if (node.type === 'text') return node.value;
  if (node.children) {
    return node.children.map(extractTextFromNode).join('');
  }
  return '';
}

// テーブルをスクロール可能なdivで囲むrehypeプラグイン
function rehypeWrapTable() {
  return (tree: Node) => {
    visit(tree, 'element', (node: any, index: number, parent: any) => {
      if (node.tagName === 'table' && parent) {
        // テーブルをdivで囲む
        const wrapper = {
          type: 'element',
          tagName: 'div',
          properties: {
            className: ['table-wrapper'],
          },
          children: [node],
        };
        
        // 親ノードの中で置き換え
        parent.children[index] = wrapper;
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
    .use(rehypeAddCopyButton) // コピーボタンプラグインを追加
    .use(rehypeWrapTable) // テーブルラッププラグインを追加
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdownContent);
  return processedContent.toString();
}
