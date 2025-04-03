# Laravelのディレクトリ構成
レイヤードアーキテクチャの考え方と、DDDの考え方を取り入れた構成を意識している。  

- app
  - Console(※バッチ)
    - Command
  - Http(※プレゼンテーション層)
    - Controllers
    - Middleware
    - Request
  - Application(※アプリケーション層)
    - Context(※コンテキストごと)
      - UseCase
      - Dto
  - Domain(※ドメイン層)
    - Constants
    - Context(※コンテキストごと)
      - ValueObject
      - Entity
      - DomainService
      - Exception
      - Factory
      - Repository
      - Strategy
  - Infrastructure(※インフラストラクチャ層)
    - EloquentModel
    - Repository
    - Mapper
  - Providers
- tests
  - Unit
    - Domain
    - Application
  - Feature
    - Http

## Http(※プレゼンテーション層)
プレゼンテーション層として、APIリクエストを受け取り、レスポンスを返す。

<details>

<summary>Http内の説明</summary>

### Controllers
APIのリクエストを受けて実行されるController。  
Requestクラスを使ったバリデーションを実行し、問題なければUseCaseクラスのビジネスロジックを実行する。  

### Middleware
リクエストやレスポンスの前後処理を行う。  
ex. 認証、CORS設定、リクエストログの記録  

### Request
各APIごとのRequestクラス。  
Requestクラスで行うバリデーションは必須チェックや型のチェックのみ。  
業務知識に関するチェックはドメイン層(ValueObjectなど)で行う。  

### Exception
アプリケーション全体で使用する例外処理を定義。  

</details>

## Application(※アプリケーション層)
アプリケーション層として、ユースケース(ビジネスロジックの流れ)を定義。  

<details>

<summary>Application内の説明</summary>

### UseCase
各ユースケースごとにクラスを作成し、ビジネスロジックの流れを定義。  

### Dto
データ転送オブジェクト(DTO)を定義。  
DTOは業務的な知識やロジックを持たないため、Applicationに実装する。  
ex. リクエストデータをユースケースに渡すための構造や、テーブルINSERT用のデータ構造  

</details>

## Domain(※ドメイン層)
ドメイン層として、業務知識やビジネスルールを定義。  

<details>

<summary>Domain内の説明</summary>

### Constants
コード値や定数を定義するクラスを配置。  
ex. ステータスコード、削除フラグ

### Context
ドメインごとに以下のクラスを配置。

#### ValueObject
値オブジェクトを定義。  
コード値や金額など、業務知識の関係するシステム固有の値を表現するためのクラスを実装する。  
ガード節を含んだnewメソッドを使い、正しいインスタンスが生成されるようにする。  

#### Entity
ドメインエンティティを定義。  
ValueObjectなどを組み合わせながら、業務的なデータのまとまりを表現するためのクラスを実装する。  
Entityというより、「集約(Aggregate)」にあたるものもここに定義する。  

#### DomainService
ドメインロジックを定義するサービスクラス。  
ValueObjectやEntityだけでは表現できないようなロジックを実装する。(複数のドメインオブジェクトをまたぐ処理など)  
実装させたい処理ごとにクラスを分ける。(クラスの肥大化を防ぐため)

#### Factory
オブジェクトを生成する際、複雑な処理が必要なときに使用する。  

#### Repository
リポジトリインタフェースを定義。  

#### Strategy
条件によって処理を切り替えるなど、ストラテジパターンを実現するためのクラスを配置する。  
ストラテジパターンを用いることで、条件分岐（if文やswitch文）を減らし、柔軟で拡張性の高い設計を実現する。  
主に以下のようなケースで使用する：  
ex. 業務ルールが複数のパターンに分かれており、動的に切り替える必要がある場合。  
ex. 処理の切り替えをクラス単位で管理したい場合。

</details>

## Infrastructure(※インフラストラクチャ層)
インフラストラクチャ層として、データベースや外部システムとのやり取りを実装。

<details>

<summary>Infrastructure内の説明</summary>

### EloquentModel
LaravelのEloquentモデルを配置。  
ドメインのエンティティと区別するため、クラス名の頭には「Eloquent」をつける。  

### Repository
ドメイン層で定義されたリポジトリインタフェースの実装を配置。  
EloquentModelを使用し、DBへの登録、DBからの取得といった処理を実装する。  

### Mapper
EloquentModelをドメインエンティティに変換するクラスを配置。  

</details>

## Providers
サービスプロバイダを定義。  
アプリケーションの初期設定やサービスコンテナへのバインディングを行うクラス。  
ex. リポジトリインタフェースと実装のバインディング

## Console
バッチ処理やコマンドラインタスクを実行するためのクラスを配置。  

<details>

<summary>Console内の説明</summary>

### Command
Laravelのartisanコマンドで実行可能なカスタムコマンドを定義。  
定期的なデータ処理やバックグランドで実行するタスクなどを実装。  
APIと同様に、UseCaseクラスをアプリケーション層に定義してロジックを実行する。  

</details>

## tests
テストコードを配置。  

<details>

<summary>tests内の説明</summary>

### Unit
ユニットテストを配置。  
ex. ドメインロジックやユースケースのテスト

### Feature
機能テストを配置。  
ex. APIエンドポイントのテスト、ユーザーフローのテスト

</details>
