// フォロワー数の範囲ごとの倍率定義
const battlePowerMultipliers = [
  { min: 0, max: 999, multiplier: 10 },
  { min: 1000, max: 2999, multiplier: 15 },
  { min: 3000, max: 4999, multiplier: 20 },
  { min: 5000, max: 7999, multiplier: 25 },
  { min: 8000, max: 9999, multiplier: 30 },
  { min: 10000, max: Infinity, multiplier: 50 },
];

function calculateBattlePower(followers: number): number {
  if (
    !Number.isFinite(followers) ||
    followers < 0 ||
    followers > 10000000000 // 100億フォロワーを上限とする
  ) {
    return 0;
  }

  const range = battlePowerMultipliers.find(
    (r) => r.min <= followers && followers <= r.max
  );
  if (!range) return 0;

  // 戦闘力 = フォロワー数 × 該当範囲の倍率
  return followers * range.multiplier;
}

export function getBattlePower(followers: number): number {
  return calculateBattlePower(followers);
}

export function getPercentileRanking(battlePower: number): string {
  if (battlePower >= 100000) {
    return '人気インフルエンサー (Top 0.1%)';
  } else if (battlePower >= 50000) {
    return 'プロ (Top 1%)';
  } else if (battlePower >= 10000) {
    return 'エキスパート (Top 5%)';
  } else if (battlePower >= 5000) {
    return 'トップアマ (Top 10%)';
  } else if (battlePower >= 1000) {
    return 'アマチュア (Top 30%)';
  } else if (battlePower >= 500) {
    return 'ノービス (Top 50%)';
  } else if (battlePower >= 100) {
    return 'ルーキー (Top 70%)';
  } else {
    return 'ビギナー (Top 100%)';
  }
}
