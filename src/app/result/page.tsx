'use client';

import { useRouter } from 'next/navigation';
import { ShareButton } from '@/components/ui/ShareButton';
import { useState, useEffect } from 'react';

function ResultContent({ score }: { score: number }) {
  const error = Number.isNaN(score)
    ? 'スカウターの測定に失敗しました。もう一度お試しください。'
    : '';

  return (
    <>
      <h2>結果</h2>
      {!error && <h3>{score}</h3>}
      {error && <div className="text-sm text-red-500">{error}</div>}
      {!error && <ShareButton tweetText={String(score)} />}
    </>
  );
}

export default function ResultPage() {
  const router = useRouter();
  const [score, setScore] = useState<number | null>(null);

  // セッションストレージからスコアを取得
  // サーバーサイドレンダリング時にsessionStorageにアクセスするとエラーになるため、
  // useEffectを使用してクライアントサイドでのみ実行する
  useEffect(() => {
    const storedScore = sessionStorage.getItem('battlePower');
    if (!storedScore) {
      router.push('/');
      return;
    }
    const numScore = Number(storedScore);
    if (isNaN(numScore)) {
      router.push('/');
      return;
    }
    setScore(numScore);
  }, [router]);

  if (score === null) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-sm text-red-500">
          戦闘力の取得に失敗しました。トップページに戻ります。
        </div>
      </div>
    );
  }

  // scoreが必ず数値であることが保証される
  return <ResultContent score={score} />;
}