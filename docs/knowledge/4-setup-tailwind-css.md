# Tailwind CSS の導入手順

このドキュメントでは、プロジェクトに Tailwind CSS を導入する手順を説明します。

## 手順

1.  **Tailwind CSS の使用**

Tailwind CSS のクラスを使用して、コンポーネントのスタイリングを行います。例えば、以下のようにクラスを追加します。

```typescript
// filepath: /sns-scouter/src/pages/index.tsx
export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold">Hello, Tailwind CSS!</h1>
    </div>
  );
}
```

2. **コンポーネントの中央寄せ**

   `src/app/experiment/page.tsx` ファイルを開き、すべての要素を中央寄せにするために、親要素に Tailwind CSS のクラスを追加します。

   ```typescript
   // filepath: sns-scouter/src/app/experiment/page.tsx
   import React from 'react';
   import { Button, createButtonProps } from '@/app/button';

   export default function Page() {
     const buttonProps = createButtonProps('button', 'Submit', 'lightblue');

     return (
       <div className="flex flex-col items-center justify-center min-h-screen">
         <h2>Experiment Page</h2>
         <h3>例えば、ここでコンポーネントのボタンを置いて挙動のテストをする</h3>
         <Button button={buttonProps} />
         <h3>
           例えば、ここでフォロワー数取得のロジックを置いて挙動のテストをする
         </h3>
         <p>hello, world</p>
         <div className="mx-auto p-4">
           <h1 className="text-4xl font-bold">Hello, Tailwind CSS!</h1>
         </div>
       </div>
     );
   }
   ```

## クラスの解説

- `flex`: 要素をフレックスコンテナに変換します。これにより、子要素がフレックスアイテムとして扱われます。
- `flex-col`: フレックスコンテナの方向を縦方向（列）に設定します。
- `items-center`: フレックスアイテムを交差軸（通常は垂直方向）に中央揃えにします。
- `justify-center`: フレックスアイテムをメイン軸（通常は水平方向）に中央揃えにします。
- `min-h-screen`: 要素の最小高さをビューポートの高さと同じに設定します。これにより、要素が画面全体を覆うようになります。

## KPT振り返り

### Keep（良かったこと）

- Tailwind CSS の導入がスムーズに行えた。
- 共通のレイアウトコンポーネントを使用することで、すべてのページに一貫したスタイルを適用できた。
- ドキュメントを通じて、手順を明確に共有できた。

### Problem（問題点）

- 初期設定や共通レイアウトの適用に関する知識が不足していたため、最初の設定に時間がかかった。
- Tailwind CSS のクラス名が多くなり、コードが読みにくくなる可能性がある。

### Try（次に試したいこと）

- Tailwind CSS のカスタムクラスを作成し、コードの可読性を向上させる。
- Tailwind CSS の公式ドキュメントをさらに読み込み、より高度な使い方を学ぶ。
- プロジェクト全体のスタイルガイドを作成し、チーム全体で一貫したスタイリングを維持する。
