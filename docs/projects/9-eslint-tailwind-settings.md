# ESLint と Tailwind CSS の設定について

## インストール

```bash
npm install -D eslint-plugin-tailwindcss
```

## 追加された設定の説明

### プラグインの読み込み

```javascript
plugins: {
  tailwindcss: (await import('eslint-plugin-tailwindcss')).default,
}
```

このコードでeslint-plugin-tailwindcssを動的にインポートしています。

### 追加されたルール

1. `tailwindcss/classnames-order`: 'error'

   - Tailwind CSSのクラス名を一貫した順序で並べることを強制します
   - 例：`class="pt-4 text-center bg-blue-500"` → `class="bg-blue-500 pt-4 text-center"`

2. `tailwindcss/enforces-negative-arbitrary-values`: 'error'

   - 負の値を使用する際の正しい形式を強制します
   - 正しい例：`-mt-4`
   - 誤った例：`mt--4`

3. `tailwindcss/enforces-shorthand`: 'error'

   - 可能な場合は省略形を使用することを強制します
   - 例：`py-4` を使用（`padding-top-4 padding-bottom-4` の代わりに）

4. `tailwindcss/no-contradicting-classname`: 'error'

   - 矛盾するクラス名の使用を防ぎます
   - 例：`class="block inline"` は警告されます

5. `tailwindcss/no-custom-classname`: 'error'
   - Tailwind CSS で定義されていないカスタムクラス名の使用を制限します
   - Tailwind の公式クラス名のみを使用することを強制します

## 命名規則

- Tailwind CSS のクラス名：ケバブケース（例：`text-blue-500`）
- カスタムCSS Modules：キャメルケース（例：`containerWrapper`）

## 使用例

```tsx
// 正しい例
const Component = () => (
  <div className="bg-blue-500 p-4 text-white">Good example</div>
);

// 警告される例
const BadComponent = () => (
  <div className="custom-class p-4 text-white block inline">Bad example</div>
);
```

## 注意点

1. カスタムクラス名が必要な場合は、`tailwind.config.js` で適切に定義する必要があります
2. CSS Modulesを使用する場合は、別途命名規則の設定が必要になる可能性があります
3. JITモードを使用している場合でも、これらのルールは正しく機能します
