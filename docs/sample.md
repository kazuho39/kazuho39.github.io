```mermaid
erDiagram
    CATEGORY ||--o{ SUBCATEGORY : has
    SUBCATEGORY ||--o{ PRODUCT : includes
    PRODUCT ||--o{ ORDER : appears_in
```

