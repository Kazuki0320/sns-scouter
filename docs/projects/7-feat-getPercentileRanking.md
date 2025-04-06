# 手順書作成

## プロンプト

[Repomix](https://repomix.com/ja/) によってコードベースを作成し、プロンプトに追加

```
~~省略~~
================================================================
End of Codebase
================================================================

---
上記のコードベースを参考に、以下の関数を実装したいです。
・src/app/calc/ScouterCalculator.tsxのコードを参考に、battlePowerの数値を元に上位何%にいるユーザーなのかを取得できる関数を追加してください。
・ユニットテストも追加してください。

上記の機能を実装するための、手順書を作成してください。

これはコーディングエージェントに指示するためのプロンプトとして使用したいです。
```

## 生成結果

はい、承知いたしました。`src/app/calc/ScouterCalculator.tsx` に戦闘力に基づいた上位パーセンタイルを取得する関数を追加し、そのユニットテストを作成するための手順書を作成します。

---

## 手順書: 戦闘力に基づく上位パーセンタイル取得機能の実装

### 1. `src/app/calc/ScouterCalculator.tsx` の修正

以下の手順に従って、`getPercentileRanking` 関数を `src/app/calc/ScouterCalculator.tsx` に追加します。

#### 1.1. 関数の定義

`getBattlePower` 関数の下に、新しい関数 `getPercentileRanking` を定義します。この関数は `battlePower` を数値として受け取り、上位何%にいるかを示す文字列を返します。

```typescript
// src/app/calc/ScouterCalculator.tsx

// (既存のコード)

export function getBattlePower(followers: number): number {
  // (既存のコード)
}

/**
 * 戦闘力から上位何%に位置するかを取得する関数
 * @param battlePower 戦闘力
 * @returns 上位パーセンタイルを示す文字列 (例: "Top 1%", "Top 10%", "Top 50%", "下位")
 */
export function getPercentileRanking(battlePower: number): string {
  if (battlePower >= 1000000) {
    return 'Top 1%';
  } else if (battlePower >= 500000) {
    return 'Top 5%';
  } else if (battlePower >= 250000) {
    return 'Top 10%';
  } else if (battlePower >= 100000) {
    return 'Top 25%';
  } else if (battlePower >= 50000) {
    return 'Top 50%';
  } else {
    return '下位';
  }
}
```

**解説:**

- この例では、戦闘力の値に応じていくつかの閾値を設け、それに基づいておおよその上位パーセンタイルを判定しています。
- 上記の閾値やパーセンテージはあくまで例です。実際のアプリケーションの要件に合わせて調整してください。
- より詳細なパーセンタイル分析を行う場合は、実際のユーザーデータの分布に基づいて閾値を設定したり、統計的な手法を導入したりする必要があります。

### 2. `src/app/calc/ScouterCalculator.test.tsx` の修正

`getPercentileRanking` 関数に対するユニットテストを `src/app/calc/ScouterCalculator.test.tsx` に追加します。

#### 2.1. `describe` ブロックの追加

既存の `describe('ScouterCalculator', ...)` ブロックの中に、`getPercentileRanking` 関数用の新しい `describe` ブロックを追加します。

```typescript jsx
// src/app/calc/ScouterCalculator.test.tsx

import { getBattlePower, getPercentileRanking } from './ScouterCalculator';

describe('SNSスカウターのスコア計算ロジック', () => {
  describe('getBattlePower', () => {
    // (既存の getBattlePower のテストケース)
  });

  describe('getPercentileRanking', () => {
    it('should return "Top 1%" for battle power >= 1000000', () => {
      expect(getPercentileRanking(1000000)).toBe('Top 1%');
      expect(getPercentileRanking(1500000)).toBe('Top 1%');
    });

    it('should return "Top 5%" for battle power >= 500000 and < 1000000', () => {
      expect(getPercentileRanking(500000)).toBe('Top 5%');
      expect(getPercentileRanking(750000)).toBe('Top 5%');
      expect(getPercentileRanking(999999)).toBe('Top 5%');
    });

    it('should return "Top 10%" for battle power >= 250000 and < 500000', () => {
      expect(getPercentileRanking(250000)).toBe('Top 10%');
      expect(getPercentileRanking(375000)).toBe('Top 10%');
      expect(getPercentileRanking(499999)).toBe('Top 10%');
    });

    it('should return "Top 25%" for battle power >= 100000 and < 250000', () => {
      expect(getPercentileRanking(100000)).toBe('Top 25%');
      expect(getPercentileRanking(175000)).toBe('Top 25%');
      expect(getPercentileRanking(249999)).toBe('Top 25%');
    });

    it('should return "Top 50%" for battle power >= 50000 and < 100000', () => {
      expect(getPercentileRanking(50000)).toBe('Top 50%');
      expect(getPercentileRanking(75000)).toBe('Top 50%');
      expect(getPercentileRanking(99999)).toBe('Top 50%');
    });

    it('should return "下位" for battle power < 50000', () => {
      expect(getPercentileRanking(49999)).toBe('下位');
      expect(getPercentileRanking(25000)).toBe('下位');
      expect(getPercentileRanking(0)).toBe('下位');
      expect(getPercentileRanking(-100)).toBe('下位'); // 負の値も下位とするか、要件に応じて修正
    });
  });
});
```

**解説:**

- 各 `it` ブロックは、`getPercentileRanking` 関数の特定の閾値に対する挙動をテストします。
- 境界値（閾値ちょうどの値とその直前後の値）を含めることで、ロジックの正確性を高めます。
- テストケースは、`getPercentileRanking` 関数内で定義した閾値と対応するように記述します。
- 負の値に対する扱いもテストケースに含めることで、予期せぬ挙動を防ぎます。必要に応じて、負の値に対するロジックを `getPercentileRanking` 関数内で調整してください。

### 3. テストの実行

ターミナルで以下のコマンドを実行して、追加したテストが成功することを確認します。

```bash
pnpm test src/app/calc/ScouterCalculator.test.tsx
```

または、watch モードで実行して、ファイルの変更を監視しながらテストを実行することもできます。

```bash
pnpm test:watch src/app/calc/ScouterCalculator.test.tsx
```

すべてのテストが成功すれば、戦闘力に基づいて上位パーセンタイルを取得する機能が正しく実装されたことになります。

### 4. (オプション) 実装の調整

必要に応じて、`getPercentileRanking` 関数内の閾値やパーセンテージ、またはテストケースを実際の要件に合わせて調整してください。より詳細なパーセンタイル分析が必要な場合は、データに基づいた閾値設定や統計ライブラリの導入を検討してください。

---

## 振り返り

### 実装内容

1. `src/app/calc/ScouterCalculator.tsx` に `getPercentileRanking` 関数を追加し、戦闘力に基づいてユーザーの上位パーセンタイルを判定するロジックを実装しました。

   - 閾値を以下のように設定しました:
     - 100,000以上: 人気インフルエンサー (Top 0.1%)
     - 50,000以上: プロ (Top 1%)
     - 10,000以上: エキスパート (Top 5%)
     - 5,000以上: トップアマ (Top 10%)
     - 1,000以上: アマチュア (Top 30%)
     - 500以上: ノービス (Top 50%)
     - 100以上: ルーキー (Top 70%)
     - 100未満: ビギナー (Top 100%)

2. `src/app/calc/ScouterCalculator.test.tsx` に `getPercentileRanking` 関数のユニットテストを追加しました。
   - 各ランクの境界値を含むテストケースを作成し、ロジックの正確性を確認しました。

### 課題と対応

- 初期実装では「下位」という表現が含まれていましたが、ユーザーに配慮し、よりポジティブな表現（例: ビギナー）に変更しました。
- 実装中に参考記事を基に `Top` のパーセンテージを調整し、より現実的なランク分けを反映しました。

### 次のステップ

- 必要に応じて、実際のユーザーデータを分析し、ランク分けの閾値やパーセンテージをさらに調整する。
- 他の機能との統合テストを実施し、全体の動作確認を行う。
