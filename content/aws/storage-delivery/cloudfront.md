# CloudFront
## 【要点】
- AWSが提供するCDNサービス
- コンテンツを取りに行く元のサーバとして、オリジン(S3,EC2,ELBなど)を指定する
- ACMで発行したSSL証明書をアタッチしてHTTPS化したり、WAFをアタッチして不正アクセスをブロックすることができる
- 代替ドメインを指定することができる


## 【前提】
### CDN（Content Delivery Network）とは
- 世界中に分散配置されたサーバー網 を使って、ユーザーに近い場所からコンテンツを配信する仕組み。
- 目的は 高速化・安定化・負荷軽減。

**主な特徴**  
- ユーザーの近くの「エッジサーバー」にコンテンツをキャッシュ → レイテンシ削減
- オリジンサーバ（S3やEC2）の負荷を減らせる
- DDoS対策やHTTPS対応でセキュリティも向上

👉 一言でいうと：  
- 「コンテンツを世界中に高速＆安定して届けるための仕組み」

## CloudFrontとは
AWSが提供する CDN（コンテンツ配信ネットワーク）サービス。

- 世界中のエッジロケーションから配信することで 高速化 できる
- キャッシュを使ってオリジンサーバ（S3, EC2, ALBなど）の負荷を減らす
- HTTPS, WAF, Shield と統合して セキュリティ強化 もできる

👉 一言でいうと：  
- 「S3やEC2などのコンテンツを、世界中の利用者に高速＆安全に届けるための仕組み」
- CloudFrontはAWS版CDN

実務イメージ：  
- S3に置いた画像や静的サイトを、CloudFront経由で配信
- ALBの前にCloudFrontを置いて、キャッシュ＋WAFで保護


### イメージ
- 1: EC2 にWebアプリ（例：LaravelやWordPress）を構築
- 2: そのEC2を オリジンサーバ として指定
- 3: CloudFront を設定して、世界中のエッジロケーションから配信
  - 静的コンテンツはキャッシュされて高速化
  - 動的コンテンツはオリジン（EC2）にリクエストが飛ぶ
- 4: 利用者は CloudFrontのドメイン（またはRoute53で独自ドメインを設定）を通してアクセス


```markdown
[User] 
   ↓ リクエスト
[CloudFront (CDN)]
   ├─ キャッシュがあれば → 即レスポンス
   └─ キャッシュになければ → EC2へ転送
                          ↓
                   [EC2 (Webサーバ)]
```

👉 ポイント  
- CloudFrontはユーザーの近くでキャッシュを返す役割
- キャッシュにないリクエストはEC2（オリジン）まで転送される
- 結果として「高速化・負荷軽減・セキュリティ強化」が得られる

## ディストリビューション(Distribution)
- CloudFrontの配信単位（1セットの設定） のこと
- ユーザーがアクセスするのは、このディストリビューションのエンドポイント

### ディストリビューションで設定する主な内容
- オリジン（どこからデータを取ってくるか：S3 / EC2 / ALB / API Gateway）
- キャッシュ動作（TTL、クエリやCookieをキャッシュキーに含めるか）
- ビヘイビア（Behaviors）（特定パスごとのルーティングやキャッシュ設定）
- セキュリティ（SSL証明書、WAF連携、ジオ制限）
- ログ出力や価格クラス

👉 一言でいうと：  
「ディストリビューションがCloudFrontの本体。ここで配信に関わるほとんどの設定をまとめる」 というイメージ

### オリジン
CloudFrontが コンテンツを取りに行く元のサーバ のこと。  
例：S3バケット、EC2、ELB、RDS直ではなくAPI Gatewayなど。

#### オリジンドメイン
そのオリジンを指定する ドメイン名（エンドポイント） のこと。  
例：  
- S3 → my-bucket.s3.amazonaws.com
- ALB → my-alb-123456.ap-northeast-1.elb.amazonaws.com
- EC2 → ec2-xx-yy-zz.ap-northeast-1.compute.amazonaws.com

#### オリジンタイプ
CloudFrontが「どこをオリジン（配信元）にするか」を指定するときの リソースの種類 のこと。

- CloudFrontで選べる代表的なオリジンタイプ
  - S3 Origin
    - S3バケットをオリジンにする場合
    - 静的ファイル配信などでよく使う
  - Custom Origin
    - S3以外のオリジン（ALB, EC2, API Gateway など）を指定する場合
    - 「カスタム」＝「HTTP/HTTPSでアクセスできる任意のエンドポイント」

### セキュリティ
- HTTPS対応
  - CloudFrontでSSL証明書を設定し、通信を暗号化
- WAF（Web Application Firewall）
  - CloudFrontにアタッチして、不正アクセスをブロック
  - IP制限、SQLインジェクション対策、レート制限などが可能
- ジオ制限
  - 特定の国からのアクセスを許可／ブロック
- IAM & アクセス権
  - 管理者の操作権限を最小限にする

👉 一言でいうと：  
「CloudFront＋WAFで、配信経路にセキュリティレイヤーを追加し、不要なアクセスや攻撃を防ぐ仕組み」

### 代替ドメイン名 (Alternate Domain Name / CNAME)
- CloudFrontのデフォルトドメイン（例: `xxxx.cloudfront.net`）ではなく、独自ドメイン（例: `www.example.com` ）でアクセスできるようにするための設定
- ACMの証明書も、この独自ドメインに対応したものを紐づける必要がある

👉 一言でいうと：  
「CloudFrontに独自ドメインを割り当てるための設定」  

実務イメージ：  
- ユーザーは `https://www.example.com` でアクセス
- Route53で `www.example.com` → CloudFrontのディストリビューション にCNAMEレコードを設定
- CloudFrontの「代替ドメイン名」に `www.example.com` を登録

## 実務で見た設定
- 公開しているWordPressサイトの構成
  - CloudFront (CDN)
    - ユーザーに近い場所からコンテンツをキャッシュ配信 → 表示を高速化し、EC2の負荷を軽減
    - オリジン
      - S3
      - Custom Origin
        - ELBを指定、ELB配下のEC2でWordPressを動かしている
    - セキュリティ
      - WAFが設定されている
        - ステージング環境は、RulesにIP制限が設定されたWAFになっている
    - HTTPS
      - ACMで発行した証明書をアタッチしている
    - 代替ドメイン名
      - Route53で管理している独自ドメインを指定している
  - ELB (Elastic Load Balancer)
    - 複数のEC2にリクエストを振り分ける → 負荷分散と冗長化
  - EC2 (Webサーバ群)
    - WordPress本体が動作するサーバ → スケールアウト可能
  - RDS (Relational Database Service)
    - WordPressのデータベースをホスト → マネージドDBでバックアップや冗長化が容易


