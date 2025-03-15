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

以上で、Tailwind CSS の導入が完了です。
