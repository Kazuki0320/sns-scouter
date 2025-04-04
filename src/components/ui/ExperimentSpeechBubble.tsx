import React from 'react';
import styles from '@/components/ui/experimentSpeechBubble.module.css';

export function ExperimentSpeechBubble({ direction = 'down' }) {
  return (
    <div className={styles.speechBubble}>
      <div className={`${styles.arrow} ${styles[`arrow-${direction}`]}`}></div>
    </div>
  );
}
