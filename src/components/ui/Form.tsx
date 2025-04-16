'use client';

import React, { useState } from 'react';
import { Button, createButtonProps } from '@/components/ui/Button';

type FormProps = {
  onSubmit: (value: number) => void;
};

export default function Form({ onSubmit }: FormProps) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const isDisabled = inputValue === '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const sanitizedValue = value.replace(/\D/g, '');

    if (sanitizedValue === '') {
      setInputValue('');
      setError('半角数字を入力してください');
      return;
    }

    const parsed = Number(sanitizedValue);
    if (parsed < 0) {
      setError('0以上の整数を入力してください');
      return;
    }

    setError('');
    setInputValue(sanitizedValue);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue === '') {
      setError('数値を入力してください');
      return;
    }

    const parsed = Number(inputValue);

    onSubmit(parsed);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-80 flex-col gap-4">
      <label htmlFor="follower" className="sr-only">
        フォロワー数
      </label>
      <input
        id="follower"
        type="text"
        placeholder="フォロワー数を入力してください"
        value={inputValue}
        onChange={handleChange}
        className="w-full rounded-lg border border-green-500/50 bg-black/50 px-4 py-3 text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/50"
        min="0"
      />
      {error && <div className="text-sm text-red-500">{error}</div>}
      <Button
        button={createButtonProps(
          'submit',
          '戦闘力を計算する',
          '',
          isDisabled
        )}
      />
    </form>
  );
}
