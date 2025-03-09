# sns-scouter

フォロワー数の入力を受け取り、SNSアカウントのスコアを算出するアプリケーションです。

## 📌 プロジェクト概要

このプロジェクトは Next.js を使用した Web アプリケーションです。

## 🚀 セットアップ

### 1️⃣ リポジトリのクローン

```bash
git clone https://github.com/your-username/sns-scouter.git
```

## 🏃‍♂️ 開発サーバーの起動

開発環境でアプリを実行するには、以下のコマンドを使用します。

```bash
pnpm i

pnpm dev
```

デフォルトでは、`http://localhost:3000` でアプリが起動します。

## 🛠️ その他のコマンド

### **Lint チェック**

```bash
npm run lint
```

### **ビルド && プロジェクトの開始**

> [!NOTE]
> 普段の開発ではpnpm devを実施すれば十分です

以下のコマンドを実行して、プロジェクトをビルドします。

```bash
pnpm build
```

以下のコマンドを実行して、ビルドされたプロジェクトを開始します。

```bash
pnpm start
```

### **コードの整形**

以下のコマンドを実行して、Prettierでコードを整形します。

```bash
pnpm fmt
```

VSCodeの設定でファイル保存時に自動でPrettierが走るようにする方法については、[こちら](./docs/knowledge/setup-prettier.md#visual-studio-code-vscode)を参照してください。
