'use client';

import React, { Suspense, use } from 'react';
import { ShareButton } from '@/components/ui/ShareButton';
import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei';

// パスパラメータを受け取るコンポーネント
function ResultContent({ score }: { score: number }) {
  return (
    <Html fullscreen>
      <h2>結果</h2>
      <h3>{score}</h3>
      <ShareButton tweetText={String(score)} />
    </Html>
  );
}

export default function Page({ params }: { params: Promise<{ score: string }> }) {
  const { score } = use(params);
  const scoreNumber = Number(score);

  // スコアが無効な場合はエラーを表示
  if (isNaN(scoreNumber)) {
    return (
      <Canvas>
        <Html fullscreen>
          <div className="text-sm text-red-500">
            スカウターの測定に失敗しました。もう一度お試しください。
          </div>
        </Html>
      </Canvas>
    );
  }

  return (
        <ResultContent score={scoreNumber} />
  );
} 