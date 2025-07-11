# GitHub Copilot 指示書

## 概要

- 本リポジトリは、日々の学習内容をMarkdownで蓄積し、Next.js + Tailwind CSS + TypeScriptでWebサイト化・GitHub Pagesで公開するプロジェクトです。
- 学習記事は `content/` 配下にジャンルごとにMarkdownで管理し、`app/` 配下のNext.jsページで動的に表示します。

## 主要ディレクトリ

- `app/` … Next.js App Router構成。各ジャンルごとにディレクトリ分割（例: `app/best-practice/`, `app/slide/`）。
- `content/` … 記事Markdown格納。ジャンルごとにサブディレクトリ分割。
- `public/content/` … 記事一覧JSON（`scripts/exportArticles.js`で自動生成）。
- `components/` … UIコンポーネント（例: `LayoutMarkdownWithSidebar.tsx`, `Sidebar.tsx`）。
- `lib/` … Markdownパース・変換等のユーティリティ。

## 開発ワークフロー

- **ローカル起動**:  
  1. `docker compose up -d`
  2. `docker compose exec app npm run dev`
  3. ブラウザで `http://localhost:3000/` にアクセス
- **記事追加/編集**:  
  - `content/`配下にMarkdownを追加・編集
  - `npm run export` または `dev`/`build`時に `scripts/exportArticles.js` が自動で記事一覧JSONを生成
- **ビルド/デプロイ**:  
  - `npm run build` → 静的エクスポート（`next.config.mjs`で`output: "export"`指定）
  - GitHub Pagesで公開

## コーディング規約・設計方針

- **Next.js App Router**: サーバー/クライアントコンポーネントを用途で使い分け。機能単位でディレクトリ分割。
- **TypeScript**: strictモード。型定義を明確に。型ガード・Zod等でランタイム検証。
- **Tailwind CSS**: 一貫したカラーパレット・レスポンシブ・ダークモード対応。
- **データ取得**: サーバーコンポーネントで直接Markdownを読み込み、`lib/`のユーティリティでHTML変換。
- **状態管理**: サーバー状態はサーバーコンポーネント、クライアント状態はReactフックで管理。
- **記事一覧**: `public/content/`のJSONをクライアントでfetchし、`SearchableList`等で表示。

## AIエージェント向け運用ルール

- **回答は日本語で生成**
- **作業ログ**: 変更時は `copilot/log/{日付}_{指示内容}.md` にレポートを作成・追記
- **プロンプト/インストラクション**:  
  - `.github/instructions/` … コーディング規約や設計方針を記載
  - `.github/prompts/` … 作業指示用プロンプト（現状は`copilot/prompt/`で運用中）

## 参考ファイル

- `README.md` … ローカル起動手順
- `.github/instructions/nextjs-tailwind.instructions.md` … Next.js + Tailwind開発標準
- `content/best-practice/development-with-github-copilot.md` … Copilot活用例・運用ノウハウ

---

不明点や追加で記載すべき運用・設計ルールがあればご指摘ください。内容の追加・修正も可能です。


