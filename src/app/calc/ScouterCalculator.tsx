// フォロワー数の範囲ごとの倍率定義
const battlePowerMultipliers = [
  { min: 0, max: 999, multiplier: 10 },
  { min: 1000, max: 2999, multiplier: 15 },
  { min: 3000, max: 4999, multiplier: 20 },
  { min: 5000, max: 7999, multiplier: 25 },
  { min: 8000, max: 9999, multiplier: 30 },
  { min: 10000, max: Infinity, multiplier: 50 },
];

export function calculateBattlePower(followers: number): number {
  // 不正な値や大きすぎる値のチェック
  if (
    !Number.isFinite(followers) ||
    followers < 0 ||
    followers > Number.MAX_SAFE_INTEGER ||
    followers > 1000000000 // 100億フォロワーを上限とする
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
