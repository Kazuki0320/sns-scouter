'use client';

import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

type ScouterModelProps = {
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
  const modelRef = useRef(null);

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
