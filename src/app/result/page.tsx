'use client';

import { useRouter } from 'next/navigation';
import { ShareButton } from '@/components/ui/ShareButton';

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
  const storedScore = sessionStorage.getItem('battlePower');
  
  if (!storedScore) {
    router.push('/');
    return;
  }

  const score = Number(storedScore);
  return <ResultContent score={score} />;
}