'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, Environment } from '@react-three/drei';
import styles from '@/styles/scouterText.module.css';
import { ScouterDisplay } from "@/components/ui/ScouterDisplay";
import { Button, createButtonProps } from '@/components/ui/Button';
import { useRouter, useSearchParams } from 'next/navigation';
import { ScouterViewer } from '@/components/ui/ScouterViewer';

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
    <div className="flex items-center justify-center">
      <div className="h-[750px] w-[800px]">
        <ScouterViewer />
      </div>
    </div>
  );
}
