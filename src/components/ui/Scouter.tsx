'use client';

import styles from '@/app/result/loading.module.css';
import { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import Loading from '@/app/result/loading';

// 3Dモデル + 数字を表示するコンポーネント
function ScouterModel() {
  const modelPath = '/scouter1.glb';
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef(null);

  const [textPosition, setTextPosition] = useState<
    [number, number, number] | null
  >(null);
  const [textRotation, setTextRotation] = useState<[number, number, number]>([
    0, 0, 0,
  ]);

  useEffect(() => {
    if (modelRef.current) {
      const box = new THREE.Box3().setFromObject(modelRef.current);
      const center = new THREE.Vector3();
      const size = new THREE.Vector3();
      box.getCenter(center);
      box.getSize(size);

      // モデルより少し手前に表示（Z方向）
      const displayCenter: [number, number, number] = [
        center.x,
        center.y,
        center.z + 0.02,
      ];
      const displayRotation: [number, number, number] = [0, Math.PI / 4, 0]; // モデルと同じ向き

      setTextPosition(displayCenter);
      setTextRotation(displayRotation);

      console.log('モデルの中心:', center);
      console.log('テキスト位置:', displayCenter);
    }
  }, []);

  return (
    <group ref={modelRef}>
      <primitive
        object={scene}
        scale={0.5}
        position={[0, 0, 0.7]}
        rotation={[0, Math.PI / 4, 0]}
      />
      {textPosition && (
        <Loading />
      )}
    </group>
  );
}

// モデル読み込み中のローダー
function ModelWithErrorHandling() {
  return (
<Suspense
  fallback={
    <Html fullscreen>
      <div className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-xl">
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <span className="text-sm font-semibold">読み込み中...</span>
      </div>
    </Html>
  }
>
  <ScouterModel />
</Suspense>

  );
}

// メインビューアー
export function ScouterViewer() {
  return (
    <div className="w-full h-full relative">
      <Canvas camera={{ position: [0, 0, 2], fov: 50 }} shadows>
        {/* 背景・ライティング */}
        <color attach="background" args={['#f5f5f5']} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <spotLight
          position={[-5, 5, 5]}
          angle={0.3}
          penumbra={1}
          intensity={0.8}
          castShadow
        />

        {/* モデルと数値 */}
        <ModelWithErrorHandling />

        {/* カメラ操作 */}
        <OrbitControls
          enablePan
          enableZoom
          enableRotate
          minDistance={1}
          maxDistance={10}
        />
      </Canvas>
    </div>
  );
}

/**
 * 1. 主要なコンポーネント構成
RandomNumberHTML: ランダムな4桁の数字を生成し、HTMLで表示するコンポーネント

ScouterModel: 3Dスカウターモデルを読み込み、数字表示位置を計算するコンポーネント

ScouterViewer: メインのビューアーコンポーネントで、Canvasやライティングを設定

2. 数字表示の仕組み
generateRandomNumber()関数で1000-9999のランダムな数字を生成

useEffect内で2秒ごとに数字を更新

Htmlコンポーネント（@react-three/drei）を使用して3D空間内にHTMLコンテンツを表示

数字はCSSアニメーション（styles.countUp）で表示される

3. 3Dモデルの処理
useGLTFフックでGLTF形式の3Dモデルを読み込み

THREE.Box3を使用してモデルの境界ボックスを計算

モデルの中心位置を取得し、その位置に数字を表示

モデルは少し回転（rotation={[0, Math.PI / 4, 0]}）させて見栄えを良くしている

4. エラーハンドリング
Suspenseでラッピングし、モデル読み込み中は代替の球体メッシュと「読み込み中...」テキストを表示

5. カメラとライティング
OrbitControlsでユーザーがモデルを回転/ズームできるように

複数のライト（環境光、指向性ライト、スポットライト）を設定
 */