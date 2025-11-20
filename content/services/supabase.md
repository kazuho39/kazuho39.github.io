# Supabase
## 概要
Supabaseは、PostgreSQLを基盤としたオープンソースのBaaS(Backend as a Service)。  
データベース、認証、ストレージ、リアルタイムAPIなどを自動生成し、バックエンドを高速に構築できる。  
Firebaseの代替として設計されており、SQLベースで柔軟なデータ操作が可能。  

## 用語
### Row Level Security(RLS)
行単位のアクセス制御を行うPostgreSQL機能。Supabaseでは必須の概念。  
Supabaseでは デフォルトでRLSはOFF、ONにすると すべての操作が拒否される。  
アクセスを許可するためには Policy（ポリシー） を作成する必要がある。  
Policyで「誰が、どの行を、どう読める／書ける」をSQL条件で定義する。  
フロントエンドで利用する anon key ではRLSが必ず適用される。  
サーバー側の service_role key はRLSを無視してフルアクセスできる。  
認証ユーザーの権限判定には、JWT内の auth.uid() などを利用する。  

### Policy
RLSを実現するルール定義。特定ユーザーの読み書きを制限できる。  

### Anon/Auth Role
匿名ユーザーと認証済みユーザーのロール。  
RLSでの条件分岐に利用。

## APIキー
| 種類                   | 主な用途             | 権限                | 利用場所            |
| -------------------- | ---------------- | ----------------- | --------------- |
| **anon key**         | フロントエンド（ブラウザなど）  | 制限付き（RLS有効）       | クライアント公開可       |
| **service_role key** | バックエンド（サーバー・API） | **フルアクセス（RLS無効）** | 絶対にクライアントに公開しない |

### 仕組み
Supabaseでは、PostgreSQLの Row Level Security（RLS） によってユーザーごとのアクセス制御を行う。  
しかし、管理者やサーバーサイド処理（例：バッチ・Webhook受信など）では「すべての行にアクセスしたい」ことがある。  
そのために使うのが service_role キー。  

このキーを使うと：  
- RLSを無視して すべてのテーブル・データにアクセスできる
- 挿入・更新・削除・ユーザー管理などの管理操作 が可能

### よくある使い方
| 利用シーン             | 説明                                                                  |
| ----------------- | ------------------------------------------------------------------- |
| **サーバーAPIでのDB操作** | Next.js API Route や Cloud Function などで、`service_role`キーを使って安全にDB更新。 |
| **Cronジョブやバッチ処理** | 定期実行で全データ集計・更新を行う。                                                  |
| **Webhook受信処理**   | 外部サービスからのイベントを受け取り、管理者権限でDBに反映。                                     |

## Edge Functions
Supabase の「サーバーレス関数」機能。  
Denoランタイムで動作する(Node.jsではない)。  
HTTP Requestを受けて、任意の処理を実行できる。  
後述する「Database Webhooks」を使用すれば、特定テーブルへのINSERT/UPDATE/DELETEが発生したときに実行することもできる。  

## Database Webhooks

Supabase の PostgreSQL が提供する「DBイベントのフック」。  
特定テーブルの `INSERT / UPDATE / DELETE` のタイミングで外部URLへPOST。  
実体は PostgreSQL `http` 拡張 + Trigger 関数。  

## 「無料プラン」について
「無料」で利用することもできるが、いくつか制約がある。  

- DB容量：500MB
- ストレージ容量：1GB
- アウトバウンド帯域（egress）：5GB などの転送量制限
- プロジェクトが1週間アクティビティ無しで一時停止される
  - 定期的にダッシュボードへのログインをしたり、クエリ発行(SELECT文でも良い)をすることで維持できる
  - GitHub Actionsでクエリを定期実行する、などの回避策もあるらしい
    - <a href="https://dev.to/jps27cse/how-to-prevent-your-supabase-project-database-from-being-paused-using-github-actions-3hel" target="_blank">参考ページ</a>
- 一時停止後の復旧は即時ではなく、操作が制限される場合あり
- MAU（認証ユーザー数）やAPIリクエストの制約はあるが、軽量用途ならほぼ問題なし
- バックアップ/PITR（ポイントインタイムリカバリ）は無料では利用不可
- 1ファイルの最大アップロードサイズは50MB（グローバル制限）
- 無料プランで作成できるプロジェクト数には上限（2つまで）がある
