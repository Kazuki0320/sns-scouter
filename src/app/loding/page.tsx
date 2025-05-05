'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, Environment } from '@react-three/drei';
import styles from '@/styles/scouterText.module.css';
import { ScouterDisplay } from "@/components/ui/ScouterDisplay";
import { Button, createButtonProps } from '@/components/ui/Button';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Loading() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const score = searchParams.get('score');

  const handleSubmit = () => {
    if (score) {
      router.push(`/result?score=${score}`);
    }
  };
  
  return (
    <div className="h-[400px] w-full">
      <Canvas
        camera={{
          position: [0, 0, 0.5],
          fov: 50,
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
          <ScouterDisplay />
        </Suspense>
      </Canvas>
      <Button
        onClick={handleSubmit}
        button={createButtonProps('button', '結果を見る')}
      />
    </div>
  );
}
