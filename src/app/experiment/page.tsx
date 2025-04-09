'use client';

import React from 'react';
import { Button, createButtonProps } from '@/components/ui/Button';
import { ScouterViewer } from '@/components/ui/Scouter';
import { ExperimentSpeechBubble } from '@/components/ui/ExperimentSpeechBubble';
import { SpeechBubble } from '@/components/ui/SpeechBubble';
import RotatingArcs from '@/components/ui/futuristic-hud';

export default function Page() {
  const buttonProps = createButtonProps('button', 'Submit', 'lightblue');

  return (
    <>
      <h2>Experiment Page</h2>
      <p>hello, world</p>
      <h3>例えば、ここでコンポーネントを置いて挙動のテストをする</h3>
      <Button button={buttonProps} />
      <ExperimentSpeechBubble />
      <ExperimentSpeechBubble direction="up" />
      <ExperimentSpeechBubble direction="right" />
      <ExperimentSpeechBubble direction="down" />
      <ExperimentSpeechBubble direction="left" />
      <SpeechBubble />
      <SpeechBubble mode="pc" />
      <h3>
        例えば、ここでフォロワー数取得のロジックを置いて挙動のテストをする
      </h3>
      <div className="mx-auto p-4">
        <h1 className="text-4xl font-bold">Hello, Tailwind CSS!</h1>
      </div>
      <div className="w-full h-[400px]">
        <ScouterViewer />
      </div>
      <div className="w-full h-[400px]">
        <RotatingArcs />
      </div>
    </>
  );
}
