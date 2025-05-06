'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ScouterViewer } from '@/components/ui/ScouterViewer';
import { Button, createButtonProps } from '@/components/ui/Button';

// スコアを取得し、結果ページに遷移するためのコンポーネント
function LoadingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const score = searchParams.get('score');

  const handleSubmit = () => {
    if (score) {
      router.push(`/result?score=${score}`);
    }
  };
  
  return (
    <div className="flex items-center justify-center">
      <div className="flex h-[650px] w-[800px] flex-col items-center justify-center">
        <ScouterViewer />
        <div className="mt-2">
          <Button
            button={createButtonProps('button', '結果を見る')}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

// メインコンポーネント
export default function Loading() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center">
        <div className="flex h-[650px] w-[800px] flex-col items-center justify-center">
          <div className="text-xl text-white">読み込み中...</div>
        </div>
      </div>
    }>
      <LoadingContent />
    </Suspense>
  );
}
