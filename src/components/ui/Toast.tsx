'use client';

import { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import styles from '@/styles/toast.module.css';

type ToastProps = {
  message: string;
  type?: 'success' | 'error';
  duration?: number;
  onClose?: () => void;
};

export function Toast({
  message,
  type = 'error',
  duration = 3000,
  onClose,
}: ToastProps) {
  const [visible, setVisible] = useState(true);

useEffect(() => {
  let closeTimerId: NodeJS.Timeout | null = null;

  const visibilityTimerId = setTimeout(() => {
    setVisible(false);
    if (onClose) {
      closeTimerId = setTimeout(onClose, 300);
    }
  }, duration);

  return () => {
    clearTimeout(visibilityTimerId);
    if (closeTimerId) {
      clearTimeout(closeTimerId);
    }
  };
}, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      {type === 'success' ? (
        <CheckCircle className={styles.icon} size={20} />
      ) : (
        <AlertCircle className={styles.icon} size={20} />
      )}
      <span className={styles.message}>{message}</span>
    </div>
  );
}
