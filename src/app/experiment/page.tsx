import React from 'react';
import { Button, createButtonProps } from '@/components/ui/Button';
import { SpeechBubble } from '@/components/ui/SpeechBubble';

export default function Page() {
  const buttonProps = createButtonProps('button', 'Submit', 'lightblue');

  return (
    <>
      <h2>Experiment Page</h2>
      <h3>例えば、ここでコンポーネントのボタンを置いて挙動のテストをする</h3>
      <Button button={buttonProps} />
      <SpeechBubble />
      <SpeechBubble direction="up" /> {/* 上向き */}
      <SpeechBubble direction="right" /> {/* 右向き */}
      <SpeechBubble direction="down" /> {/* 下向き（デフォルト） */}
      <SpeechBubble direction="left" /> {/* 左向き */}
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