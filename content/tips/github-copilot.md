# GitHub Copilot
## .github/copilot-instructions.md
GitHub Copilotに「前提情報や知識」「対話時のルール」などといった指示情報を定義するファイル。  
チャット時の事前プロンプトとして読み込まれる。  

## .github/prompts
GitHub Copilotに個別に指示するプロンプトファイルを格納する。  
`copilot-instructions.md` は自動的に読み込まれるが、このプロンプトファイルは実行時に指定する必要がある。  
そのため、目的別にファイルを生成しておくと便利。  

## VSCodeの設定
### .vscode/settings.json
#### サンプル

```json:
{
  "chat.promptFiles": true,
  "github.copilot.chat.commitMessageGeneration.instructions": [
    {
      "text": "必ず日本語で記述してください"
    },
    {
      "text": "コミットメッセージは、最初にConventional Commitsに則って記述してください"
    },
    {
      "text": "その後ファイルごとの詳細な変更内容を記述してください"
    }
  ]
}
```

#### chat.promptFiles
これを `true` にすると、GitHub Copilotとのチャットでコンテキストを選択するときに「プロンプト」を指定できるようになる。  

#### github.copilot.chat.commitMessageGeneration.instructions
コミットメッセージを自動生成する際の指示。  

## プロンプトの呼び出し方
- チャットから「コンテキストを追加する」(クリップのマーク)を選択
- 画面上部から「プロンプト」を選択
- `.github/prompts` ディレクトリに格納したプロンプトが表示されるので、そこから選択

