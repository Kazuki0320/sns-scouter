'use client';

import { useRouter } from 'next/navigation';
import { ScouterViewer } from '@/components/ui/ScouterViewer';
import { Button, createButtonProps } from '@/components/ui/Button';
import { Suspense, useState, use } from 'react';
import { getBattlePower } from '@/app/calc/ScouterCalculator';

// パスパラメータを受け取るコンポーネント
function ResultButton({ follower }: { follower: number }) {
  const router = useRouter();
  
  const handleSubmit = () => {
    const battlePower = getBattlePower(follower);
    router.push(`/result/${battlePower}`);
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

export default function Page({ params }: { params: Promise<{ follower: string }> }) {
  const { follower } = use(params);
  const followerNumber = Number(follower);

  // フォロワー数が無効な場合はエラーを表示
  if (isNaN(followerNumber)) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-sm text-red-500">
          フォロワー数の取得に失敗しました。もう一度お試しください。
        </div>
      </div>
    );
  }

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
            <ResultButton follower={followerNumber} />
          </Suspense>
        )}
      </div>
    </div>
  );
} 