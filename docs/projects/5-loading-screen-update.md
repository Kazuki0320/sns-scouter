# ローディング画面のUI更新手順

## 数字の上に「測定中...」というテキストを追加

### 1. `loading.tsx`の更新

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

#### 効果

- ローディング画面に「測定中...」というテキストが表示され、ユーザーに処理が進行中であることを視覚的に伝えます。

### 2. `loading.module.css`の更新

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
  background-color: black; /* 追加 */
  color: white; /* 追加 */
  padding: 1rem; /* 追加 */
  border-radius: 0.5rem; /* 追加 */
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

#### 効果

- `countUp`に`position: relative;`を追加することで、内部のテキストが相対的に配置されます。
- `text`クラスを追加し、テキストにフェードイン・フェードアウトのアニメーションを適用することで、ユーザーに動的な視覚効果を提供します。

## 追加アイデア

ユーザーが楽しくなるようなローディング画面のアイデア：

1. **インタラクティブなアニメーション**:

   - ユーザーがクリックやホバーすることで変化するアニメーションを追加します。
   - 例: ローディング中のキャラクターが動いたり、色が変わったりする。

2. **ゲーム要素の追加**:

   - 簡単なミニゲームをローディング画面に組み込み、待ち時間を楽しく過ごせるようにします。
   - 例: シンプルなパズルやクリックゲーム。

3. **進捗バーの追加**:

   - ローディングの進捗状況を示すバーを追加し、ユーザーにどれくらい待つ必要があるかを視覚的に伝えます。

4. **ユーモラスなメッセージ**:

   - ローディング中にユーモラスなメッセージやジョークを表示し、ユーザーの気分を和らげます。
   - 例: 「もう少しで完了します！コーヒーでも飲んでお待ちください。」

5. **カスタマイズ可能なテーマ**:
   - ユーザーがローディング画面のテーマや背景をカスタマイズできるようにします。
   - 例: 好きな画像や色を設定できるオプションを提供。

これらのアイデアを実装することで、ユーザーにとってより楽しいローディング体験を提供できます。

## 数字の背景色を黒色に変更

### 1. `loading.module.css`の更新

#### 効果

- ローディング画面の数字背景を黒くし、文字色を白に変更することで、数字が目立ちやすくなります。

CSSにアニメーションとスタイルを追加します：

1. `countUp`クラスに背景色と文字色を追加します。
2. `text`クラスの文字色を変更します。

```css
/* filepath: /sns-scouter/src/app/result/loading.module.css */
.countUp {
  counter-set: countUp var(--count);
  animation: countUp 3.6s 1;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(1, 0.4, 0.2, 1);
  font-variant-numeric: tabular-nums;
  font-size: 3rem;
  position: relative;
  background-color: black;
  color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  width: 15rem; /* 固定の幅を設定 */
  text-align: center; /* テキストを中央に配置 */
}

.text {
  position: absolute;
  top: -2rem; /* 数字の背景の外に配置 */
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.5rem;
  animation: textFade 1.5s infinite;
  color: black; /* 文字色を黒に設定 */
}
```

### 効果

- `countUp`クラスに背景色と文字色を追加することで、数字の背景が黒くなり、文字が白く表示されます。

## 数字背景の横幅を固定に変更

以下の変更を行います：

1. `countUp`クラスに固定の幅を設定し、テキストが中央に配置されるようにします。
2. `overflow: hidden;`を削除し、`countUp`要素の幅を調整します。

```css
/* filepath: /sns-scouter/src/app/result/loading.module.css */
.countUp {
  counter-set: countUp var(--count);
  animation: countUp 3.6s 1;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(1, 0.4, 0.2, 1);
  font-variant-numeric: tabular-nums;
  font-size: 3rem;
  position: relative;
  background-color: black;
  color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  width: 15rem; /* 固定の幅を設定 */
  text-align: center; /* テキストを中央に配置 */
  /* overflow: hidden; 削除 */
}

.text {
  position: absolute;
  top: -2rem; /* 数字の背景の外に配置 */
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.5rem;
  animation: textFade 1.5s infinite;
  color: black; /* 文字色を黒に設定 */
}

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

- `countUp`クラスに固定の幅を設定することで、数字の背景が横に広がらず、一定の幅を保ちます。
- `overflow: hidden;`を削除することで、`text`クラスのテキストが隠れずに表示されます。

## 振り返り

### Keep

- ローディング画面に「測定中...」というテキストを追加し、ユーザーに処理が進行中であることを視覚的に伝えることができた。
- 数字の背景に黒色を追加し、視覚的に見やすくすることができた。
- フェードイン・フェードアウトのアニメーションを追加し、動的な視覚効果を提供できた。

### Problem

- `overflow: hidden;`が原因で、`text`クラスのテキストが表示されない問題が発生した。
- 数字の背景の横幅が固定されていなかったため、桁数が増えると背景が広がってしまった。

### Try

- 今後、デザイン変更時には、要素の表示や配置に影響を与えるプロパティに注意する。

## 今回使用した CSS について

### `@property`

`@property`は、CSSカスタムプロパティ（変数）に対して型、安全な初期値、および継承の制御を提供するための機能です。これにより、アニメーションやトランジションで使用するカスタムプロパティの動作をより細かく制御できます。

```css
@property --count {
  syntax: '<integer>';
  inherits: false;
  initial-value: 0;
}
```

### `counter-set` と `counter`

`counter-set`は、CSSカウンターを設定するためのプロパティです。`counter`は、カウンターの値を表示するために使用されます。これにより、カウントアップやカウントダウンのアニメーションを簡単に実装できます。

```css
.countUp {
  counter-set: countUp var(--count);
}

.countUp::after {
  content: counter(countUp);
}
```

### `@keyframes`

`@keyframes`は、CSSアニメーションを定義するためのルールです。アニメーションの各ステップでのスタイルを指定し、アニメーションの動作を制御します。

```css
@keyframes countUp {
  100% {
    --count: 1000000000;
  }
}

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

### `position: relative` と `position: absolute`

`position: relative`は、要素を通常の文書の流れに従って配置し、`top`、`right`、`bottom`、`left`プロパティを使用して相対的に移動させることができます。`position: absolute`は、最も近い祖先要素に対して絶対的に配置されます。

```css
.countUp {
  position: relative;
}

.text {
  position: absolute;
  top: -2rem;
  left: 50%;
  transform: translateX(-50%);
}
```

これらのCSS機能を使用することで、ローディング画面に動的な視覚効果を追加し、ユーザー体験を向上させることができます。
