import { getBattlePower } from './ScouterCalculator';

describe('SNSスカウターのスコア計算ロジック', () => {
  describe('getBattlePower関数', () => {
    it('フォロワー数に応じて正しい戦闘力を計算すること', () => {
      expect(getBattlePower(500)).toBe(5000);
      expect(getBattlePower(1000)).toBe(15000);
      expect(getBattlePower(10000)).toBe(500000);
    });

    it('境界値を正しく処理すること', () => {
      // 最小値周辺のテスト
      expect(getBattlePower(0)).toBe(0);
      expect(getBattlePower(1)).toBe(10);
      expect(getBattlePower(9)).toBe(90);

      // 倍率変更の境界値テスト
      expect(getBattlePower(999)).toBe(9990);
      expect(getBattlePower(1000)).toBe(15000);
      expect(getBattlePower(1001)).toBe(15015);

      // 大きな値の境界値テスト
      expect(getBattlePower(99999)).toBe(4999950);
      expect(getBattlePower(100000)).toBe(5000000);
      expect(getBattlePower(1000000)).toBe(50000000);

      // 極端な大きな値のテスト
      expect(getBattlePower(Number.MAX_SAFE_INTEGER)).toBe(0); // 大きすぎる値は0を返す
    });

    it('不正な入力を適切に処理すること', () => {
      expect(getBattlePower(-100)).toBe(0);
      expect(getBattlePower(NaN)).toBe(0);
    });
  });
});
