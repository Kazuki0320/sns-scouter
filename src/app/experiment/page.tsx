import React from 'react';
import { Button, createButtonProps } from '@/components/ui/Button';
import { ExperimentSpeechBubble } from '@/components/ui/experimentSpeechBubble';
import { SpeechBubble } from '@/components/ui/SpeechBubble';

import Image from "next/image";
import localImage from '../../../public/e1325_1.webp';

export default function Page() {
  const buttonProps = createButtonProps('button', 'Submit', 'lightblue');

  return (
    <>
      <h2>Experiment Page</h2>
      <h3>例えば、ここでコンポーネントのボタンを置いて挙動のテストをする</h3>
      <Button button={buttonProps} />
      <ExperimentSpeechBubble />
      <ExperimentSpeechBubble direction="up" /> {/* 上向き */}
      <ExperimentSpeechBubble direction="right" /> {/* 右向き */}
      <ExperimentSpeechBubble direction="down" /> {/* 下向き（デフォルト） */}
      <ExperimentSpeechBubble direction="left" /> {/* 左向き */}
      <Image src={localImage} alt="WebP Image"/>
      <SpeechBubble />
      <h3>
        例えば、ここでフォロワー数取得のロジックを置いて挙動のテストをする
      </h3>
      <p>hello, world</p>
      <div className="mx-auto p-4">
        <h1 className="text-4xl font-bold">Hello, Tailwind CSS!</h1>
      </div>
    </>
  );
}