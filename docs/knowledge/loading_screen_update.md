# ローディング画面の更新手順

## 1. `loading.tsx`の更新

以下の変更を行います：

1. `countUp`のdivにテキストを追加します。

```typescript
// filepath: sns-scouter/src/app/result/loading.tsx
import styles from '@/app/result/loading.module.css';

export default function Loading() {
  return (
    <div className={styles.lpage}>
      <div className={styles.countUp}>
        <span className={styles.text}>測定中...</span>
      </div>
    </div>
  );
}
```

### 効果

- ローディング画面に「測定中...」というテキストが表示され、ユーザーに処理が進行中であることを視覚的に伝えます。

## 2. `loading.module.css`の更新

CSSにアニメーションとスタイルを追加します：

1. `countUp`にアニメーションを追加します。
2. `text`クラスを追加し、テキストにアニメーションを適用します。

```css
/* filepath: /sns-scouter/src/app/result/loading.module.css */
.countUp {
  counter-set: countUp var(--count);
  animation: countUp 3.6s 1;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(1, 0.4, 0.2, 1);
  font-variant-numeric: tabular-nums;
  font-size: 3rem;
  position: relative; /* 追加 */
}

/* 追加 */
.text {
  position: absolute;
  top: -2rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.5rem;
  animation: textFade 1.5s infinite;
}

/* 追加 */
@keyframes textFade {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
```

### 効果

- `countUp`に`position: relative;`を追加することで、内部のテキストが相対的に配置されます。
- `text`クラスを追加し、テキストにフェードイン・フェードアウトのアニメーションを適用することで、ユーザーに動的な視覚効果を提供します。
