'use client';

import React, { useState } from 'react';
import { Button, createButtonProps } from '@/components/ui/Button';
import { X } from 'lucide-react';
import '@/app/globals.css';

type FormProps = {
  onSubmit: (value: number) => void;
  onError: (hasError: boolean) => void;
};

export default function Form({ onSubmit, onError }: FormProps) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);
  const isDisabled = inputValue === '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const sanitizedValue = value.replace(/\D/g, '');

    if (sanitizedValue === '') {
      setInputValue('');
      setError('半角数字を入力してください');
      onError(true);
      return;
    }

    const parsed = Number(sanitizedValue);
    if (parsed < 0) {
      setError('0以上の整数を入力してください');
      onError(true);
      return;
    }

    setError('');
    onError(false);
    setInputValue(sanitizedValue);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue === '') {
      setError('数値を入力してください');
      onError(true);
      return;
    }

    const parsed = Number(inputValue);
    onError(false);
    onSubmit(parsed);
  };

  const handleXIcon = () => {
    setTouched(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-80 flex-col items-center gap-4"
    >
      <label htmlFor="follower" className="sr-only">
        フォロワー数
      </label>
      <div className="flex items-center gap-2">
        <div className={`rounded-full border p-2 ${
          error && touched ? 'border-red-500 bg-red-900' : 'border-blue-500 bg-blue-900'
        } pulseGentle`}
        >
          <X className="size-5 text-blue-400" />
        </div>
        <input
          id="follower"
          type="text"
          placeholder="Xのフォロワー数を入力してください"
          value={inputValue}
          onChange={handleChange}
          onBlur={handleXIcon}
          className="w-[300px] rounded-lg border border-green-500/50 bg-black/50 px-4 py-3 text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/50"
          min="0"
        />
      </div>
      {error && (
        <div className="w-full text-center text-sm text-red-500">{error}</div>
      )}
      <Button
        button={createButtonProps('submit', '戦闘力を計算する', isDisabled)}
      />
    </form>
  );
}
