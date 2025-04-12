'use client';

import Form from '@/components/ui/Form';
import GridMotion from '@/components/ui/GridMotion';
import { ScouterViewer } from '@/components/ui/Scouter';
import { useRouter } from 'next/navigation';
import { getBattlePower } from '@/app/calc/ScouterCalculator';

export default function RootLayout() {
  const router = useRouter();

  const handleSubmit = (value: number) => {
    const battlePower = getBattlePower(value);
    router.push(`/result?score=${battlePower}`);
  };

  const items = [
    'SNS',
    'スカウター',
    <ScouterViewer key="model-1" />,
    'フォロワー',
    <ScouterViewer key="model-2" />,
    'いいね',
    <ScouterViewer key="model-3" />,
    'シェア',
    <ScouterViewer key="model-4" />,
    'コメント',
    <ScouterViewer key="model-5" />,
    'エンゲージメント',
    <ScouterViewer key="model-6" />,
    'インフルエンサー',
    <ScouterViewer key="model-7" />,
    'リーチ',
    <ScouterViewer key="model-8" />,
    'インプレッション',
    <ScouterViewer key="model-9" />,
    'バイラル',
    <ScouterViewer key="model-10" />,
    'トレンド',
    <ScouterViewer key="model-11" />,
    'ハッシュタグ',
    <ScouterViewer key="model-12" />,
    'メンション',
    <ScouterViewer key="model-13" />,
    'アルゴリズム'
  ];

  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 z-0">
        <GridMotion items={items} gradientColor="rgba(0,0,0,0.8)" />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-3xl font-bold mb-6 text-white">SNSスカウター</h1>
        <Form onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
