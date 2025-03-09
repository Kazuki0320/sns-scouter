# ESLint 設定手順

以下の手順に従って、ESLintの設定を行います。

## 手順

1. プロジェクトのルートディレクトリに移動します。
2. `@typescript-eslint/eslint-plugin` パッケージをインストールします。

```sh
pnpm add -D @typescript-eslint/eslint-plugin
```

3. `eslint.config.mjs` ファイルを開きます。
4. 以下の設定を追加します。

```javascript
const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      '@typescript-eslint/naming-convention': [
        // 既存の設定
      ],
      semi: ['error', 'always'],
      quotes: [
        'error',
        'single',
        { avoidEscape: true, allowTemplateLiterals: true },
      ],
    },
  },
];
```

5. ファイルを保存して閉じます。
6. プロジェクトのルートディレクトリで `eslint` を実行し、設定が正しく適用されていることを確認します。

以上で設定は完了です。
