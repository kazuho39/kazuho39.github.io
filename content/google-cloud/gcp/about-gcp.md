# Google Cloud Platformとは
## GCP
<a href="https://cloud.google.com/?hl=ja" target="_blank">Google Cloud</a>  
GCP(Google Cloud Platform)は、Googleが提供するクラウドサービス群の総称。  
AWS (Amazon Web Services) や Microsoft Azure と同じく、インターネット経由で「サーバ」「ストレージ」「データベース」「AI」などを利用できるプラットフォーム。

## 特徴
- Googleのインフラを利用できる
  - 検索エンジンやYouTubeを支える基盤をクラウドとして開放している
  - ネットワーク性能（低レイテンシ・高帯域）は世界トップクラス
- プロジェクト単位で管理
  - AWSは「アカウント単位」で管理するのに対して、GCPは「プロジェクト」という単位でリソースをまとめる
  - 複数プロジェクトを用途ごとに分けて使いやすい
- 課金モデルがシンプル
  - 「秒単位課金」や「自動割引 (Sustained use discount)」がある
  - 使った分だけ支払う従量課金
- 強みはデータとAI
  - BigQuery（超高速データ分析基盤）
  - Vertex AI（機械学習・生成AIプラットフォーム）
  - Google検索や翻訳の技術をベースにしたサービスが豊富

## 主要サービス（AWSとの対応イメージ）
|GCP|AWS|
|:---|:---|
|Compute Engine|AWS EC2（仮想マシン）|
|App Engine|AWS Elastic Beanstalk（PaaS）|
|Cloud Run|AWS Fargate + Lambda（コンテナサーバレス）|
|Kubernetes Engine (GKE)|AWS EKS|
|Cloud Storage|AWS S3（オブジェクトストレージ）|
|Cloud SQL|AWS RDS|
|BigQuery|AWS Redshift（ただし利用感はかなり違う）|

