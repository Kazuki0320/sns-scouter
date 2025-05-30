'use client';

import Form from '@/components/ui/Form';
import { useRouter } from 'next/navigation';
import styles from '@/styles/scouterText.module.css';
import { useState, useEffect, useRef } from 'react';
import { SoundBanner } from '@/components/ui/SoundBanner';
import { Toast } from '@/components/ui/Toast';

export default function Home() {
  const router = useRouter();
  const isMounted = useRef(true);
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const [titleAnimated, setTitleAnimated] = useState(false);
  const [subtitleAnimated, setSubtitleAnimated] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showSoundMenu, setShowSoundMenu] = useState(false);
  const [readyForSoundControl, setReadyForSoundControl] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('error');
  const isFirstInteraction = useRef(true);

  // NOTE: アンマウント後の非同期 state 更新を防ぐため、マウント状態を ref で追跡
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const wait = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  // NOTE: 数秒の待機時間後にタイトルから順番に要素が表示されていくアニメーション
  useEffect(() => {
    const animateSequence = async () => {
      const titleDelay = 1300;
      const subtitleDelay = 1000;
      const formDelay = 1500;
      const soundMenuDelay = 1500;

      try {
        await wait(titleDelay);
        if (isMounted.current) setTitleAnimated(true);

        await wait(subtitleDelay);
        if (isMounted.current) setSubtitleAnimated(true);

        await wait(formDelay);
        if (isMounted.current) setShowForm(true);

        await wait(soundMenuDelay);
        if (isMounted.current) {
          setShowSoundMenu(true);
          setReadyForSoundControl(true);
        } 

      } catch (error) {
        // setTimeout自体は通常エラーを投げませんが、念のため
        if (error instanceof Error && error.name !== 'CancelledError') {
          console.error('Animation sequence error:', error);
        }
      }
    };
    animateSequence();
  }, []);

  const handleSubmit = (value: number) => {
    try {
      sessionStorage.setItem('follower', String(value));
      router.push('/scouter');
    } catch (e) {
      console.error('セッションストレージへの保存に失敗しました:', e);
    }
  };

  // 音源のオン設定
  const enableSound = () => {
    if (!bgmRef.current) {
      bgmRef.current = new Audio('/scouter.mp3');
      bgmRef.current.loop = true;
      bgmRef.current.volume = 0.25;
      bgmRef.current.preload = 'auto';
    }

    bgmRef.current
      .play()
      .then(() => {
        setSoundEnabled(true);
        if (isFirstInteraction.current) {
          setToastMessage('BGMを再生しました');
          setToastType('success');
          isFirstInteraction.current = false;
        }
        setTimeout(() => setShowSoundMenu(false));
      })
      .catch((e) => {
        console.error('BGM再生エラー:', e);
        setToastMessage(
          'BGMの再生に失敗しました。ブラウザの設定を確認してください。'
        );
        setToastType('error');
      });
  };

  // 音源のオフ設定
  const disableSound = () => {
    if (bgmRef.current) {
      bgmRef.current.pause();
    }
    setSoundEnabled(false);
    if (isFirstInteraction.current) {
      setToastMessage('BGMを停止しました');
      setToastType('success');
      isFirstInteraction.current = false;
    }
    setTimeout(() => setShowSoundMenu(false));
  };

  // メニューの表示/非表示切り替え
  const toggleSoundMenu = () => {
    if (!isFirstInteraction.current) {
      if (soundEnabled) {
        disableSound();
      } else {
        enableSound();
      }
    } else {
      setShowSoundMenu(!showSoundMenu);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {readyForSoundControl && (
        <div className="fixed right-4 top-4 z-50 flex flex-col items-end">
          <button
            onClick={toggleSoundMenu}
            className="rounded-full bg-green-500/20 p-3 transition-all duration-300 hover:bg-green-500/30"
            aria-label="BGM設定"
          >
            <span className="text-2xl">{soundEnabled ? '🔊' : '🔈'}</span>
          </button>
        </div>
      )}

      {showSoundMenu && (
        <SoundBanner
          soundEnabled={soundEnabled}
          onEnableSound={enableSound}
          onDisableSound={disableSound}
          onClose={() => setShowSoundMenu(false)}
        />
      )}

      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
        />
      )}

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
