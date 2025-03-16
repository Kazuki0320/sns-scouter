'use client';

import Form from '@/components/Form';
import { useRouter } from 'next/navigation';
import { getBattlePower } from './calc/ScouterCalculator';

export default function RootLayout() {
  const router = useRouter();

  const handleSubmit = (value: number) => {
    const followersPower = getBattlePower(value);
    router.push(`/result?followers=${followersPower}`);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-3xl font-bold mb-6 text-blue-500">SNSスカウター</h1>
        <Form onSubmit={handleSubmit} />
    </div>
  );
}
