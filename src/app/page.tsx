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
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-500">SNSスカウター</h1>
      <Form onSubmit={handleSubmit} />
    </div>
  );
}
