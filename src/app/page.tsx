'use client';

import Form from '@/components/ui/Form';
import { useRouter } from 'next/navigation';
import { getBattlePower } from '@/app/calc/ScouterCalculator';
import styles from '@/styles/scouterText.module.css';
import { useState, useEffect, useRef } from 'react';
import { Music, X } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const [titleAnimated, setTitleAnimated] = useState(false);
  const [subtitleAnimated, setSubtitleAnimated] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showSoundMenu, setShowSoundMenu] = useState(false);
  const [readyForSoundControl, setReadyForSoundControl] = useState(false);

  // BGM再生
  useEffect(() => {
    bgmRef.current = new Audio('/scouter.mp3');

    if (bgmRef.current) {
      bgmRef.current.loop = true;
      bgmRef.current.volume = 0.25;
    }

    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current = null;
      }
    };
  }, []);

  const isMounted = useRef(true); // マウント状態を追跡

  // NOTE: アンマウント後の非同期 state 更新を防ぐため、マウント状態を ref で追跡
  useEffect(() => {
    // マウント解除時にフラグをfalseに
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // NOTE: 数秒の待機時間後にタイトルから順番に要素が表示されていくアニメーション
  useEffect(() => {
    const animateSequence = async () => {
      const titleDelay = 1300;
      const subtitleDelay = 1000;
      const formDelay = 1500;
      
      try {
        await wait(titleDelay);
        if (isMounted.current) setTitleAnimated(true);

        await wait(subtitleDelay);
        if (isMounted.current) setSubtitleAnimated(true);

        await wait(formDelay);
        if (isMounted.current) setShowForm(true);
      } catch (error) {
        // setTimeout自体は通常エラーを投げませんが、念のため
        if (error instanceof Error && error.name !== 'CancelledError') {
          // 例: キャンセル処理を実装した場合
          console.error('Animation sequence error:', error);
        }
      }
    };

    animateSequence();

    // async関数内の処理を直接クリーンアップするのは難しいが、
    // isMountedフラグでアンマウント後の状態更新を防ぐ
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setTitleAnimated(true);
      setTimeout(() => {
        setSubtitleAnimated(true);
        setTimeout(() => {
          setShowForm(true);
          setShowSoundMenu(true);
          setReadyForSoundControl(true);
        }, 1500);
      }, 1000);
    }, 1300);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (value: number) => {
    const battlePower = getBattlePower(value);
    router.push(`/result?score=${battlePower}`);
  };

  // 音源のオン設定
  const enableSound = () => {
    if (bgmRef.current) {
      bgmRef.current.play()
        .then(() => {
          setSoundEnabled(true);
          setTimeout(() => setShowSoundMenu(false), 1500); // 設定後メニューを非表示
        })
        .catch(e => console.error('BGM再生エラー:', e));
    }
  };

  // 音源のオフ設定
  const disableSound = () => {
    if (bgmRef.current) {
      bgmRef.current.pause();
    }
    setSoundEnabled(false);
    setTimeout(() => setShowSoundMenu(false), 1500); // 設定後メニューを非表示
  };

  // メニューの表示/非表示切り替え
  const toggleSoundMenu = () => {
    setShowSoundMenu(!showSoundMenu);
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
            <span className="text-2xl">
              {soundEnabled ? '🔊' : '🔈'}
            </span>
          </button>
        </div>
      )}
      
      {showSoundMenu && (
        <div className="fixed left-1/2 top-4 z-50 flex w-[90%] max-w-md -translate-x-1/2 transform flex-col items-center rounded-lg border border-green-500 bg-black bg-opacity-80 p-4 shadow-lg transition-all duration-300">
          <div className="mb-2 flex w-full items-center justify-between">
            <div className="flex items-center">
              <Music className="mr-2 text-green-400" size={20} />
              <span className="font-medium text-white">サウンド設定</span>
            </div>
            <button onClick={() => setShowSoundMenu(false)} className="text-green-400 hover:text-green-300">
              <X size={20} />
            </button>
          </div>
          <p className="mb-3 text-center text-sm text-gray-300">
            より楽しんでもらうためにBGMを用意しました。再生してもよろしいですか？
          </p>
          <div className="flex w-full space-x-3">
            <button 
              onClick={enableSound} 
              className={`flex-1 rounded px-4 py-2 text-sm text-white transition-colors ${soundEnabled ? 'bg-green-600' : 'bg-green-500 hover:bg-green-600'}`}
            >
              サウンド有効
            </button>
            <button 
              onClick={disableSound}
              className={`flex-1 rounded px-4 py-2 text-sm text-white transition-colors ${!soundEnabled ? 'bg-gray-600' : 'bg-gray-500 hover:bg-gray-600'}`}
            >
              ミュート
            </button>
          </div>
        </div>
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
