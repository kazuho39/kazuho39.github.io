# よく使うGitコマンド
## リモートリポジトリ
### リモート -> ローカル
#### リモートにあるリポジトリをローカルに複製する

```bash:
git clone リポジトリURL
```

#### ローカルをリモートの内容で最新化する

```bash:
git pull
```

#### リモートブランチをローカルに落とす

```bash:
# ローカルのリモート追跡ブランチに持ってきたあと、ローカルにブランチを作成する
git fetch
git checkout -b feature-XXXXXX origin/feature-XXXXXX
```
