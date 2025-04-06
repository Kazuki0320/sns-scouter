'use client';

import styles from '@/app/result/loading.module.css';
import { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// ランダム数字を生成する関数
const generateRandomNumber = () => Math.floor(Math.random() * 9000) + 1000;

// HTMLベースのデジタルUI表示コンポーネント
function RandomNumberHTML({
  position = [0, 0, 0] as [number, number, number],
  rotation = [0, 0, 0] as [number, number, number],
}) {
  const [number, setNumber] = useState(generateRandomNumber());

  useEffect(() => {
    const interval = setInterval(() => {
      setNumber(generateRandomNumber());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Html
      position={position}
      rotation={rotation}
      transform
      distanceFactor={2} // 👈 スケーリングを抑える
      scale={1} // 👈 遠近効果を軽減
      occlude={false}
    >
      <div key={number} className={styles.countUp}>
        {number}
      </div>
    </Html>
  );
}

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
        <RandomNumberHTML position={textPosition} rotation={textRotation} />
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
      <div className={styles.loadingBanner}>
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

---

### 1. 主要なコンポーネント構成

- **RandomNumberHTML**  
  4桁のランダムな数字を一定間隔で生成し、3D空間内にHTMLとして表示するコンポーネント。`<Html />` を使って3Dモデル上にオーバーレイ表示される。

- **ScouterModel**  
  GLB形式のスカウターモデルを読み込み、モデルの中心座標をもとに数字表示の位置と回転を動的に計算・表示する。

- **ModelWithErrorHandling**  
  Suspenseを利用し、モデル読み込み中にアニメーション付きのローディングUI（スピナーとテキスト）を表示する。

- **ScouterViewer**  
  シーン全体を構成するメインコンポーネント。`Canvas` によって3D空間を構築し、ライティングやカメラコントロールも含まれる。

---

### 2. 数字表示の仕組み

- `generateRandomNumber()` により 1000〜9999 のランダムな数字を生成。
- `useEffect` フックを使って2秒ごとに数字を自動更新。
- `@react-three/drei` の `<Html />` コンポーネントで、3Dモデル上に直接HTMLを表示。
- 表示される数字は `loading.module.css` 内の `.countUp` クラスによりアニメーション効果がつけられる。

---

### 3. 3Dモデルの処理

- `useGLTF()` で `/scouter1.glb` モデルを読み込み。
- `THREE.Box3` でモデルの境界を取得し、中心位置を算出。
- 中心より少し前方（Z方向）にHTML数字を配置し、モデルと同じ角度（回転）で表示。
- モデル自体は `[0, 0, 0.7]` に配置され、`Math.PI / 4` ラジアン（約45度）回転されている。

---

### 4. ローディングとエラーハンドリング

- Suspenseによる読み込み中UIは、全画面表示の `<Html fullscreen />` 内にスピナーアイコンと「読み込み中...」テキストを表示。
- ユーザーに読み込み状況を視覚的に知らせ、UXを向上。

---

### 5. カメラとライティング設定

- `Canvas` のカメラは `[0, 0, 2]` に配置、視野角（fov）は50度。
- ライティングは以下の構成：
  - 環境光（ambientLight）で全体の明るさを確保
  - 指向性ライトとスポットライトで立体感と陰影を演出
- `OrbitControls` によりユーザーがモデルを回転、ズーム、パン操作可能。
  - 最小距離1、最大距離10に制限

---

必要があれば、この文章をドキュメントやREADME用にもっと整えたり、日本語⇔英語翻訳もできます！他にも手伝えることがあれば言ってくださいね。
 */