'use client';

import { ShareButton } from '@/components/ui/ShareButton';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const battlePowerResult = useSearchParams();
  const score = battlePowerResult ? battlePowerResult.get('score') : null;

  // TODO: 以下のエラーが発生した時、ユーザーのトップページに戻すための何かしらの処理を考える
  const error =
    score === null || score === '' || Number.isNaN(Number(score))
      ? 'スカウターの測定に失敗しました。もう一度お試しください。'
      : '';

  return (
    <>
      <h2>結果</h2>
      {!error && <h3>{score}</h3>}
      {error && <div className="text-sm text-red-500">{error}</div>}
      <ShareButton tweetText={String(score)} />
    </>
  );
}
