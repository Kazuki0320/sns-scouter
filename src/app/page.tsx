'use client';

import Form from '@/components/ui/Form';
import { useRouter } from 'next/navigation';
import { getBattlePower } from '@/app/calc/ScouterCalculator';
import styles from '@/styles/scouterText.module.css';
import { useState, useEffect } from 'react';
import { ScouterViewer } from '@/components/ui/ScouterViewer';

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
    <div className="flex h-screen flex-col items-center justify-center">
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
        {/** 3Dモデルの表示を一旦非表示 */}
        {/* {subtitleAnimated && <ScouterViewer />} */}
        {showForm && (
          <div
            className={`flex w-full max-w-md flex-col items-center justify-center rounded-xl border-2 bg-black bg-opacity-70 p-6 shadow-[0_0_20px_rgba(16,185,129,0.5)] ${hasError ? 'border-red-500' : 'border-green-500'}`}
          >
            <Form
              onSubmit={handleSubmit}
              onError={(error: boolean) => setHasError(error)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
