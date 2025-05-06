'use client';

import { useRef, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export type ScouterModelProps = {
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  onRotationComplete?: () => void;
};

type MeshWithMaterial = THREE.Mesh & {
  material: THREE.Material & {
    transparent?: boolean;
    opacity?: number;
    needsUpdate?: boolean;
  };
};

export function ScouterModel({
  scale = 0.9,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  onRotationComplete,
}: ScouterModelProps) {
  const modelPath = '/scouterModel.glb';
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef<THREE.Group>(null);
  
  // フェードイン完了と回転完了の状態
  const [fadeInComplete, setFadeInComplete] = useState(false);
  const [rotationComplete, setRotationComplete] = useState(false);
  const rotationRef = useRef(0);
  
  // フェードイン効果を適用
  useEffect(() => {
    // 全てのマテリアルの透明度を設定
    scene.traverse((object: THREE.Object3D) => {
      const mesh = object as MeshWithMaterial;
      if (mesh.isMesh && mesh.material) {
        mesh.material.transparent = true;
        mesh.material.opacity = 0;
      }
    });
    
    // フェードインアニメーション
    let currentOpacity = 0;
    const fadeInterval = setInterval(() => {
      currentOpacity = Math.min(currentOpacity + 0.05, 1);
      
      scene.traverse((object: THREE.Object3D) => {
        const mesh = object as MeshWithMaterial;
        if (mesh.isMesh && mesh.material) {
          mesh.material.opacity = currentOpacity;
        }
      });
      
      if (currentOpacity >= 1) {
        clearInterval(fadeInterval);
        setFadeInComplete(true);
      }
    }, 50);
    
    return () => clearInterval(fadeInterval);
  }, [scene]);
  
  // フレームごとの処理
  useFrame((_, delta) => {
    if (!modelRef.current) return;
    
    if (fadeInComplete && !rotationComplete) {
      // フェードイン完了後、1回転
      rotationRef.current += delta * 2;
      modelRef.current.rotation.y = rotationRef.current;
      
      // 2πラジアン（360度）回転したら完了
      if (rotationRef.current >= Math.PI * 2) {
        setRotationComplete(true);
        // 回転完了を通知
        onRotationComplete?.();
      }
    }
  });

  return (
    <group ref={modelRef}>
      <primitive
        object={scene}
        scale={scale}
        position={position}
        rotation={rotation}
      />
    </group>
  );
}
