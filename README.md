# sns-scouter

# Next.js プロジェクト

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
npm run dev
```

デフォルトでは、`http://localhost:3000` でアプリが起動します。

## 📦 ビルドとデプロイ
本番環境向けにビルドするには、以下のコマンドを実行します。
```bash
npm run build
```

ビルド完了後、サーバーを起動するには以下を実行します。
```bash 
npm run start
```

## 📂 ディレクトリ構成
```
/
├── app/              # Next.jsのApp Routerディレクトリ
│   ├── layout.tsx   # 共通レイアウト
│   ├── api/         # APIエンドポイント
│   └── _components/ # 再利用可能なUIコンポーネント
├── public/          # 静的ファイル（画像, フォントなど）
├── styles/          # グローバルCSS
├── package.json     # プロジェクト設定と依存関係
└── next.config.js   # Next.js の設定
```

## 🛠️ その他のコマンド
### **Lint チェック**
```bash
npm run lint
```

### **テスト実行**（Jest を使用する場合）
```bash
npm run test
```
