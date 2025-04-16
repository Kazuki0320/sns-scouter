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

  // 数秒の待機時間後に表示されるタイトルアニメーション
  useEffect(() => {
    const timer = setTimeout(() =>{
      setTitleAnimated(true);
      setTimeout(() => {
        setSubtitleAnimated(true);
        setTimeout(() => {
          setShowForm(true);
        }, 1500);
      }, 1000);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (value: number) => {
    const battlePower = getBattlePower(value);
    router.push(`/result?score=${battlePower}`);
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.scanline}></div>
      <div
        className={`${styles.animationContainer} ${titleAnimated ? styles.animated : styles.unanimated}`}
      >
        <h1 className={styles.scouterText}>
          SNSスカウター
        </h1>
        <p className={`${styles.animationContainer} ${subtitleAnimated ? styles.animated : styles.unanimated} ${styles.typingEffect}`}>
          あなたの戦闘力を測定しよう！
        </p>
      </div>
      {showForm &&<Form onSubmit={handleSubmit}/>}
    </div>
  );
}
