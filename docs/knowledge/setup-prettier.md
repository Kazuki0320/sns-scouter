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
