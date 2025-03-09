# プロジェクトの構造

このドキュメントでは、プロジェクトのディレクトリ構造と各ディレクトリの役割について説明します。

## ディレクトリ構造

```
sns-scouter/
├── docs/
│   ├── README.md
│   ├── guide/
│   │   ├── structure.md
│   │   └── technology.md
│   ├── experiment/
│   └── survey/
├── src/
│   └── app/
├── public/
├── node_modules/
├── package.json
├── README.md
└── ...
```

## 各ディレクトリの説明

- **docs/**: プロジェクトに関するドキュメントを格納
- **guide/**: ガイドドキュメント
- **experiment/**: 実験用のコードを格納
- **survey/**: 調査内容をまとめたディレクトリ
- **src/app/**: Next.js のページコンポーネントを格納
- **public/**: 公開用の静的ファイルを格納
- **node_modules/**: npm パッケージを格納
- **package.json**: プロジェクトの設定と依存関係を定義
- **README.md**: プロジェクトの概要を記載
