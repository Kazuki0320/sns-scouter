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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
      <label htmlFor="follower" className="sr-only">
        フォロワー数
      </label>
      <input
        id="follower"
        type="text"
        placeholder="フォロワー数を入力してください"
        value={inputValue}
        onChange={handleChange}
        className="p-2 border-gray-300 rounded-md text-black"
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button
        type="submit"
        disabled={isDisabled}
        className={`py-2 px-4 rounded-md transition ${
          isDisabled
            ? 'bg-[#324E54] cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        はじめる
      </button>
    </form>
  );
}
