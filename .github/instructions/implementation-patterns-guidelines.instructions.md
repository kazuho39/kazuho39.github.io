---
description: "具体的な実装パターンとコーディングの判断指針"
# applyTo: '*'
---

# 実装パターン指針

このドキュメントは、具体的な実装パターン、コーディング判断、設計選択に関する指針をまとめたものです。ここでは、アーキテクチャの大枠ではなく、実装レベルでの具体的な判断基準を提供します。

## 1. 静的メソッド vs インスタンスメソッドの選択指針

メソッドを静的（static）にするか、インスタンスメソッドにするかの判断は、設計の柔軟性・保守性・テスト容易性に大きく影響します。以下の指針に従って適切に選択してください。

### 静的メソッドが適切なケース
- **状態を持たない純粋関数**：入力のみに依存し、副作用のないメソッド
- **ユーティリティ関数**：`StringUtils.format()`, `DateUtils.parse()`のような汎用的な処理
- **ファクトリーメソッド**：`User.createFromJSON()`, `Entity.builder()`のようなインスタンス生成処理
- **定数や設定値の提供**：アプリケーション全体で共通の値を提供する場合
- **シンプルで変更の少ないロジック**：アルゴリズムや計算ロジックなど変更頻度の低い処理

### インスタンスメソッドが適切なケース
- **状態を持つ処理**：インスタンス変数やコンテキストに依存する処理
- **モック化やスタブ化が必要なテスト対象**：依存性注入を活用したテスト容易性が求められる場合
- **ポリモーフィズムが必要**：継承や実装の差し替えが想定される場合
- **外部リソースとの連携**：データベース、ファイル、ネットワークなど外部依存を伴う処理
- **依存サービスとの連携**：他のサービスやコンポーネントを利用する処理
- **設定の再利用**：同じ設定で複数回処理を実行する場合

### 検討すべき設計原則との関係
- **依存性逆転の原則（DIP）**：インターフェースを活用する場合はインスタンスメソッド
- **テスト容易性**：依存性注入を活用するならインスタンスメソッド
- **単一責任の原則（SRP）**：責務が明確で単一なら静的メソッドも検討可能
- **オープン/クローズド原則（OCP）**：拡張性が重要ならインスタンスメソッド
- **YAGNI**：将来の拡張性が不確かな場合、まずはシンプルな静的メソッドから始める

### 実装例：通知送信処理

通知送信処理のような場合、一般的には以下のようなアプローチを推奨します：

```typescript
// インターフェース定義
interface NotificationService {
  send(settings: NotificationSettings): Promise<void>;
}

// 具体的な実装
class EmailNotificationService implements NotificationService {
  private connection: EmailConnection;
  
  constructor(config: EmailConfig) {
    this.connection = new EmailConnection(config);
  }
  
  async send(settings: NotificationSettings): Promise<void> {
    // 設定を使って通知を送信
    await this.connection.sendEmail({
      to: settings.recipients,
      subject: settings.subject,
      body: settings.content
    });
  }
}

// 使用例
const notifier = new EmailNotificationService(emailConfig);
await notifier.send({
  recipients: ['user@example.com'],
  subject: 'お知らせ',
  content: 'これは通知メッセージです'
});
```

この設計では、依存性注入パターンを使用して、テスト時にモックに差し替えることが容易になります。また、将来的に異なる通知手段（SMS、プッシュ通知など）を追加する際にも拡張しやすくなります。

---

このガイドラインは随時更新され、より多くの実装パターンの指針が追加される予定です。
