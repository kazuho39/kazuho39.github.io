```mermaid
erDiagram
    %% === レイヤと凡例 ===
    %% MermaidのerDiagramはsubgraph非対応なので、テーブル名接頭辞や色で区別します
    %% SRC_ = 既存/参照元, WRK_ = 作業用(ワーク/ステージング), TGT_ = 参照先/移行先

    SRC_USER        ||--o{  WRK_USER      : extract
    SRC_USER_ADDR   ||--o{  WRK_USER_ADDR : extract

    WRK_USER        ||--o{  WRK_USER_MERGED : transform
    WRK_USER_ADDR   ||--o{  WRK_USER_MERGED : transform

    WRK_USER_MERGED ||--o{  TGT_CUSTOMER      : load
    WRK_USER_MERGED ||--o{  TGT_CUSTOMER_ADDR : load

    SRC_USER {
      INT    id PK
      STRING name
      STRING email
    }

    SRC_USER_ADDR {
      INT    id PK
      INT    user_id FK
      STRING zip
      STRING address
    }

    WRK_USER {
      INT    src_id
      STRING name_normalized
      STRING email_cleansed
    }

    WRK_USER_ADDR {
      INT    src_addr_id
      INT    src_user_id
      STRING zip_norm
      STRING address_norm
    }

    WRK_USER_MERGED {
      INT    src_id
      STRING name_final
      STRING email_final
      STRING address_final
    }

    TGT_CUSTOMER {
      INT    id PK
      STRING name
      STRING email
    }

    TGT_CUSTOMER_ADDR {
      INT    id PK
      INT    customer_id FK
      STRING address
      STRING zip
    }

```


```mermaid
flowchart LR
    %% レイヤをsubgraphで分ける
    subgraph Source [Source (既存DB)]
      s_user[table: SRC_USER]
      s_addr[table: SRC_USER_ADDR]
    end

    subgraph Staging/Work
      w_user[table: WRK_USER\n(正規化/クレンジング)]
      w_addr[table: WRK_USER_ADDR\n(正規化/クレンジング)]
      w_merge[table: WRK_USER_MERGED\n(統合/サロゲートキー割当)]
    end

    subgraph Target [Target (移行先DB)]
      t_cust[table: TGT_CUSTOMER]
      t_addr[table: TGT_CUSTOMER_ADDR]
    end

    %% ステップ（ラベル付きエッジ）
    s_user -->|Extract| w_user
    s_addr -->|Extract| w_addr
    w_user -->|Transform(join/map)| w_merge
    w_addr -->|Transform(join/map)| w_merge
    w_merge -->|Load| t_cust
    w_merge -->|Load(map to FK)| t_addr

    %% 失敗時の巻き戻しやユニーク制約検証など
    w_merge -. precheck: uniqueness/email format .-> t_cust
```

```mermaid
flowchart TD
    A[Step A: Extract SRC_* → WRK_*] --> B[Step B: Transform & Merge]
    B --> C[Step C: Load TGT_CUSTOMER]
    C --> D[Step D: Load TGT_CUSTOMER_ADDR]
    B --> E[Step E: Data Quality Checks]
    E --> C
```


| Target Column           | From (Source/Work)       | Rule/Transform                         | Notes                     |
|-------------------------|--------------------------|----------------------------------------|---------------------------|
| TGT_CUSTOMER.name       | WRK_USER_MERGED.name_final | trim, toTitleCase                      | null禁止                  |
| TGT_CUSTOMER.email      | WRK_USER_MERGED.email_final| lowercase, RFC validation              | 一意制約(UQ)              |
| TGT_CUSTOMER_ADDR.zip   | WRK_USER_MERGED.address_final | regex normalize (NNN-NNNN to NNNNNNN) | ハイフン除去              |
| TGT_CUSTOMER_ADDR.address | WRK_USER_MERGED.address_final | fallback to SRC_USER_ADDR.address      | 空ならSRCにフォールバック |
