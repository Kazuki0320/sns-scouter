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
├── pages/
├── public/
├── styles/
├── components/
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
- **pages/**: Next.jsのページコンポーネント
- **public/**: 公開用の静的ファイル
- **styles/**: スタイルシート
- **components/**: 再利用可能なReactコンポーネント
- **node_modules/**: npmパッケージ
- **package.json**: プロジェクトの設定と依存関係
- **README.md**: プロジェクトの概要
