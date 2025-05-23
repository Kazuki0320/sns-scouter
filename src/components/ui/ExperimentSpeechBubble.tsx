import React from 'react';
import styles from '@/styles/experimentSpeechBubble.module.css';

export function ExperimentSpeechBubble({ direction = 'Down' }) {
  return (
    <div className={styles.speechBubble}>
      <div className={`${styles.arrow} ${styles[`arrow${direction}`]}`}></div>
    </div>
  );
}
