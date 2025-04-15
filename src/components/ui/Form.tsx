'use client';

import React, { useState } from 'react';

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
        className="rounded-md border-gray-300 p-2 text-black"
      />
      {error && <div className="text-sm text-red-500">{error}</div>}
      <button
        type="submit"
        disabled={isDisabled}
        className={`rounded-md px-4 py-2 transition ${
          isDisabled
            ? 'cursor-not-allowed bg-[#324E54]'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        はじめる
      </button>
    </form>
  );
}
