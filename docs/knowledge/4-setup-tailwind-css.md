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
