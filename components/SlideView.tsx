'use client'

import { useEffect, useRef, useState } from 'react';

interface SlideViewProps {
  contentHtml: string;
}

export default function SlideView({ contentHtml }: SlideViewProps) {
  const revealRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [processedContent, setProcessedContent] = useState('');

  // HTMLコンテンツを処理する
  useEffect(() => {
    if (contentHtml) {
      // コンテンツが変更されたら、再度ローディング状態にする
      setIsLoading(true);
      
      // 一旦非同期でHTMLを処理して状態に保存
      setTimeout(() => {
        setProcessedContent(processSlideContent(contentHtml));
      }, 0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentHtml]);
  
  // 処理済みコンテンツが用意できたら、Reveal.jsをロード
  useEffect(() => {
    // クライアントサイドでのみReveal.jsをロード
    const loadReveal = async () => {
      if (typeof window !== 'undefined' && revealRef.current && processedContent) {
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
            transition: 'slide',
            // 同期を保証するため
            embedded: false
          });
          
          // 明示的にスライド0に移動し、レイアウトを強制更新
          deck.slide(0, 0);
          deck.sync();
          deck.layout();
          
          // 少し遅延を入れて確実にスライドが描画された後にローディングを非表示に
          setTimeout(() => {
            setIsLoading(false);
          }, 200);
        } catch (error) {
          console.error('Failed to load Reveal.js:', error);
          setIsLoading(false);
        }
      }
    };
    
    if (processedContent) {
      loadReveal();
    }
  }, [processedContent]);
  
  // ローディング状態が変わった時の処理
  useEffect(() => {
    // ローディングが完了した後、スライドが確実に表示されるようにするための追加処理
    if (!isLoading && revealRef.current) {
      // HTMLレンダリングの完了を待ってから追加設定
      setTimeout(() => {
        const slidesContainer = revealRef.current?.querySelector('.slides');
        const firstSlide = slidesContainer?.querySelector('section:first-child');
        
        if (firstSlide) {
          // 最初のスライドにクラスを追加してアクティブ化
          firstSlide.classList.add('present');
          firstSlide.classList.add('active');
          
          // 必要に応じてスクロールをリセット
          window.scrollTo(0, 0);
        }
      }, 50);
    }
  }, [isLoading]);
  
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
    
    if (slides.length === 0) return '';
    
    // 特に最初のスライドが確実に表示されるように属性を強化
    return slides
      .map((slide, index) => {
        // 空のスライドをスキップ
        if (!slide.trim()) return '';
        
        const attrs = index === 0 
          ? 'data-visibility="visible" data-transition="none" data-state="visible" class="present"'
          : '';
        
        return `<section ${attrs}>${slide}</section>`;
      })
      .filter(Boolean) // 空の文字列を除去
      .join('');
  };

  return (
    <div className="reveal-container" style={{ 
      height: '100vh', 
      width: '100%', 
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* ローディングインジケーター */}
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 1000,
          color: 'white',
          fontSize: '1.5rem'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div className="loading-spinner" style={{
              border: '4px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '50%',
              borderTop: '4px solid white',
              width: '40px',
              height: '40px',
              margin: '0 auto 16px auto',
              animation: 'spin 1s linear infinite'
            }}></div>
            <p>スライドを読み込み中...</p>
          </div>
        </div>
      )}

      {/* スタイル定義 */}
      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        /* ローディング中はスライドコンテンツを非表示に */
        .reveal-hidden {
          visibility: hidden;
          opacity: 0;
        }
        
        /* ローディング完了後はスライドコンテンツをフェードイン */
        .reveal-visible {
          visibility: visible;
          opacity: 1;
          transition: opacity 0.3s ease-in-out;
        }
      `}</style>

      {/* スライド本体 */}
      <div 
        className={`reveal ${isLoading ? 'reveal-hidden' : 'reveal-visible'}`} 
        ref={revealRef}
        style={{ 
          position: 'relative',
          // ローディング中は完全に非表示にして、HTMLが見えないように
          display: isLoading ? 'none' : 'block'
        }}
      >
        <div className="slides" dangerouslySetInnerHTML={{ __html: processedContent }} />
      </div>
    </div>
  );
}
