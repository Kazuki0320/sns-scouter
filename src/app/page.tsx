'use client';

import Form from '@/components/ui/Form';
import { useRouter } from 'next/navigation';
import { getBattlePower } from '@/app/calc/ScouterCalculator';
import styles from '@/components/ui/scanline.module.css';

export default function RootLayout() {
  const router = useRouter();

  const handleSubmit = (value: number) => {
    const battlePower = getBattlePower(value);
    router.push(`/result?score=${battlePower}`);
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className={styles.scanline}></div>
      <Form onSubmit={handleSubmit} />
    </div>
  );
}
