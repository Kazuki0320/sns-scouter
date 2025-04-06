import { getBattlePower, getPercentileRanking } from './ScouterCalculator';

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

  describe('getPercentileRanking関数', () => {
    it('戦闘力が100,000以上の場合、人気インフルエンサー (Top 0.1%) と判定すること', () => {
      expect(getPercentileRanking(100000)).toBe(
        '人気インフルエンサー (Top 0.1%)'
      );
      expect(getPercentileRanking(200000)).toBe(
        '人気インフルエンサー (Top 0.1%)'
      );
    });

    it('戦闘力が50,000以上100,000未満の場合、プロ (Top 1%) と判定すること', () => {
      expect(getPercentileRanking(50000)).toBe('プロ (Top 1%)');
      expect(getPercentileRanking(99999)).toBe('プロ (Top 1%)');
    });

    it('戦闘力が10,000以上50,000未満の場合、エキスパート (Top 5%) と判定すること', () => {
      expect(getPercentileRanking(10000)).toBe('エキスパート (Top 5%)');
      expect(getPercentileRanking(49999)).toBe('エキスパート (Top 5%)');
    });

    it('戦闘力が5,000以上10,000未満の場合、トップアマ (Top 10%) と判定すること', () => {
      expect(getPercentileRanking(5000)).toBe('トップアマ (Top 10%)');
      expect(getPercentileRanking(9999)).toBe('トップアマ (Top 10%)');
    });

    it('戦闘力が1,000以上5,000未満の場合、アマチュア (Top 30%) と判定すること', () => {
      expect(getPercentileRanking(1000)).toBe('アマチュア (Top 30%)');
      expect(getPercentileRanking(4999)).toBe('アマチュア (Top 30%)');
    });

    it('戦闘力が500以上1,000未満の場合、ノービス (Top 50%) と判定すること', () => {
      expect(getPercentileRanking(500)).toBe('ノービス (Top 50%)');
      expect(getPercentileRanking(999)).toBe('ノービス (Top 50%)');
    });

    it('戦闘力が100以上500未満の場合、ルーキー (Top 70%) と判定すること', () => {
      expect(getPercentileRanking(100)).toBe('ルーキー (Top 70%)');
      expect(getPercentileRanking(499)).toBe('ルーキー (Top 70%)');
    });

    it('戦闘力が100未満の場合、ビギナー (Top 100%) と判定すること', () => {
      expect(getPercentileRanking(99)).toBe('ビギナー (Top 100%)');
      expect(getPercentileRanking(0)).toBe('ビギナー (Top 100%)');
      expect(getPercentileRanking(-100)).toBe('ビギナー (Top 100%)');
    });
  });
});
