'use client';

import Form from '@/components/ui/Form';
import { useRouter } from 'next/navigation';
import { getBattlePower } from '@/app/calc/ScouterCalculator';
import GlitchText from '@/components/ui/GlitchText';

export default function RootLayout() {
  const router = useRouter();

  const handleSubmit = (value: number) => {
    const battlePower = getBattlePower(value);
    router.push(`/result?score=${battlePower}`);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Always active */}
      <div className="mb-12">
        <GlitchText speed={1} enableShadows={true} enableOnHover={false} className="text-center">
          SNSスカウター
        </GlitchText>
      </div>
      <Form onSubmit={handleSubmit} />
    </div>
  );
}