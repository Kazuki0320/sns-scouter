import { calculateBattlePower, getBattlePower } from './ScouterCalculator';

describe('SNSスカウターのスコア計算ロジック', () => {
  describe('calculateBattlePower関数', () => {
    it('フォロワー数に応じて正しい戦闘力を計算すること', () => {
      expect(calculateBattlePower(500)).toBe(5000);
      expect(calculateBattlePower(1000)).toBe(15000);
      expect(calculateBattlePower(10000)).toBe(500000);
    });

    it('境界値を正しく処理すること', () => {
      expect(calculateBattlePower(999)).toBe(9990);
      expect(calculateBattlePower(1000)).toBe(15000);
      expect(calculateBattlePower(0)).toBe(0);
    });
  });

  describe('getBattlePower関数', () => {
    it('正しい戦闘力を返すこと', () => {
      expect(getBattlePower(2000)).toBe(30000);
      expect(getBattlePower(50000)).toBe(2500000);
    });

    it('不正な入力を適切に処理すること', () => {
      expect(getBattlePower(-100)).toBe(0);
      expect(getBattlePower(NaN)).toBe(0);
    });
  });
});
