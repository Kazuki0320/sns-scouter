'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, Environment, OrbitControls } from '@react-three/drei';
import { ScouterModel } from '@/components/ui/ScouterModel';
import styles from '@/styles/scouterText.module.css';

export function ScouterViewer() {
  return (
    <div className="mb-1 h-[500px] w-[800px] transition-all duration-1000">
      <Canvas
        camera={{
          position: [0, 0, 2],
          fov: 45,
          near: 0.1,
          far: 100,
        }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Environment preset="city" />
        <Suspense
          fallback={
            <Html fullscreen>
              <div className={styles.loadingBanner}>
                <svg
                  className={styles.loadingIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className={styles.iconCircle}
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className={styles.iconPath}
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                <span className="text-sm font-semibold">読み込み中...</span>
              </div>
            </Html>
          }
        >
          <ScouterModel scale={1} position={[0, 0.2, 0]} />
          <OrbitControls 
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI * 3/4}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
