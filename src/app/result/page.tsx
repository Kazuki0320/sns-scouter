'use client';

import { ShareButton } from '@/components/ui/ShareButton';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from './loading';

export default function Page() {
  const [loading, setLoading] = useState(true);
  const battlePowerResult = useSearchParams();
  const score = Number(battlePowerResult.get('score'));

  const error = score === null || Number.isNaN(Number(score)) ? '適切な値ではありません' : '';

  // NOTE: ローディング画面を一定時間表示するための一時的な処理
  useEffect (() => {
    const timer = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return Loading();
  }

  return (
    <>
      <h2>結果</h2>
      <h3>{score}</h3>
      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}
      <ShareButton tweetText={String(score)} />
    </>
  );
}