'use client';

import { useRef, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export type ScouterModelProps = {
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
};

export function ScouterModel({
  scale = 0.9,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: ScouterModelProps) {
  const modelPath = '/scouterModel.glb';
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef<THREE.Group>(null);
  
  const [opacity, setOpacity] = useState(0);
  const [fadeInComplete, setFadeInComplete] = useState(false);
  const [rotationComplete, setRotationComplete] = useState(false);
  const rotationRef = useRef(0);
  
  // フェードイン効果を適用
  useEffect(() => {
    // 全てのマテリアルの透明度を設定
    scene.traverse((object: any) => {
      if (object.isMesh && object.material) {
        object.material.transparent = true;
        object.material.opacity = 0;
      }
    });
    
    // フェードインアニメーション
    const fadeInterval = setInterval(() => {
      setOpacity(prev => {
        const newOpacity = Math.min(prev + 0.05, 1);
        scene.traverse((object: any) => {
          if (object.isMesh && object.material) {
            object.material.opacity = newOpacity;
          }
        });
        
        if (newOpacity >= 1) {
          clearInterval(fadeInterval);
          setFadeInComplete(true);
        }
        
        return newOpacity;
      });
    }, 50);
    
    return () => clearInterval(fadeInterval);
  }, [scene]);
  
  // フレームごとの処理
  useFrame((_, delta) => {
    if (!modelRef.current) return;
    
    if (fadeInComplete && !rotationComplete) {
      // フェードイン完了後、1回転
      rotationRef.current += delta * 3;
      modelRef.current.rotation.y = rotationRef.current;
      
      // 2πラジアン（360度）回転したら完了
      if (rotationRef.current >= Math.PI * 2) {
        setRotationComplete(true);
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
