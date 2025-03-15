'use client';

import { useState } from 'react';

type FormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function Form({ onSubmit }: FormProps) {
  const [inputValue, setInputValue] = useState('');

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 w-80">
      <input
        type="text"
        placeholder="フォロワー数を入力してください"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="p-2 border border-gray-300 rounded-md"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
      >
        はじめる
      </button>
    </form>
  );
}
