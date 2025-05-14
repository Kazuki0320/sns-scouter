'use client';

import { useRouter } from 'next/navigation';
import { ScouterViewer } from '@/components/ui/ScouterViewer';
import { Button, createButtonProps } from '@/components/ui/Button';
import { useState } from 'react';
import { getBattlePower } from '@/app/calc/ScouterCalculator';

// 戦闘力計算用コンポーネント
function ResultButton({ follower }: { follower: number }) {
  const router = useRouter();
  
  const handleSubmit = () => {
    const battlePower = getBattlePower(follower);
    sessionStorage.setItem('battlePower', String(battlePower));
    router.push('/result');
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

export default function ScouterPage() {
  const router = useRouter();
  const [rotationCompleted, setRotationCompleted] = useState(false);

  const storedFollower = sessionStorage.getItem('follower');
  if (!storedFollower) {
    router.push('/');
    return;
  }

  const followerNumber = Number(storedFollower);
  if (isNaN(followerNumber)) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-sm text-red-500">
          フォロワー数の取得に失敗しました。もう一度お試しください。
        </div>
      </div>
    );
  }
  
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
          <ResultButton follower={followerNumber} />
        )}
      </div>
    </div>
  );
} 