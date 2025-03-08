## pnpm

### pnpm dev

```
% pnpm dev

> sns-scouter@0.1.0 dev /Users/kenyakudo/Practice/sns-scouter/sns-scouter
> next dev --turbopack

sh: next: command not found
 ELIFECYCLE  Command failed.
```

解決策

- pnpm i すればOK
- package.json の中に書いてあるライブラリを一通りインストールしてくれる
- インストールしたものはいつの間にかできている node_modules の中にある

## npm

### npm run dev

```
% npm run dev

> sns-scouter@0.1.0 dev
> next dev --turbopack

sh: next: command not found
```

解決策

- npm i すればOK
- package.json の中に書いてあるライブラリを一通りインストールしてくれる
- インストールしたものはいつの間にかできている node_modules の中にある

## npm run dev

```
% npm run dev

> sns-scouter@0.1.0 dev
> next dev --turbopack

You are using Node.js 16.14.0. For Next.js, Node.js version "^18.18.0 || ^19.8.0 || >= 20.0.0" is required.
```

解決策

- node コマンドのバージョンが古いため怒られる
  - nvm かなんかのバージョン管理ツールを使って、切り替えできるようにしておく
