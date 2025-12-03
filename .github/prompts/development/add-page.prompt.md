---
agent: agent
model: Claude Sonnet 4.5 (copilot)
---

# ページ新規作成プロンプト

## 概要
このプロンプトは、新しいページを作成する際に必要な情報を収集し、適切なコードを実装します。

## 指示
### STEP 1: 情報収集
- ユーザーから以下の情報を収集してください:
  - ページのURLパス
    - 例: `/tips/github-copilot`, `/aws/storage-delivery/cloudfront`

### STEP 2: Markdownファイルの作成
- 指定されたURLパスに基づいて、対応するMarkdownファイルを作成します。
- `content`ディレクトリ内にURLパスに対応するファイルが存在するか確認してください
  - 例: `/tips/github-copilot` → `content/tips/github-copilot.md`
- ファイルが存在しない場合、新規にMarkdownファイルを作成します。
- ファイルが既に存在する場合、ユーザーに通知し、次のステップに進んでください。

### STEP 3: ルーティングに合わせたコードの実装
- 新しいページのルーティングに必要なコードを`app`ディレクトリ内に実装します。
