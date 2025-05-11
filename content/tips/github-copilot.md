# GitHub Copilot
## .github/copilot-instructions.md
GitHub Copilotに「前提情報や知識」「対話時のルール」などといった指示情報を定義するファイル。  
チャット時の事前プロンプトとして読み込まれる。  

もしかしたら、 `.vscode/settings.json` が以下の状態になってないと `copilot-instructions.md`は読み込まれないかも。(※明示的に指定しない限り)  

```json
"chat.promptFiles": false
```

## (old).github/prompts
GitHub Copilotに個別に指示するプロンプトファイルを格納する。  
ファイル名は、 `ファイル名.prompts.md` 形式で作成する。(例: `copilot-review.prompt.md`)  
`copilot-instructions.md` は自動的に読み込まれるが、このプロンプトファイルは実行時に指定する必要がある。  
そのため、目的別にファイルを生成しておくと便利。  

### プロンプトの呼び出し方
- チャットから「コンテキストを追加する」(クリップのマーク)を選択
- 画面上部から「プロンプト」を選択
- `.github/prompts` ディレクトリに格納したプロンプトが表示されるので、そこから選択

## .github/instructions
VSCodeのバージョンを上げたら、 `prompts` ではなく `instructions(手順)` に変更になったようだ。  
(2025/05/10時点ではバージョン: 1.100.0 (Universal))  

大まかなところはpromptsのときと変わらない。  
ファイル名は `ファイル名.instructions.md` 形式で作成する。(例: `copilot-review.instructions.md`)  

### 手順の呼び出し方
- チャットから「コンテキストを追加する」(クリップのマーク)を選択
- 画面上部から「手順」を選択
- `.github/instructions` ディレクトリに格納した手順が表示されるので、そこから選択

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

