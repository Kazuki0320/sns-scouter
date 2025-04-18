'use client';

import Form from '@/components/ui/Form';
import { useRouter } from 'next/navigation';
import { getBattlePower } from '@/app/calc/ScouterCalculator';
import styles from '@/styles/scouterText.module.css';
import { useState, useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const [titleAnimated, setTitleAnimated] = useState(false);
  const [subtitleAnimated, setSubtitleAnimated] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [hasError, setHasError] = useState(false);

  // 数秒の待機時間後に表示されるタイトルアニメーション
  useEffect(() => {
    const timer = setTimeout(() => {
      setTitleAnimated(true);
      setTimeout(() => {
        setSubtitleAnimated(true);
        setTimeout(() => {
          setShowForm(true);
        }, 1500);
      }, 1000);
    }, 1300);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (value: number) => {
    const battlePower = getBattlePower(value);
    router.push(`/result?score=${battlePower}`);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className={styles.mainContainer}>
        <div className={styles.scanline}></div>
        <div
          className={`${styles.animationContainer} ${titleAnimated ? styles.animated : styles.unanimated}`}
        >
            <h1 className={styles.scouterText}>SNSスカウター</h1>
            <p
              className={`${styles.animationContainer} ${subtitleAnimated ? styles.animated : styles.unanimated} ${styles.typingEffect}`}
            >
              あなたの戦闘力を測定しよう！
            </p>
          </div>
        {showForm && 
        <div className={`max-w-md w-full bg-black bg-opacity-70 p-6 rounded-xl border-2 ${hasError ? "border-red-500" : "border-green-500"} shadow-[0_0_20px_rgba(16,185,129,0.5)] fade-in`}>
            <Form onSubmit={(handleSubmit)} 
            onError={(error: boolean) => setHasError(error)}
            />
        </div>
        }
      </div>
    </div>
  );
}
