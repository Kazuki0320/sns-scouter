'use client';

import { useRouter } from 'next/navigation';
import { ScouterViewer } from '@/components/ui/ScouterViewer';
import { Button, createButtonProps } from '@/components/ui/Button';
import { useState, useEffect } from 'react';
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
  const [followerNumber, setFollowerNumber] = useState<number | null>(null);
  const [rotationCompleted, setRotationCompleted] = useState(false);

  // セッションストレージからフォロワー数を取得し、
  // 不正な値や未設定の場合はトップページにリダイレクト
  useEffect(() => {
    const storedFollower = sessionStorage.getItem('follower');
    if (!storedFollower) {
      router.push('/');
      return;
    }

    const numFollower = Number(storedFollower);
    if (isNaN(numFollower)) {
      router.push('/');
      return;
    }

    setFollowerNumber(numFollower);
  }, [router]);

  const handleRotationComplete = () => {
    setRotationCompleted(true);
  };

  if (followerNumber === null) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-sm text-red-500">
          フォロワー数の取得に失敗しました。トップページに戻ります。
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div className="flex h-[650px] w-[800px] flex-col items-center justify-center">
        <ScouterSection onRotationComplete={handleRotationComplete} />
        
        {rotationCompleted && (
          <ResultButton follower={followerNumber} />
        )}
      </div>
    </div>
  );
} 