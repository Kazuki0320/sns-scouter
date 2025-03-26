'use client'

import styles from '@/app/result/loading.module.css';
import { ScouterModel } from '@/components/ui/Scouter';

export default function Loading() {
  return (
    <>
      <div className={styles.lpage}>
        <div className={styles.countUp}>
          <span className={styles.text}>測定中...</span>
        </div>
      </div>
      <div className="w-full h-[400px]">
        <ScouterModel />
      </div>
    </>
  );
}
