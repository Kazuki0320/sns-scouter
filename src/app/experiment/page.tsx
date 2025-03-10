import React from 'react';
import { Button, createButtonProps } from '@/app/button';

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
    </>
  );
}
