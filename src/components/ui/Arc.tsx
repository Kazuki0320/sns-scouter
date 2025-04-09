"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { Html } from "@react-three/drei"

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
    const totalDuration = 3000 // 3秒間のアニメーション
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
          <div className="w-[300px] h-[300px] border-2 border-green-400/70 rounded-full"></div>

          {/* 回転するアーク1 */}
          <div className="arc-outer-1"></div>

          {/* 回転するアーク2 */}
          <div className="arc-outer-2"></div>

          {/* 回転するアーク4 - 点線 */}
          <div className="arc-dashed"></div>

          {/* 回転するアーク5 - 部分的な弧 */}
          <div className="arc-partial"></div>

          {/* ターゲティングレティクル */}
          <div className="targeting-reticle">
            {/* 三角形マーカー - 円の外側に配置 */}
            <div className="triangle-marker top-marker"></div>
            <div className="triangle-marker right-marker"></div>
            <div className="triangle-marker bottom-marker"></div>
            <div className="triangle-marker left-marker"></div>
          </div>

          {/* スキャンエフェクト */}
          <div className={`scan-effect ${scanning ? "scanning" : ""}`}></div>

          {/* ターゲット状態表示 */}
          <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 text-xs font-mono text-green-500">
            {targeting ? "TARGETING..." : scanning ? "TARGET LOCKED" : "STANDBY"}
          </div>
        </div>

        {/* カスタムアニメーション用のスタイル */}
        <style jsx>{`
          @keyframes spinArc {
            0% {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            100% {
              transform: translate(-50%, -50%) rotate(360deg);
            }
          }
          
          @keyframes spinArcReverse {
            0% {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            100% {
              transform: translate(-50%, -50%) rotate(-360deg);
            }
          }
          
          @keyframes pulse {
            0% {
              opacity: 0.3;
            }
            50% {
              opacity: 0.8;
            }
            100% {
              opacity: 0.3;
            }
          }
          
          @keyframes scan {
            0% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.8);
            }
            20% {
              opacity: 0.5;
            }
            80% {
              opacity: 0.5;
            }
            100% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(1.2);
            }
          }
          
          @keyframes blink {
            0%, 100% {
              opacity: 0.3;
            }
            50% {
              opacity: 1;
            }
          }
          
          /* アークスタイル */
          .arc-outer-1 {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 340px;
            height: 340px;
            border: 1px solid rgba(0, 200, 100, 0.6);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: spinArc 30s linear infinite;
          }
          
          .arc-outer-2 {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 380px;
            height: 380px;
            border: 1px solid rgba(0, 200, 100, 0.4);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: spinArcReverse 40s linear infinite;
          }
          
          .arc-dashed {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 320px;
            height: 320px;
            border: 1px dashed rgba(0, 200, 100, 0.5);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: spinArc 20s linear infinite;
          }
          
          .arc-partial {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 400px;
            height: 400px;
            border: 2px solid transparent;
            border-top: 2px solid rgba(0, 200, 100, 0.7);
            border-left: 2px solid rgba(0, 200, 100, 0.7);
            border-radius: 50%;
            transform: translate(-50%, -50%) rotate(45deg);
            animation: spinArc 3s linear infinite;
          }
          
          /* ターゲティングレティクルスタイル */
          .targeting-reticle {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 280px;
            height: 280px;
            transform: translate(-50%, -50%);
          }

          .triangle-marker {
            position: absolute;
            width: 0;
            height: 0;
            border-style: solid;
            animation: blink 2s infinite;
          }
          
          .top-marker {
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            border-width: 0 8px 12px 8px;
            border-color: transparent transparent rgba(0, 200, 100, 0.7) transparent;
          }
          
          .right-marker {
            top: 50%;
            right: -30px;
            transform: translateY(-50%);
            border-width: 8px 0 8px 12px;
            border-color: transparent transparent transparent rgba(0, 200, 100, 0.7);
          }
          
          .bottom-marker {
            bottom: -30px;
            left: 50%;
            transform: translateX(-50%);
            border-width: 12px 8px 0 8px;
            border-color: rgba(0, 200, 100, 0.7) transparent transparent transparent;
          }
          
          .left-marker {
            top: 50%;
            left: -30px;
            transform: translateY(-50%);
            border-width: 8px 12px 8px 0;
            border-color: transparent rgba(0, 200, 100, 0.7) transparent transparent;
          }
          
          .scan-effect {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0, 200, 100, 0.2) 0%, transparent 70%);
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
          
          .scan-effect.scanning {
            animation: scan 3s ease-out;
          }
        `}</style>
      </div>
    </Html>
  )
}
