'use client'

import React from 'react';
import { Button, createButtonProps } from '@/components/ui/Button';
import { ScouterViewer } from '@/components/ui/Scouter';

export default function Page() {
  const buttonProps = createButtonProps('button', 'Submit', 'lightblue');

  return (
    <>
      <h2>Experiment Page</h2>
      <h3>例えば、ここでコンポーネントのボタンを置いて挙動のテストをする</h3>
      <Button button={buttonProps} />
      <h3>
        例えば、ここでフォロワー数取得のロジックを置いて挙動のテストをする
      </h3>
      <p>hello, world</p>
      <div className="mx-auto p-4">
        <h1 className="text-4xl font-bold">Hello, Tailwind CSS!</h1>
      </div>
      <div className="w-full h-[400px]">
        <ScouterViewer />
      </div>
    </>
  );
}
