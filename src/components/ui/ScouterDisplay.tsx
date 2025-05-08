'use client';

import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import RotatingArcs from '@/components/ui/RotatingArcs';

export function ScouterDisplay() {
  const modelRef = useRef<THREE.Group>(null);

  const [textRotation, setTextRotation] = useState<[number, number, number]>([
    0, 0, 0,
  ]);
  const [arcPosition, setArcPosition] = useState<
    [number, number, number] | null
  >(null);

  useEffect(() => {
    if (modelRef.current) {
      const box = new THREE.Box3().setFromObject(modelRef.current);
      const center = new THREE.Vector3();
      const size = new THREE.Vector3();
      box.getCenter(center);
      box.getSize(size);

      const displayRotation: [number, number, number] = [0, 0, 0];

      setTextRotation(displayRotation);

      const arcDisplayCenter: [number, number, number] = [
        center.x,
        center.y,
        center.z + size.z * 0.25,
      ];
      setArcPosition(arcDisplayCenter);
    }
  }, []);

  return (
    <group ref={modelRef}>
      {arcPosition && (
        <RotatingArcs position={arcPosition} rotation={textRotation} />
      )}
    </group>
  );
}
