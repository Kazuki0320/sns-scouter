import styles from '@/app/result/loading.module.css';

export default function Loading() {
  return (
    <div className={styles.lpage}>
      <div className={styles.countUp}>
        <span className={styles.text}>Loading</span>
      </div>
    </div>
  );
}
