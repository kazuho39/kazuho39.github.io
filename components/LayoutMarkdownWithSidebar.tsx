'use client';

import React, { useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { Heading } from "@/lib/extractHeadings";

interface LayoutMarkdownWithSidebarProps {
  headings: Heading[];
  contentHtml: string;
}

const LayoutMarkdownWithSidebar: React.FC<LayoutMarkdownWithSidebarProps> = ({ headings, contentHtml }) => {
  useEffect(() => {
    // コピーボタンにイベントリスナーを登録
    const copyButtons = document.querySelectorAll('.copy-button');
    
    const handleCopy = async (event: Event) => {
      const button = event.currentTarget as HTMLButtonElement;
      const code = button.getAttribute('data-code');
      
      if (!code) return;
      
      try {
        await navigator.clipboard.writeText(code);
        
        // フィードバック: アイコンを📋→✅に変更
        const icon = button.querySelector('.copy-icon');
        if (icon) {
          const originalText = icon.textContent;
          icon.textContent = '✅';
          
          setTimeout(() => {
            icon.textContent = originalText;
          }, 2000);
        }
      } catch (err) {
        console.error('Failed to copy:', err);
        // フォールバック（古いブラウザ対応）
        fallbackCopy(code);
        
        // フォールバック成功時もフィードバックを表示
        const icon = button.querySelector('.copy-icon');
        if (icon) {
          const originalText = icon.textContent;
          icon.textContent = '✅';
          
          setTimeout(() => {
            icon.textContent = originalText;
          }, 2000);
        }
      }
    };
    
    copyButtons.forEach((btn) => {
      btn.addEventListener('click', handleCopy);
    });
    
    // クリーンアップ
    return () => {
      copyButtons.forEach((btn) => {
        btn.removeEventListener('click', handleCopy);
      });
    };
  }, [contentHtml]);
  
  return (
    <div className="flex w-full flex-row p-4 md:p-8">
      {/* Sidebar for headings */}
      <Sidebar headings={headings} />

      {/* Main content */}
      <div className="markdown w-full md:w-3/4">
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </div>
    </div>
  );
};

// フォールバック関数（古いブラウザ用）
function fallbackCopy(text: string) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Fallback copy failed:', err);
  }
  document.body.removeChild(textArea);
}

export default LayoutMarkdownWithSidebar;
