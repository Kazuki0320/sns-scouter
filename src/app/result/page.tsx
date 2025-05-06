'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ShareButton } from '@/components/ui/ShareButton';

// SearchParamsを取得するコンポーネント
function ResultContent() {
  const searchParams = useSearchParams();
  const score = searchParams.get('score');
  
  // TODO: 以下のエラーが発生した時、ユーザーのトップページに戻すための何かしらの処理を考える
  const error =
    score === null || score === '' || Number.isNaN(Number(score))
      ? 'スカウターの測定に失敗しました。もう一度お試しください。'
      : '';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black p-4 text-white">
      <h1 className="mb-4 text-3xl font-bold">戦闘力測定結果</h1>
      {!error && (
        <>
          <div className="mb-8 text-5xl font-bold text-green-500">{parseInt(score || '0').toLocaleString()}</div>
          <ShareButton tweetText={score ? String(score) : '測定不能'} />
        </>
      )}
      {error && <div className="text-xl text-red-500">{error}</div>}
      <button
        onClick={() => window.location.href = '/'}
        className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
      >
        トップページに戻る
      </button>
    </div>
  );
}

export default function Result() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen flex-col items-center justify-center bg-black p-4 text-white">
        <div className="text-xl">読み込み中...</div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}
