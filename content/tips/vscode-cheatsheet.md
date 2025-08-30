# VSCodeチートシート
## ショートカットキー
### ファイル名で検索
`Command + P`  
ダブルクォーテーションで括ってファイル名の一部を入力して検索する。  

### ファイル内の置換
`Command + Option + F`  

### 指定した行にジャンプ
`Control + g`  

## コマンドパレットでできること
コマンドパレットのショートカットキー: `Command + Shift + P`

### ドキュメントのフォーマット(Format Document)
指定した形式でドキュメントをフォーマットする。  
形式は、VSCodeの右下のところで指定できる。  

### 文字変換(Transform to)
大文字、小文字、キャメルケース、ケバブケースなど、文字を変換できる。  

- 大文字に変換: `Transform to Uppercase`
- 小文字に変換: `Transform to Lowercase`
- キャメルケースに変換: `Transform to Camel Case`
  - e.g. yearMonth
- スネークケースに変換: `Transform to Snake Case`
  - e.g. year_month
- ケバブケースに変換: `Transform to Kebab Case`
  - e.g. year-month
- パスカルケースに変換: `Transform to Pascal Case`
  - e.g. YearMonth


## settings.json
`.vscode/settings.json` に置くと、ワークスペース(プロジェクト)ごとにVSCodeの設定をカスタマイズできる。  

### ルーラーの表示
エディタにルーラーを表示する。  
コード実装時に横に長くなりすぎると可読性が下がってしまう。  
だいたい100〜120文字くらいを目安に、1行が長くなりすぎたら改行してインデントつけたりする。  

以下の設定は、80,100,120文字の位置にルーラー(#FFFFFF)を表示する設定。  

```json
"editor.rulers": [
    80,
    100,
    120
],
"workbench.colorCustomizations": {
    "editorRuler.foreground": "#FFFFFF"
}
```

## よく使う拡張機能
### GitLens
### Unique Lines
### Markdown Navigation
### Markdown Preview Enhanced
### Markdown Preview Mermaid Support
