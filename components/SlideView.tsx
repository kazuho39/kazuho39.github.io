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
    let isCleaned = false;
    
    if (contentHtml) {
      // コンテンツが変更されたら、再度ローディング状態にする
      setIsLoading(true);
      
      // 一旦非同期でHTMLを処理して状態に保存
      const timeoutId = setTimeout(() => {
        if (!isCleaned) {
          setProcessedContent(processSlideContent(contentHtml));
        }
      }, 0);
      
      // クリーンアップ関数
      return () => {
        isCleaned = true;
        clearTimeout(timeoutId);
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentHtml]);
  
  // 処理済みコンテンツが用意できたら、Reveal.jsをロード
  useEffect(() => {
    // Reveal.jsのインスタンスを保持する変数
    let deck: any = null;
    // クリーンアップフラグ
    let isCleaned = false;

    // クライアントサイドでのみReveal.jsをロード
    const loadReveal = async () => {
      if (typeof window !== 'undefined' && revealRef.current && processedContent && !isCleaned) {
        try {
          // まず要素を正しいサイズで表示するためにinline styleを適用
          if (revealRef.current) {
            // 初期化前に要素のサイズを明示的に設定
            revealRef.current.style.width = '100%';
            revealRef.current.style.height = '100%';
            const slidesElement = revealRef.current.querySelector('.slides');
            if (slidesElement) {
              (slidesElement as HTMLElement).style.width = '100%';
              (slidesElement as HTMLElement).style.height = '100%';
              (slidesElement as HTMLElement).style.maxHeight = '100%';
            }
          }
          
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
          deck = new Reveal(revealRef.current);
          
          // コンポーネント内にスコープを限定するように初期化
          deck.initialize({
            controls: true,
            progress: true,
            center: true,
            hash: true,
            transition: 'slide',
            // スコープを限定するためにembeddedモードを有効化
            embedded: true,
            // サイズ自動調整を有効に
            width: '100%',
            height: '100%',
            // 表示を最適化
            margin: 0.05,
            // コンテナ要素にスタイルを適用するよう設定
            containerClass: 'reveal-container',
            viewDistance: 2
          });
          
          // 明示的にスライド0に移動し、レイアウトを強制更新
          deck.slide(0, 0);
          deck.sync();
          // 念のため複数回レイアウト更新を実行
          deck.layout();
          
          // 少し遅延を入れてレイアウトが確実に計算された後にローディングを非表示に
          setTimeout(() => {
            if (isCleaned) return; // クリーンアップ済みなら処理しない
            setIsLoading(false);
            
            // さらに少し遅延を入れて表示された後に再度レイアウト計算
            setTimeout(() => {
              if (isCleaned) return; // クリーンアップ済みなら処理しない
              if (deck) {
                deck.layout();
                deck.sync();
              }
            }, 100);
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

    // コンポーネントのアンマウント時のクリーンアップ処理
    return () => {
      isCleaned = true;
      
      // 1. bodyに設定されたReveal.jsのスタイル変数をクリーンアップ
      if (typeof document !== 'undefined') {
        const bodyStyle = document.body.style;
        
        // Reveal.jsが設定する可能性のある全ての変数を削除
        const styleProps = [
          '--slide-scale', 
          '--viewport-width', 
          '--viewport-height', 
          '--slide-width', 
          '--slide-height',
          '--reveal-global-width',
          '--reveal-global-height',
          '--reveal-width',
          '--reveal-height',
          '--reveal-min',
          '--reveal-max'
        ];
        
        // 全てのプロパティを削除
        styleProps.forEach(prop => {
          bodyStyle.removeProperty(prop);
        });
      }
      
      // 2. Reveal.jsのイベントリスナーを削除
      try {
        // ウィンドウのリサイズイベントリスナーなどを削除
        window.removeEventListener('resize', deck?.layout);
        window.removeEventListener('hashchange', deck?.navigation?.onWindowHashChange);
      } catch (e) {
        console.warn('Failed to remove some event listeners:', e);
      }
      
      // 3. Reveal.jsのインスタンスを破棄する
      if (deck && typeof deck.destroy === 'function') {
        try {
          // Revealのデストロイを実行
          deck.destroy();
          
          // @ts-ignore - 追加のクリーンアップ
          if (revealRef.current) revealRef.current.__reveal = null;
        } catch (e) {
          console.error('Error destroying Reveal.js instance:', e);
        }
      }
      
      // 4. 追加したCSSリソースを削除する
      ['reveal-css', 'reveal-theme-css', 'reveal-highlight-css'].forEach(id => {
        const linkElement = document.getElementById(id);
        if (linkElement) {
          linkElement.remove();
        }
      });
      
      // 5. グローバルに追加された可能性のあるクラスを削除
      document.documentElement.classList.remove('reveal-full-page');
      document.body.classList.remove('reveal-viewport');
    };
  }, [processedContent]);
  
  // ローディング状態が変わった時の処理
  useEffect(() => {
    // クリーンアップフラグ
    let isCleaned = false;

    // ローディングが完了した後、スライドが確実に表示されるようにするための追加処理
    if (!isLoading && revealRef.current) {
      // HTMLレンダリングの完了を待ってから追加設定
      const timeoutId = setTimeout(() => {
        if (isCleaned) return; // クリーンアップ済みなら処理しない
        
        const slidesContainer = revealRef.current?.querySelector('.slides');
        const firstSlide = slidesContainer?.querySelector('section:first-child');
        
        if (firstSlide) {
          // 最初のスライドにクラスを追加してアクティブ化
          firstSlide.classList.add('present');
          firstSlide.classList.add('active');
          
          // 必要に応じてスクロールをリセット
          window.scrollTo(0, 0);
        }
        
        // 要素が表示された後に明示的にレイアウトを再計算
        try {
          // @ts-ignore - 型エラーを無視
          const deck = revealRef.current.__reveal;
          if (deck && typeof deck.layout === 'function') {
            // スライドのレイアウトを強制的に再計算
            deck.layout();
            // 現在のスライドを再同期
            deck.sync();
          }
        } catch (error) {
          console.error('Failed to update Reveal.js layout:', error);
        }
      }, 100); // 少し長めの遅延で確実にDOM更新後に実行

      // クリーンアップ関数
      return () => {
        isCleaned = true;
        clearTimeout(timeoutId);
      };
    }
  }, [isLoading]);
  
  // コンポーネントのマウント/アンマウント時に完全なクリーンアップを行う
  useEffect(() => {
    // マウント時の処理 - コンテナにカスタムデータ属性を設定
    const container = document.querySelector('.reveal-container');
    if (container) {
      container.setAttribute('data-slide-view', 'active');
    }
    
    // アンマウント時のクリーンアップ - 最終的なフォールバックとして機能
    return () => {
      // bodyに直接設定されたスタイル変数を削除
      if (typeof document !== 'undefined') {
        // スライド関連の全ての変数を削除
        const styleProps = [
          '--slide-scale', 
          '--viewport-width', 
          '--viewport-height', 
          '--slide-width', 
          '--slide-height',
          // Reveal.jsが設定する可能性のある全ての変数
          '--reveal-global-width',
          '--reveal-global-height',
          '--reveal-width',
          '--reveal-height',
          '--reveal-min',
          '--reveal-max',
          '--reveal-scale',
          '--reveal-margin',
          '--reveal-perspective'
        ];
        
        // 全てのプロパティを削除
        styleProps.forEach(prop => {
          document.body.style.removeProperty(prop);
        });
        
        // バックアップとして、style属性を直接操作
        // スタイル属性から全てのReveal.js関連のカスタムプロパティを削除
        if (document.body.hasAttribute('style')) {
          const currentStyle = document.body.getAttribute('style') || '';
          const styleRegex = /--(?:slide|viewport|reveal)[^;]*;/g;
          const cleanedStyle = currentStyle.replace(styleRegex, '');
            
          if (cleanedStyle.trim() === '') {
            document.body.removeAttribute('style');
          } else {
            document.body.setAttribute('style', cleanedStyle);
          }
        }
        
        // Reveal.js固有のクラスを削除
        document.documentElement.classList.remove('reveal-full-page');
        document.body.classList.remove('reveal-viewport');
        
        // 残っているかもしれないイベントリスナーを削除
        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(element => {
          // @ts-ignore
          if (element.__reveal && typeof element.__reveal.destroy === 'function') {
            try {
              // @ts-ignore
              element.__reveal.destroy();
            } catch (e) {
              console.warn('Failed to clean up Reveal instance:', e);
            }
          }
        });
      }
    };
  }, []);
  
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
    <div className="reveal-container" data-slide-container="true" style={{ 
      height: '100vh', 
      width: '100%', 
      position: 'relative',
      overflow: 'hidden',
      contain: 'layout paint style' // スタイルのスコープを強制的に制限
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

      {/* スタイル定義 - スコープ限定 */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      
      {/* スライド表示に必要なクラス定義 - スコープ内に限定 */}
      <style jsx>{`
        /* ローディング中はスライドコンテンツを非表示に */
        :global(.reveal-container .reveal-hidden) {
          visibility: hidden;
          opacity: 0;
          /* レイアウト計算のため要素は存在させるが見えないように */
          position: absolute;
          pointer-events: none;
        }
        
        /* ローディング完了後はスライドコンテンツをフェードイン */
        :global(.reveal-container .reveal-visible) {
          visibility: visible;
          opacity: 1;
          position: relative;
          transition: opacity 0.3s ease-in-out;
        }
        
        /* スライド表示の最適化 - スコープを限定 */
        :global(.reveal-container .reveal) {
          width: 100% !important;
          height: 100% !important;
        }
        
        /* スライドのサイズが正しく計算されるようにする - スコープを限定 */
        :global(.reveal-container .reveal .slides) {
          width: 100% !important;
          height: 100% !important;
          max-height: 100% !important;
        }
      `}</style>

      {/* スライド本体 */}
      <div 
        className={`reveal ${isLoading ? 'reveal-hidden' : 'reveal-visible'}`} 
        ref={revealRef}
        style={{ 
          position: 'relative',
          // display:noneではなく、visibility/opacityを使用して
          // レイアウト計算はされるが見えないようにする
          visibility: isLoading ? 'hidden' : 'visible',
          opacity: isLoading ? 0 : 1
        }}
      >
        <div className="slides" dangerouslySetInnerHTML={{ __html: processedContent }} />
      </div>
    </div>
  );
}
