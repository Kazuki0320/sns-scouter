'use client';

import Form from '@/components/ui/Form';
import { useRouter } from 'next/navigation';
import { getBattlePower } from '@/app/calc/ScouterCalculator';

export default function RootLayout() {
  const router = useRouter();

  const handleSubmit = (value: number) => {
    const battlePower = getBattlePower(value);
    router.push(`/result?score=${battlePower}`);
  };
  return (
    // <div className="flex flex-col items-center justify-center min-h-screen p-4">
    //   <Form onSubmit={handleSubmit} />
    // </div>
    <div className="min-h-screen flex flex-col items-center justify-center p-4 from-gray-900 to-black ralative overflow-hidden">
      {/*背景エフェクト */}
      <div className="absolute inset-0 z-0">
        <div className="grid-lines"></div>
        <div className="scanline"></div>
        <div className="particles"></div>
      </div>
    </div>
  );
}
