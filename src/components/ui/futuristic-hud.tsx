"use client"

import { useEffect, useState } from "react"

export default function RotatingArcs() {
  const [scanning, setScanning] = useState(false)
  
  useEffect(() => {
    // スキャンアニメーションを定期的に開始
    const interval = setInterval(() => {
      setScanning(true)
      setTimeout(() => setScanning(false), 3000)
    }, 8000)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="relative w-full h-screen bg-white flex items-center justify-center">
      <div className="relative">
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
        <div className={`scan-effect ${scanning ? 'scanning' : ''}`}></div>
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
      `}</style>
    </div>
  )
}