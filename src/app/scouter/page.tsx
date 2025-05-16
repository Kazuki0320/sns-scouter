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
    try {
      sessionStorage.setItem('battlePower',  String(battlePower));
      router.push('/result');
    } catch (e) {
      console.error('セッションストレージへの保存に失敗:', e);
      // ユーザーにエラーを通知する処理などをここに記述
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

export default function ScouterPage() {
  const router = useRouter();
  const [followerNumber, setFollowerNumber] = useState<number | null>(null);
  const [rotationCompleted, setRotationCompleted] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // セッションストレージからフォロワー数を取得
  useEffect(() => {
    const storedFollower = sessionStorage.getItem('follower');
    if (!storedFollower) {
      setIsRedirecting(true);
      return;
    }

    const numFollower = Number(storedFollower);
    if (isNaN(numFollower)) {
      setIsRedirecting(true);
      return;
    }

    setFollowerNumber(numFollower);
  }, []);

  // リダイレクト処理
  useEffect(() => {
    if (isRedirecting) {
      router.push('/');
      sessionStorage.removeItem('follower');
    }
  }, [isRedirecting, router]);

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