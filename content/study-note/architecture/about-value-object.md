# ValueObjectの実装
## ValueObjectとは
システムで取り扱う値そのものを定義するためのオブジェクト。  
ただ値を保持するだけでなく、「ふるまい」を持つことができる。  

## ValueObjectの特徴
### 1. 不変であること
値オブジェクトは、一度作成したらその状態を変更することは行わない。  
値を変更する必要があるときには、新しく値オブジェクトのインスタンスを生成する。  
e.g. 「住所」や「金額」は変更されるのではなく、新しい値として置き換える

### 2. 等価性によって比較する
値オブジェクトは、同一性(ID)ではなく、その値が等しいかどうかで比較する。  
e.g. 2つの「金額オブジェクト」が同じ金額を持っていれば、それらは等しい、とみなされる

### 3. ドメインロジックを閉じ込める
値オブジェクトは、値に関連するロジック(バリデーションや計算など)を自身の中に持つ。  

## ValueObjectのメリット
### ドメインに関するロジックを明確化できる
値に関するロジックを値オブジェクト内に閉じ込めることで、コードの可読性と保守性が向上する。  


## ValueObject実装のポイント
### ガード節
不正な値が入らないようにするため、インスタンスを生成するときにはバリデーションを行うためのガード節を入れる。  

### newメソッドによるインスタンス生成
コンストラクタがpublicだと、ValueObjectのクラスを継承した派生クラスを実装することができてしまう。  
ValueObjectのクラスのみで完結し、意図しない実装が行われないようにするため、インスタンスを生成するためのnewメソッドを実装する。  

## ValueObjectのサンプル
```php
<?php

final class Money
{
    private float $amount;
    private string $currency;

    /**
     * コンストラクタ
     *
     * @param float $amount 金額
     * @param string $currency 通貨コード（例: USD, JPY）
     */
    private function __construct(float $amount, string $currency)
    {
        $this->amount = $amount;
        $this->currency = $currency;
    }

    /**
     * 生成メソッド
     *
     * @param float $amount 金額
     * @param string $currency 通貨コード（例: USD, JPY）
     * @throws InvalidArgumentException
     */
    public static function new(float $amount, string $currency): Money
    {
        // ガード節
        if ($amount < 0) {
            throw new InvalidArgumentException("金額は0以上である必要があります。");
        }

        if (!in_array($currency, ['USD', 'JPY', 'EUR'], true)) {
            throw new InvalidArgumentException("無効な通貨コードです: {$currency}");
        }
        return new self($amount, $currency);
    }

    /**
     * 金額を取得
     *
     * @return float
     */
    public function amount(): float
    {
        return $this->amount;
    }

    /**
     * 通貨コードを取得
     *
     * @return string
     */
    public function currency(): string
    {
        return $this->currency;
    }

    /**
     * 同じ金額かどうかを比較
     *
     * @param Money $other
     * @return bool
     */
    public function equals(Money $other): bool
    {
        return $this->amount === $other->amount() && $this->currency === $other->currency();
    }

    /**
     * 金額を加算
     *
     * @param Money $other
     * @return Money
     * @throws InvalidArgumentException
     */
    public function add(Money $other): Money
    {
        if ($this->currency !== $other->currency) {
            throw new InvalidArgumentException("通貨コードが一致しないため、加算できません。");
        }

        return Money::new($this->amount + $other->amount(), $this->currency);
    }

    /**
     * 金額を文字列として取得
     *
     * @return string
     */
    public function __toString(): string
    {
        return "{$this->amount} {$this->currency}";
    }
}
```
