# Prettierの導入手順

このドキュメントでは、Prettierをプロジェクトに導入する手順を説明します。

## 手順

1. **Prettierのインストール**

   プロジェクトのルートディレクトリで以下のコマンドを実行して、Prettierをインストールします。

   ```bash
   pnpm add -D prettier
   ```

2. **設定ファイルの作成**

   プロジェクトのルートディレクトリに`.prettierrc`ファイルを作成し、以下の内容を記載します。

   ```json
   {
     "semi": true,
     "singleQuote": true,
     "trailingComma": "es5"
   }
   ```

3. **.prettierignoreの作成**

   プロジェクトのルートディレクトリに`.prettierignore`ファイルを作成し、以下の内容を記載します。

   ```
   node_modules
   build
   ```

4. **Prettierの実行**

   以下のコマンドを実行して、プロジェクト内のファイルを整形します。

   ```bash
   pnpx prettier --write .
   ```

## 参考リンク

- [Prettier公式ドキュメント](https://prettier.io/docs/en/index.html)

## 振り返り

### 良かった点

- Prettierを導入することで、コードの整形が自動化され、コードの一貫性が保たれるようになりました。
- `.prettierrc`ファイルと`.prettierignore`ファイルを作成することで、プロジェクト全体で統一されたコードスタイルを適用できました。

### 改善点

- 今後、プロジェクトメンバー全員にPrettierの使用を徹底するためのガイドラインを作成する必要があります。
  - **ガイドラインの徹底方法**
    - プロジェクトのREADMEにPrettierの使用方法とルールを明記する。
    - コードレビュー時にPrettierが適用されているかを確認する。
    - Prettierの設定をエディタに統合し、保存時に自動整形されるようにする。
    - CI/CDパイプラインにPrettierのチェックを追加し、整形されていないコードのマージを防ぐ。

### 学んだこと

- pnpmを使用してパッケージをインストールする方法を学びました。
- Prettierの設定ファイルと無視ファイルの作成方法を理解しました。
