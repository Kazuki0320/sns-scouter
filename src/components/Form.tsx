'use client'

import React, { useState } from 'react'

type FormProps = {
  onSubmit: (value: number) => void;
};

export default function Form(this: any, { onSubmit }: FormProps) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const sanitizedValue = value.replace(/\D/g, "");

    if (sanitizedValue === "") {
      setInputValue("");
      setError("");
      return
    }

    const parsed = Number(sanitizedValue);
    if (parsed < 0) {
      setError("0以上の整数を入力してください");
      return
    }

    setError("");
    setInputValue(sanitizedValue);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (inputValue === "") {
      setError("数値を入力してください");
      return;
    }

    const parsed = Number(inputValue);

    onSubmit(parsed)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
      <input
        type="text"
        step="1"
        placeholder="フォロワー数を入力してください"
        value={inputValue}
        onChange={handleChange}
        className="p-2 border-gray-300 rounded-md text-black appearance-none no-spinner"
      />
      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
      >
        はじめる
      </button>
    </form>
  )
}
