# AWS WAF
## 【要点】
- CloudFront, ALB, API Gatewayなどにアタッチして利用する
- Web ACLで、アクセス制御ルールを定義する
- IP setsを使えば、アタッチしたリソースに対するアクセスIP制限をかけることができる

## AWS WAFとは
[AWS WAF](https://aws.amazon.com/jp/waf/)

AWSが提供する Webアプリケーションファイアウォール。

WebアプリやAPIを攻撃から守るサービスで、

- SQLインジェクション
- クロスサイトスクリプティング（XSS）
- 不正なIPアドレスや特定の国からのアクセス
- リクエスト過多（DoS的な挙動）

などを検知・遮断できる。

適用先は主に

- CloudFront（CDN）
- Application Load Balancer (ALB)
- API Gateway
- AppSync

にアタッチして利用する。

## Web ACLとは？
AWS WAFで作成する アクセス制御ルールの集合（Access Control List） のこと。

- どんなリクエストを 許可（Allow） するか
- どんなリクエストを ブロック（Block） するか
- どんなリクエストを カウント（Count＝記録だけ） するか

をルールとしてまとめておき、ALB / CloudFront / API Gateway などに適用する。

👉 一言でいうと：  
「特定リソースに対して適用する、WAFルールのセット」 。

実務イメージ：  
「このALBに対しては、SQLインジェクションブロック＋特定IP許可＋レート制限」というWeb ACLを1つ作ってアタッチする。

### イメージ
```markdown
[ Web ACL ]
   ├─ Rule 1: IP制限 (特定IPのみ許可)
   ├─ Rule 2: SQLインジェクション検知 (Block)
   ├─ Rule 3: レート制限 (Count)
   └─ デフォルトアクション (Allow / Block)
        ↓
   適用先リソース (ALB / CloudFront / API Gateway)
```

- Web ACL = ルールの入れ物（ポリシー本体）
- ルール = 条件（IP制御、攻撃検知、リクエスト数制限など）
- デフォルトアクション = どのルールにも当てはまらなかった場合の挙動
- 適用先リソース = 実際に守りたい対象（ALB/CloudFrontなど）

### IP sets
IP set = IPアドレスのリストで、ルールの条件として利用する部品。

- AWS WAFのルールで使える 条件の一種
- 許可 or ブロックしたい IPアドレスやCIDR範囲をまとめて管理するリスト
- ルールの中で「このIP setに含まれるIPからのアクセスだけ許可」「含まれるIPはブロック」みたいに使う

## 実務で見た設定
- CloudFrontで公開しているステージング環境のサイトに対して、特定の人／社内からのアクセスのみ許可するためIP制限をかける目的でWAFを使用
  - CloudFrontのWeb ACLを作成
  - Rulesに、「アクセスを許可するIP sets」を設定



