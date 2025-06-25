'use client'

import { useEffect, useRef } from 'react';

interface SlideViewProps {
  contentHtml: string;
}

export default function SlideView({ contentHtml }: SlideViewProps) {
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // クライアントサイドでのみReveal.jsをロード
    const loadReveal = async () => {
      if (typeof window !== 'undefined' && revealRef.current) {
        try {
          // CSSをロード
          await Promise.all([
            loadCSS('https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/reveal.css', 'reveal-css'),
            loadCSS('https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/theme/black.css', 'reveal-theme-css'),
            loadCSS('https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/plugin/highlight/monokai.css', 'reveal-highlight-css')
          ]);
          
          // Reveal.jsをインポート
          const RevealModule = await import('reveal.js');
          const Reveal = RevealModule.default;
          
          // @ts-ignore - TypeScriptの型エラーを無視
          const deck = new Reveal(revealRef.current);
          
          // シンプルに初期化
          deck.initialize({
            controls: true,
            progress: true,
            center: true,
            hash: true,
            transition: 'slide'
          });
        } catch (error) {
          console.error('Failed to load Reveal.js:', error);
        }
      }
    };
    
    loadReveal();
  }, [contentHtml]);
  
  // 単一のCSSファイルをロードするヘルパー関数
  const loadCSS = (href: string, id: string): Promise<void> => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && !document.getElementById(id)) {
        const link = document.createElement('link');
        link.id = id;
        link.rel = 'stylesheet';
        link.href = href;
        link.onload = () => resolve();
        document.head.appendChild(link);
      } else {
        resolve();
      }
    });
  };

  // スライドのセパレーターをもとにHTMLを生成
  const processSlideContent = (html: string): string => {
    // カスタムセパレータ '---' (HTMLでは<hr>)を検出してスライドを分割
    const slides = html.split('<hr>');
    
    // 最初のスライドが確実に表示されるようにdata-visibility="visible"を追加
    if (slides.length > 0) {
      return slides
        .map((slide, index) => 
          index === 0 
            ? `<section data-visibility="visible" data-transition="none">${slide}</section>` 
            : `<section>${slide}</section>`
        )
        .join('');
    }
    
    return slides
      .map(slide => `<section>${slide}</section>`)
      .join('');
  };

  return (
    <div className="reveal-container" style={{ 
      height: '100vh', 
      width: '100%', 
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* スライド本体 */}
      <div className="reveal" ref={revealRef}>
        <div className="slides" dangerouslySetInnerHTML={{ __html: processSlideContent(contentHtml) }} />
      </div>
    </div>
  );
}
