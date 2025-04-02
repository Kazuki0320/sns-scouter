"use client"

import styles from '@/app/result/loading.module.css';
import { Suspense, useState, useEffect, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Html, useGLTF } from "@react-three/drei"
import * as THREE from "three"

// ランダム数字を生成する関数
const generateRandomNumber = () => Math.floor(Math.random() * 9000) + 1000

// HTMLベースのデジタルUI表示コンポーネント
function RandomNumberHTML({ 
  position = [0, 0, 0] as [number, number, number],
  rotation = [0, 0, 0] as [number, number, number]
}) {
  const [number, setNumber] = useState(generateRandomNumber())

  useEffect(() => {
    const interval = setInterval(() => {
      setNumber(generateRandomNumber())
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Html
      position={position}
      rotation={rotation}
      transform
      distanceFactor={2}  // 👈 スケーリングを抑える
      scale={1}         // 👈 遠近効果を軽減
      occlude={false}
    >
      <div key={number} className={styles.countUp}>
        {number}
      </div>
    </Html>
  )
}


// 3Dモデル + 数字を表示するコンポーネント
function ScouterModel() {
  const MODEL_PATH = "/scouter1.glb"
  const { scene } = useGLTF(MODEL_PATH)
  const modelRef = useRef(null)

  const [textPosition, setTextPosition] = useState<[number, number, number] | null>(null)
  const [textRotation, setTextRotation] = useState<[number, number, number]>([0, 0, 0])

  useEffect(() => {
    if (modelRef.current) {
      const box = new THREE.Box3().setFromObject(modelRef.current)
      const center = new THREE.Vector3()
      const size = new THREE.Vector3()
      box.getCenter(center)
      box.getSize(size)

      // モデルより少し手前に表示（Z方向）
      const displayCenter: [number, number, number] = [center.x, center.y, center.z + 0.02]
      const displayRotation: [number, number, number] = [0, Math.PI / 4, 0] // モデルと同じ向き

      setTextPosition(displayCenter)
      setTextRotation(displayRotation)

      console.log("モデルの中心:", center)
      console.log("テキスト位置:", displayCenter)
    }
  }, [])

  return (
    <group ref={modelRef}>
      <primitive
        object={scene}
        scale={0.5}
        position={[0, 0, 0.7]}
        rotation={[0, Math.PI / 4, 0]}
      />
      {textPosition && (
        <RandomNumberHTML position={textPosition} rotation={textRotation} />
      )}
    </group>
  )
}

// モデル読み込み中のローダー
function ModelWithErrorHandling() {
  return (
    <Suspense
      fallback={
        <mesh>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial color="blue" />
          <Html position={[0, 1, 0]}>
            <div className="bg-black text-white px-3 py-2 rounded-md">読み込み中...</div>
          </Html>
        </mesh>
      }
    >
      <ScouterModel />
    </Suspense>
  )
}

// メインビューアー
export function ScouterViewer() {
  return (
    <div className="w-full h-full relative">
      <Canvas camera={{ position: [0, 0, 2], fov: 50 }} shadows>
        {/* 背景・ライティング */}
        <color attach="background" args={["#f5f5f5"]} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <spotLight position={[-5, 5, 5]} angle={0.3} penumbra={1} intensity={0.8} castShadow />

        {/* モデルと数値 */}
        <ModelWithErrorHandling />

        {/* カメラ操作 */}
        <OrbitControls enablePan enableZoom enableRotate minDistance={1} maxDistance={10} />
      </Canvas>
    </div>
  )
}
