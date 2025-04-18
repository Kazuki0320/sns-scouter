'use client';

import { ShareButton } from '@/components/ui/ShareButton';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from './loading';

export default function Page() {
  const [loading, setLoading] = useState(true);
  const battlePowerResult = useSearchParams();
  const score = battlePowerResult ? battlePowerResult.get('score') : null;

  // TODO: 以下のエラーが発生した時、ユーザーのトップページに戻すための何かしらの処理を考える
  const error =
    score === null || score === '' || Number.isNaN(Number(score))
      ? 'スカウターの測定に失敗しました。もう一度お試しください。'
      : '';

  // NOTE: ローディング画面を一定時間表示するための一時的な処理
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return Loading();
  }

  return (
    <>
      <h2>結果</h2>
      {!error && <h3>{score}</h3>}
      {error && <div className="text-sm text-red-500">{error}</div>}
      <ShareButton tweetText={String(score)} />
    </>
  );
}
