# MCP(Model Context Protocol)
## MCPとは
MCP（Model Context Protocol）は、大規模言語モデル（LLM）とそのAPIを利用するアプリケーション間で、コンテキスト情報を効率的に共有するためのプロトコルです。  
これは、Anthropicが提唱した規格で、LLMがより多くのコンテキスト情報を理解し、より適切な応答を生成するために設計されています。

MCPの主な目的は以下の通りです：

1. **コンテキスト管理の効率化**: LLMへの入力コンテキストを構造化し、最適化する
2. **一貫性の向上**: モデルの応答における文脈理解と一貫性を改善する
3. **コスト削減**: 必要なトークンのみを送信することでAPIコストを削減する
4. **ユーザー体験の向上**: より関連性の高い、正確な応答をユーザーに提供する

MCPは特に長いコンテキストや複雑な対話を扱う場合に有効で、コンテキスト情報の構造化と優先順位付けを通じて、LLMのパフォーマンスを向上させることができます。

## 主要な用語

MCPを使う上で理解しておくべき重要な用語は以下の通りです：

| 用語 | 説明 |
|------|------|
| **ホスト (Host)** | MCPアーキテクチャで実際にLLMを実行・管理する環境。モデルの推論を処理し、コンテキスト管理を担当する。AI機能を内包したアプリやツールで、現状だとVSCodeやCursor、Claude for DesktopやClineなどが該当する |
| **クライアント (Client)** | MCPを介してLLMサービスを利用するアプリケーションやシステム。ユーザーインターフェースを提供し、ユーザーの入力をホストに送信する。 |
| **サーバー (Server)** | MCPの実装において、クライアントからのリクエストを受け取り、LLMの実行結果を返す役割を担う中間層。複数のクライアントからのアクセスを管理します。 |

## MCPサーバ
### MCPサーバが提供すべき3つの主要機能
- Tools
  - AIモデルが呼び出せる関数
  - 特定のアクションを実行するためのAI専用コントローラ部分のこと
  - ex. データベースクエリ実行、APIリクエスト送信、ファイル操作など
- Resource
  - MCPホストユーザ/AIモデルがアクセスできるデータのこと
- Prompts
  - MCPホストユーザ向けに事前に提示する、テンプレート化されたメッセージ
  - ex. コードレビュー、データ分析、検索クエリの最適化など
  - 






