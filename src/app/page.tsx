'use client';

import Form from '@/components/ui/Form';
import { useRouter } from 'next/navigation';
import { getBattlePower } from '@/app/calc/ScouterCalculator';
import styles from '@/styles/scouterText.module.css';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const router = useRouter();
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const [titleAnimated, setTitleAnimated] = useState(false);
  const [subtitleAnimated, setSubtitleAnimated] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  // BGM再生
  useEffect(() => {
    bgmRef.current = new Audio("/scouter.mp3");

    if (bgmRef.current) {
      bgmRef.current.loop = true;
      bgmRef.current.volume = 0.5;
    }

    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current = null;
      }
    };
  }, []);

  // タッチイベント検知
  useEffect(() => {
    const handleTouch = () => {
      if (!hasInteracted && bgmRef.current && soundEnabled) {
        bgmRef.current.play()
          .then(() => {
            setHasInteracted(true);
            console.log("BGM再生開始");
          })
          .catch(e => console.error("BGM再生エラー:", e));
      }
    };

    return () => window.removeEventListener('touchstart', handleTouch);
  }, [hasInteracted, soundEnabled]);

  // 音源のオン/オフ切り替え
  const toggleSound = () => {
    if (bgmRef.current) {
      if (soundEnabled) {
        bgmRef.current.pause();
      } else {
        bgmRef.current.play()
          .catch(e => console.error("BGM再生エラー:", e));
      }
    }
    setSoundEnabled(!soundEnabled);
  };

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
      {/* 音源オン/オフボタン */}
      <button
        onClick={toggleSound}
              className="fixed top-4 right-4 z-50 rounded-full bg-green-500/20 p-3 hover:bg-green-500/30 transition-all duration-300"
        aria-label={soundEnabled ? "BGMを停止" : "BGMを再生"}
      >
        <span className="text-2xl">
          {soundEnabled ? "🔊" : "🔈"}
        </span>
      </button>

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
