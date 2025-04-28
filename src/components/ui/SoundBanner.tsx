import React from 'react';
import { Music, X } from 'lucide-react';
import styles from '@/styles/soundBanner.module.css';

interface SoundBannerProps {
  soundEnabled: boolean;
  onEnableSound: () => void;
  onDisableSound: () => void;
  onClose: () => void;
}

export const soundBanner: React.FC<SoundBannerProps> = ({
  soundEnabled,
  onEnableSound,
  onDisableSound,
  onClose,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <Music className={styles.icon} size={20} />
          <span className={styles.title}>サウンド設定</span>
        </div>
        <button onClick={onClose} className={styles.closeButton}>
          <X size={20} />
        </button>
      </div>
      <p className={styles.message}>
        より楽しんでもらうためにBGMを用意しました。再生してもよろしいですか？
      </p>
      <div className={styles.buttonContainer}>
        <button
          onClick={onEnableSound}
          className={`${styles.button} ${soundEnabled ? styles.enableButtonActive : styles.enableButton}`}
        >
          サウンド有効
        </button>
        <button
          onClick={onDisableSound}
          className={`${styles.button} ${!soundEnabled ? styles.disableButtonActive : styles.disableButton}`}
        >
          ミュート
        </button>
      </div>
    </div>
  );
};

export default soundBanner;
