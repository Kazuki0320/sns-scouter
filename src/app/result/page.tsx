'use client';

import { ShareButton } from '@/components/ui/Button';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from './loading';

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const battlePowerResult = useSearchParams();
  const score = Number(battlePowerResult.get('score'));

  useEffect(() => {
    if (score === null || isNaN(score)) {
      setError('適切な値ではありません');
    } else {
      setError('');
    }
  }, [score]);

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
      <ShareButton text="test" />
    </>
  );
}