'use client';

import React from 'react';
import { ScouterViewer } from '@/components/ui/ScouterViewer';
import { ExperimentSpeechBubble } from '@/components/ui/ExperimentSpeechBubble';
import { SpeechBubble } from '@/components/ui/SpeechBubble';

export default function Page() {
  return (
    <>
      <h2>Experiment Page</h2>
      <p>hello, world</p>
      <h3>例えば、ここでコンポーネントを置いて挙動のテストをする</h3>
      <ExperimentSpeechBubble />
      <ExperimentSpeechBubble direction="Up" />
      <ExperimentSpeechBubble direction="Right" />
      <ExperimentSpeechBubble direction="Down" />
      <ExperimentSpeechBubble direction="Left" />
      <SpeechBubble />
      <SpeechBubble mode="pc" />
      <h3>
        例えば、ここでフォロワー数取得のロジックを置いて挙動のテストをする
      </h3>
      <div className="mx-auto p-4">
        <h1 className="text-4xl font-bold">Hello, Tailwind CSS!</h1>
      </div>
      <div className="h-[400px] w-full">
        <ScouterViewer />
      </div>
    </>
  );
}
