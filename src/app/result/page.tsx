'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ShareButton } from '@/components/ui/ShareButton';
import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import styles from '@/styles/scouterText.module.css';

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
    <Html fullscreen>
      <h2>結果</h2>
      {!error && <h3>{score}</h3>}
      {error && <div className="text-sm text-red-500">{error}</div>}
      <ShareButton tweetText={String(score)} />
    </Html>
  );
}

export default function Page() {
  return (
    <Canvas>
      <Suspense fallback={
        <Html fullscreen>
          <div className={styles.loadingBanner}>
            <span className="text-sm font-semibold">読み込み中...</span>
          </div>
        </Html>
      }>
        <ResultContent />
      </Suspense>
    </Canvas>
  );
}