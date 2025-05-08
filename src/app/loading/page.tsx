'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ScouterViewer } from '@/components/ui/ScouterViewer';
import { Button, createButtonProps } from '@/components/ui/Button';
import { Suspense, useState } from 'react';

// useSearchParamsを使うコンポーネント
function ResultButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const score = searchParams.get('score');

  const handleSubmit = () => {
    if (score) {
      router.push(`/result?score=${score}`);
    }
  };
  
  return (
    <div className="mt-2">
      <Button
        button={createButtonProps('button', '結果を見る')}
        onClick={handleSubmit}
      />
    </div>
  );
}

// ScouterViewerを表示するコンポーネント
function ScouterSection({ onRotationComplete }: { onRotationComplete: () => void }) {
  return (
    <ScouterViewer onRotationComplete={onRotationComplete} />
  );
}

export default function Page() {
  // 回転完了状態を管理
  const [rotationCompleted, setRotationCompleted] = useState(false);
  
  // 回転完了時のハンドラー
  const handleRotationComplete = () => {
    setRotationCompleted(true);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex h-[650px] w-[800px] flex-col items-center justify-center">
        <ScouterSection onRotationComplete={handleRotationComplete} />
        
        {/* 回転完了時のみボタンを表示 */}
        {rotationCompleted && (
          <Suspense fallback={
            <div className="mt-2">
              <Button
                button={createButtonProps('button', '読み込み中...', true)}
              />
            </div>
          }>
            <ResultButton />
          </Suspense>
        )}
      </div>
    </div>
  );
}