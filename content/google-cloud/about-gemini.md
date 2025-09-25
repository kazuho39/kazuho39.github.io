# Gemini
## Geminiとは？
<a href="https://gemini.google.com/app?hl=ja" target="_blank">Gemini</a>

- Google が開発した 生成AIモデル群 の名前
- ChatGPT における GPT-4 や Claude における Claude 3 みたいな位置づけ
- テキスト・画像・コード・マルチモーダル入力に対応
- Googleアカウントを持っていれば、基本機能は無料で使える

## 提供のされ方
- 一般ユーザー向け
  - 「Geminiアプリ」や Google Workspace (Gmail, Docs, Sheets) の機能として利用できる
- 開発者向け (＝GCP側)
  - Vertex AI（GCPのAIプラットフォーム）の中で Gemini モデルを API として利用できる
  - 例：Vertex AI の「Generative AI Studio」からプロンプトを試す
  - REST / gRPC API でアプリに組み込み可能

```markdown
Google Cloud (GCP)
 └─ Vertex AI (AIプラットフォーム)
     └─ Gemini (生成AIモデル)
```


