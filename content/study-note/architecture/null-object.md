# Null Objectパターン
## Null Objectとは
Null Objectとは、オブジェクトが「何も無い(null)」という状態を表現するための特別なオブジェクト。  
通常のnull値を使用する代わりに、特定の振る舞いをもつオブジェクトを利用することで、安全性や可読性を向上させるデザインパターンの一種。  

## Null Objectの特徴
### 1. 振る舞いを持つ「空のオブジェクト」
Null Objectは、通常のオブジェクトと同じインターフェースやメソッドを持つが、メソッドの実装は「何もしない」か「デフォルトの値を返す」ように設計される。  

### 2. nullチェックを不要にする
Null Objectを使用することで、コード中でnullチェックを行う必要がなくなり、コードが簡潔になる。  

### 3. 安全性の向上
nullを直接扱うと、NullPointerException（PHPではErrorやTypeError）が発生するリスクがありますが、Null Objectを使用することでこれを防ぐことができる。  

### 4. 一貫性のある振る舞い
Null Objectは、通常のオブジェクトと同じインターフェースを持つため、コードの一貫性が保たれる。  

