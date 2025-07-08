# GitHub Copilot
## .github/copilot-instructions.md
GitHub Copilotに「前提情報や知識」「対話時のルール」などといった指示情報を定義するファイル。  
チャット時の事前プロンプトとして読み込まれる。  

## .github/prompts
GitHub Copilotに個別に指示するプロンプトファイルを格納する。  
コードの生成やコードレビューの実行など、特定のタスクや作業を実行する際の指示書となる。  
利用するときには、チャットで `/` を入力するとプロンプトの一覧が出てくるので、そこから使用する。  

ファイル名は、 `ファイル名.prompts.md` 形式で作成する。(例: `copilot-review.prompt.md`)  
`copilot-instructions.md` は自動的に読み込まれるが、このプロンプトファイルは実行時に指定する必要がある。  
そのため、目的別にファイルを生成しておくと便利。  

### プロンプトファイルの例
- 新しいIssueを作成したい時に使用
- ブランチ名の自動生成
- 関連テストの検索
- 一度の作業で完結する指示

### プロンプトの呼び出し方
- `chat.promptFiles` をtrueにする
- Chatの入力欄で `/` を入力すると候補が表示される
- 任意のPrompt filesを選択する

### プロンプトファイルの書き方
- `mode`:
  - プロンプトの実行時に使用するチャットモード
  - ask, edit, or agent (default)
- `tools`:
  - エージェントモードで使用できるツール（セット）を示すツール（セット）名の配列
  - ツールの構成 を選択して、ワークスペースの使用可能なツールのリストからツールを選択する
  - プロンプトの実行時に指定したツール（セット）が利用できない場合は、無視される
- `description`:
  - プロンプトの簡単な説明

```markdown:
---
mode: 'agent'
tools: ['githubRepo', 'codebase']
description: 'Generate a new React form component'
---
```

## .github/instructions
カスタム命令を使用すると、特定のコーディングプラクティスと技術スタックに一致する応答を得るために、共通のガイドラインまたはルールを記述することができます。  
手動ですべてのチャットクエリにこのコンテキストを含める代わりに、カスタム命令は自動的にすべてのチャットリクエストでこの情報を組み込みます。  

`applyTo` で該当するファイルを作業するときには、必ずインストラクションファイルが読み込まれる(はず)。　　

### インストラクションファイルの例
- PSR-12準拠の記述ルール
- 常に適用されるコーディング規約
- 継続的に参照される知識
- プロジェクト全体で一貫して適用

### インストラクションファイルの書き方

```markdown
---
applyTo: "**/*.php"
---

# コード生成に関する指示
- このファイルでは、GitHub Copilotがコードを生成する際に従うべき具体的な指示を定義します。
```


## VSCodeの設定
### .vscode/settings.json
#### サンプル

```json:
{
  // プロンプトファイル活用
  "chat.promptFiles": true,
  // プロンプトファイルの場所（全カテゴリーを有効化）
  "chat.promptFilesLocations": {
    ".github/prompts/development": true,
  },
  // インストラクションファイル活用
  "github.copilot.chat.codeGeneration.useInstructionFiles": true,
  // インストラクションファイルの場所（全カテゴリーを有効化）
  "chat.instructionsFilesLocations": {
    ".github/instructions/code": true,
    ".github/instructions/architecture": true,
    ".github/instructions/application": true,
    ".github/instructions/infrastructure": true,
    ".github/instructions/laravel": true,
    ".github/instructions/performance": true,
    ".github/instructions/security": true
  },
}
```

#### chat.promptFiles
これを `true` にすると、GitHub Copilotとのチャットでコンテキストを選択するときに「プロンプト」を指定できるようになる。  

#### github.copilot.chat.commitMessageGeneration.instructions
コミットメッセージを自動生成する際の指示。  

## ドキュメント
- [Customize AI responses in VS Code](https://code.visualstudio.com/docs/copilot/copilot-customization)

