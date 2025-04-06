## プロンプト

================================================================
End of Codebase
================================================================

---

既存のJestで記載されたテストを、GitHub Actions によって CI による実行ができるようにしたいです。
必要な手順を、コーディングエージェントに指示できるようにまとめてください。

## 生成結果

はい、承知いたしました。既存のJestテストをGitHub ActionsでCI実行するための手順をまとめます。

**手順:**

**1. GitHub Actions ワークフローファイルの作成**

プロジェクトのルートディレクトリに `.github/workflows` ディレクトリを作成します。その中に、CI用のワークフローファイル（例: `ci.yml`）を作成します。

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: ['main'] # mainブランチへのプッシュ時に実行
  pull_request:
    branches: ['main'] # mainブランチへのプルリクエスト時に実行

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '22' # プロジェクトで使用しているNode.jsのバージョンに合わせてください

      - name: Install pnpm manually
        run: npm install -g pnpm@9 # プロジェクトでpnpmを使用している場合

      - name: Verify pnpm installation
        run: |
          if ! pnpm --version; then
            echo "pnpm is not installed"
            exit 1
          fi

      - name: Install dependencies
        run: pnpm install --no-frozen-lockfile # または npm install

      - name: Run tests with Jest
        run: pnpm test --ci --coverage # または npm test -- --ci --coverage
```

**設定項目の説明:**

- `name: CI`: ワークフローの名前を定義します。
- `on:`: ワークフローをトリガーするイベントを定義します。
  - `push:`: 特定のブランチへのプッシュ時に実行します。ここでは `main` ブランチを指定しています。
  - `pull_request:`: 特定のブランチへのプルリクエスト時に実行します。ここでは `main` ブランチを指定しています。
- `jobs:`: 実行するジョブを定義します。ここでは `build` というジョブを定義しています。
  - `runs-on: ubuntu-latest`: ジョブを実行する仮想環境を指定します。
  - `steps:`: ジョブ内で実行するステップを定義します。
    - `actions/checkout@v3`: リポジトリのコードをワークフローの仮想環境にチェックアウトします。
    - `actions/setup-node@v3`: Node.jsの環境をセットアップします。`node-version` で使用するバージョンを指定します。**必ずプロジェクトで使用しているNode.jsのバージョンに合わせてください。**
    - `Install pnpm manually` と `Verify pnpm installation`: プロジェクトで pnpm を使用している場合に、手動でインストールし、インストールされていることを確認します。npm を使用している場合はこれらのステップは不要です。
    - `Install dependencies`: プロジェクトの依存関係をインストールします。pnpm を使用している場合は `pnpm install --no-frozen-lockfile`、npm を使用している場合は `npm install` を実行します。`--no-frozen-lockfile` は、CI環境でロックファイルが完全に一致しない場合にエラーを防ぐためのオプションです（必要に応じて調整してください）。
    - `Run tests with Jest`: Jest のテストを実行します。
      - `pnpm test:coverage`:`coverage` はカバレッジレポートを生成するフラグです。
      - `npm test -- --ci --coverage` (npmの場合): `--` は npm スクリプトに続く引数をJestに渡すための区切り文字です。

**2. `package.json` の `test` スクリプトの確認**

`package.json` の `scripts` セクションに、Jest を実行するための `test` スクリプトが定義されていることを確認してください。一般的には以下のようになっているはずです。

```json
{
  "scripts": {
    "test": "jest"
    // ... 他のスクリプト
  }
}
```

必要に応じて、CI環境に適したオプション（例: `--ci`, `--coverage`) をこのスクリプトに追加することもできますが、ワークフローファイルで指定する方が柔軟性が高いです。

**3. リポジトリへのワークフローファイルのコミットとプッシュ**

作成したワークフローファイルを Git に追加し、コミットして GitHub リポジトリにプッシュします。

```bash
git add .github/workflows/ci.yml
git commit -m "Add CI workflow for Jest tests"
git push origin main
```

**4. GitHub Actions の実行確認**

上記のプッシュまたは `main` ブランチへのプルリクエストの作成をトリガーとして、GitHub Actions が自動的に実行されます。GitHub リポジトリの "Actions" タブでワークフローの実行状況を確認できます。

**コーディングエージェントへの指示例:**

「上記の `ci.yml` の内容で GitHub Actions のワークフローファイルを作成し、プロジェクトの `.github/workflows` ディレクトリに保存してください。Node.js のバージョンは `22` を使用してください。また、テストの実行には `pnpm test --ci --coverage` を使用してください。」

または、npm を使用している場合は

「上記の `ci.yml` の内容で GitHub Actions のワークフローファイルを作成し、プロジェクトの `.github/workflows` ディレクトリに保存してください。Node.js のバージョンは `22` を使用してください。また、テストの実行には `npm test -- --ci --coverage` を使用してください。」

**補足:**

- Node.js のバージョンは、プロジェクトの `package.json` で指定されているバージョンや、開発環境で使用しているバージョンに合わせてください。
- テスト実行コマンド (`pnpm test` または `npm test`) は、プロジェクトの `package.json` に定義されている `test` スクリプトを実行します。
- 必要に応じて、ワークフローに lint チェックやビルド処理などを追加することもできます。
- カバレッジレポートの生成結果を Codecov や Coveralls などのサービスに連携させることで、より詳細な分析や可視化が可能になります。

この手順に従うことで、既存のJestテストをGitHub ActionsによるCIで自動的に実行できるようになります。

## 実装結果

GitHub Actions による CI の仕組みを追加しました：

1. `.github/workflows/ci.yml` を作成し、以下の機能を実装:

   - `main` ブランチへのプッシュとプルリクエスト時に自動実行
   - Node.js v22 環境でのテスト実行
   - pnpm を使用した依存関係のインストールとテスト実行
   - Jest テストの CI モードでの実行とカバレッジレポートの生成

2. CI 実行の確認方法:
   - GitHub リポジトリの "Actions" タブで実行状況を確認できます
   - 各プッシュやプルリクエスト時に自動的にテストが実行されます

## ふりかえり

1. **成果**

   - GitHub Actionsを用いたCI環境の構築により、自動テスト実行の仕組みを整備
   - pnpmとJestを組み合わせた効率的なテスト実行環境の確立
   - カバレッジレポート生成による品質管理の基盤構築

2. **学んだこと**

   - GitHub Actionsのワークフロー設定方法
   - CI環境でのNode.jsアプリケーションのテスト実行プロセス
   - pnpmを使用したパッケージ管理とテスト実行の最適化

3. **今後の改善点**
   - lint チェックやビルド処理の追加検討
   - テスト実行の並列化やキャッシュ戦略の最適化
