'use client';

import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import RotatingArcs from '@/components/ui/RotatingArcs';
import { ScouterModel } from '@/components/ui/ScouterModel';
import styles from '@/styles/scouterText.module.css';

function RandomNumberHTML({
  position,
  rotation,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
}) {
  const [randomNumber, setRandomNumber] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomNumber(Math.floor(Math.random() * 9000) + 1000);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Html
      position={position}
      rotation={rotation}
      transform
      distanceFactor={0.8}
      scale={1}
      occlude={false}
    >
      <div className={styles.scouterText}>{randomNumber}</div>
    </Html>
  );
}

export function ScouterDisplay() {
  const modelRef = useRef<THREE.Group>(null);

  const [textPosition, setTextPosition] = useState<[number, number, number] | null>(null);
  const [textRotation, setTextRotation] = useState<[number, number, number]>([0, 0, 0]);
  const [arcPosition, setArcPosition] = useState<[number, number, number] | null>(null);

  useEffect(() => {
    if (modelRef.current) {
      const box = new THREE.Box3().setFromObject(modelRef.current);
      const center = new THREE.Vector3();
      const size = new THREE.Vector3();
      box.getCenter(center);
      box.getSize(size);

      const displayCenter: [number, number, number] = [
        center.x - size.x * 0.15,
        center.y,
        center.z + size.z * 0.1,
      ];
      const displayRotation: [number, number, number] = [0, Math.PI / 4, 0];

      setTextPosition(displayCenter);
      setTextRotation(displayRotation);

      const arcDisplayCenter: [number, number, number] = [
        center.x - size.x * 0.15,
        center.y,
        center.z + size.z * 0.15,
      ];
      setArcPosition(arcDisplayCenter);
    }
  }, []);

  return (
    <group ref={modelRef}>
      <ScouterModel />
      {textPosition && (
        <RandomNumberHTML position={textPosition} rotation={textRotation} />
      )}
      {arcPosition && (
        <RotatingArcs position={arcPosition} rotation={textRotation} />
      )}
    </group>
  );
}