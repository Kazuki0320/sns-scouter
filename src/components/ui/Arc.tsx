"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { Html } from "@react-three/drei"
import styles from '@/components/ui/arc.module.css'

export default function RotatingArcs({
  position = [0, 0, 0] as [number, number, number],
  rotation = [0, 0, 0] as [number, number, number],
}) {
  const [scanning, setScanning] = useState(false)
  const [targeting, setTargeting] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const animationRef = useRef<number | null>(null)
  const startTimeRef = useRef(Date.now())

  // 特定のパスに沿ったアニメーション
  const animatePathMovement = useCallback(() => {
    if (!targeting) return

    const elapsedTime = Date.now() - startTimeRef.current
    const totalDuration = 3000 
    const progress = Math.min(elapsedTime / totalDuration, 1)

    // 3つのキーポイントを定義
    const keyPoints = [
      { x: 100, y: -80 }, // 右斜め上（開始位置）
      { x: -80, y: 60 }, // 左斜め下（中間位置）
      { x: 0, y: 0 }, // 中心（終了位置）
    ]

    // 進行状況に基づいて現在の位置を計算
    let currentX, currentY

    if (progress < 0.5) {
      // 最初の半分: 右上から左下へ
      const segmentProgress = progress * 2 // 0-0.5 を 0-1 にスケール
      // イージング関数を適用（加速してから減速）
      const easedProgress = 0.5 - 0.5 * Math.cos(segmentProgress * Math.PI)

      currentX = keyPoints[0].x + (keyPoints[1].x - keyPoints[0].x) * easedProgress
      currentY = keyPoints[0].y + (keyPoints[1].y - keyPoints[0].y) * easedProgress
    } else {
      // 後半: 左下から中心へ
      const segmentProgress = (progress - 0.5) * 2 // 0.5-1 を 0-1 にスケール
      // イージング関数を適用（加速してから減速）
      const easedProgress = 0.5 - 0.5 * Math.cos(segmentProgress * Math.PI)

      currentX = keyPoints[1].x + (keyPoints[2].x - keyPoints[1].x) * easedProgress
      currentY = keyPoints[1].y + (keyPoints[2].y - keyPoints[1].y) * easedProgress
    }

    // 位置を更新
    setOffset({
      x: currentX,
      y: currentY,
    })

    if (progress >= 1) {
      // アニメーション終了
      setTargeting(false)
      return
    }

    animationRef.current = requestAnimationFrame(animatePathMovement)
  }, [targeting])

  useEffect(() => {
    if (targeting) {
      startTimeRef.current = Date.now()
      // 初期位置を右斜め上に設定
      setOffset({ x: 100, y: -80 })
      animationRef.current = requestAnimationFrame(animatePathMovement)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [targeting, animatePathMovement])

  // スキャンとターゲティングのサイクル
  useEffect(() => {
    // スキャンアニメーションを定期的に開始
    const scanInterval = setInterval(() => {
      // まずターゲティング（特定パスの動き）を開始
      setTargeting(true)

      // 2秒後にスキャンを開始
      setTimeout(() => {
        setScanning(true)
        setTimeout(() => setScanning(false), 3000)
      }, 2000)
    }, 8000)

    return () => {
      clearInterval(scanInterval)
    }
  }, [])

  return (
    <Html position={position} rotation={rotation} transform distanceFactor={2} occlude={false}>
      <div className="relative pointer-events-none">
        <div
          className="relative scale-50 transform-gpu"
          style={{
            transform: `scale(0.5) translate(${offset.x}px, ${offset.y}px)`,
            transition: targeting ? "none" : "transform 0.5s ease-out",
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
          <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 text-xs font-mono text-green-500">
            {targeting ? "TARGETING..." : scanning ? "TARGET LOCKED" : "STANDBY"}
          </div>
        </div>
      </div>
    </Html>
  )
}
