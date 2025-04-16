/**

1. **コンポーネントの概要**
- `RotatingArcs`という3Dシーン用のUIコンポーネントを実装しています
- サイバーパンク風のターゲティング/スキャンエフェクトを表示する機能を持っています

2. **主な機能**
- 以下の3つの主要なアニメーション状態を管理します：
  - スタンバイ状態（通常状態）
  - ターゲティング状態（移動アニメーション）
  - スキャン状態（ロック完了状態）

3. **アニメーションの詳細**
- ターゲティングアニメーション：
  - 3つのキーポイントを経由する複雑な移動パスを実装
  - 左上→右上→左下→中心という順序で動作
  - イージング関数を使用して滑らかな動きを実現

4. **視覚的要素**
- 複数の回転するアーク（弧）
- ターゲティングレティクル（照準）
- スキャンエフェクト
- ステータス表示（"STANDBY"、"TARGETING..."、"TARGET LOCKED"）

5. **タイミング制御**
- 5秒ごとにアニメーションサイクルを実行
- ターゲティング（2秒）→スキャン（3秒）の順で動作

 */

'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { Html } from '@react-three/drei';
import styles from '@/styles/rotatingArcs.module.css';

const segmentMovement = (
  progress: number,
  startPoint: number,
  endPoint: number,
  keyPoints: {
    x: number;
    y: number;
  }[]
) => {
  const segmentProgress = progress * 3;
  const easedProgress = 0.5 - 0.5 * Math.cos(segmentProgress * Math.PI);
  const currentX =
    keyPoints[startPoint].x +
    (keyPoints[endPoint].x - keyPoints[startPoint].x) * easedProgress;
  const currentY =
    keyPoints[startPoint].y +
    (keyPoints[endPoint].y - keyPoints[startPoint].y) * easedProgress;

  return { currentX, currentY };
};

const segmentMovementTopleftToTopright = (
  progress: number,
  keyPoints: { x: number; y: number }[]
) => segmentMovement(progress, 0, 1, keyPoints);

const segmentMovementTopRightToBottomLeft = (
  progress: number,
  keyPoints: { x: number; y: number }[]
) => segmentMovement(progress, 1, 2, keyPoints);

const segmentMovementBottomLeftToCenter = (
  progress: number,
  keyPoints: { x: number; y: number }[]
) => segmentMovement(progress, 2, 3, keyPoints);

export default function RotatingArcs({
  position = [0, 0, 0] as [number, number, number],
  rotation = [0, 0, 0] as [number, number, number],
}) {
  const [scanning, setSegmentMove] = useState(false);
  const [targeting, setTargeting] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef(Date.now());

  // 特定のパスに沿ったアニメーション
  const animatePathMovement = useCallback(() => {
    if (!targeting) return;

    const elapsedTime = Date.now() - startTimeRef.current;
    const totalDuration = 2000;
    const progress = Math.min(elapsedTime / totalDuration, 1);

    // アニメーションの各段階を定数として定義
    const stage = {
      FIRST: 1 / 3, // 左上 → 右上
      SECOND: 2 / 3, // 右上 → 左下
      THIRD: 1, // 左下 → 中心
    };

    // 3つのキーポイントを定義
    const keyPoints = [
      { x: -80, y: -60 }, // 左上
      { x: 100, y: -80 }, // 右上
      { x: -80, y: 60 }, // 左下
      { x: 0, y: 0 }, // 中心
    ];


    // 進行状況に基づいて現在の位置を計算
    if (progress < stage.FIRST) {
      // セグメント移動パターン: 左上 → 右上
      const { currentX: x, currentY: y } = segmentMovementTopleftToTopright(
        progress,
        keyPoints
      );

      setOffset({ x: x, y: y });
    } else if (progress < stage.SECOND) {
      // セグメント移動パターン: 右上 → 左下
      const { currentX: x, currentY: y } = segmentMovementTopRightToBottomLeft(
        progress - stage.FIRST,
        keyPoints
      );

      setOffset({ x: x, y: y });
    } else {
      // セグメント移動パターン: 左下 → 中心
      const { currentX: x, currentY: y } = segmentMovementBottomLeftToCenter(
        progress - stage.SECOND,
        keyPoints
      );

      setOffset({ x: x, y: y });
    }

    if (progress >= 1) {
      // アニメーション終了
      setTargeting(false);
      return;
    }

    animationRef.current = requestAnimationFrame(animatePathMovement);
  }, [targeting]);

  // targetingがtrueになったときにパスアニメーションを開始する
  useEffect(() => {
    if (targeting) {
      startTimeRef.current = Date.now();
      // 初期位置を左斜め上に設定
      setOffset({ x: -80, y: -60 });
      animationRef.current = requestAnimationFrame(animatePathMovement);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targeting, animatePathMovement]);

  // スキャンとターゲティングのサイクル
  useEffect(() => {
    // スキャンアニメーションを定期的に開始
    const segmentMoveInterval = setInterval(() => {
      // まずターゲティング（特定パスの動き）を開始
      setTargeting(true);

      // 2秒後にスキャンを開始
      setTimeout(() => {
        setSegmentMove(true);
        setTimeout(() => setSegmentMove(false), 3000);
      }, 2000);
    }, 5000);

    return () => {
      clearInterval(segmentMoveInterval);
    };
  }, []);

  return (
    <Html position={position} rotation={rotation} transform distanceFactor={2} occlude={false}>
      <div className='relative pointer-events-none'>
        <div
          className='relative scale-50 transform-gpu'
          style={{
            transform: `scale(0.5) translate(${offset.x}px, ${offset.y}px)`,
            transition: targeting ? 'none' : 'transform 0.5s ease-out',
          }}
        >
          {/* メインの円 */}
          <div className={styles.circle}></div>

          {/* 回転するアーク1 */}
          <div className={styles.arcLayer1}></div>

          {/* 回転するアーク2 */}
          <div className={styles.arcLayer2}></div>

          {/* 回転するアーク4 - 点線 */}
          <div className={styles.arcDashed}></div>

          {/* 回転するアーク5 - 部分的な弧 */}
          <div className={styles.arcPartial}></div>

          {/* ターゲティングレティクル */}
          <div className={styles.targetingReticle}>
            {/* 三角形マーカー - 円の外側に配置 */}
            <div className={`${styles.triangleMarker} ${styles.topMarker}`}></div>
            <div className={`${styles.triangleMarker} ${styles.rightMarker}`}></div>
            <div className={`${styles.triangleMarker} ${styles.bottomMarker}`}></div>
            <div className={`${styles.triangleMarker} ${styles.leftMarker}`}></div>
          </div>

          {/* スキャンエフェクト */}
          <div className={`${styles.scanEffect} ${scanning ? styles.scanning : ''}`}></div>

          {/* ターゲット状態表示 */}
          <div className='absolute top-[-30px] left-1/2 transform -translate-x-1/2 text-xl font-mono text-green-500'>
            {targeting ? 'TARGETING...' : scanning ? 'LOCKED' : 'STANDBY'}
          </div>
        </div>
      </div>
    </Html>
  );
}
