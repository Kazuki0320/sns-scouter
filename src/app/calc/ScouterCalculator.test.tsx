import { calculateBattlePower, getBattlePower } from './ScouterCalculator';

describe('ScouterCalculator', () => {
  describe('calculateBattlePower', () => {
    it('should return correct battle power for various follower counts', () => {
      expect(calculateBattlePower(500)).toBe(5000);
      expect(calculateBattlePower(1000)).toBe(15000);
      expect(calculateBattlePower(10000)).toBe(500000);
    });

    it('should handle edge cases correctly', () => {
      expect(calculateBattlePower(999)).toBe(9990);
      expect(calculateBattlePower(1000)).toBe(15000);
      expect(calculateBattlePower(0)).toBe(0);
    });
  });

  describe('getBattlePower', () => {
    it('should return correct battle power', () => {
      expect(getBattlePower(2000)).toBe(30000);
      expect(getBattlePower(50000)).toBe(2500000);
    });

    it('should handle invalid input', () => {
      expect(getBattlePower(-100)).toBe(0);
      expect(getBattlePower(NaN)).toBe(0);
    });
  });
});
