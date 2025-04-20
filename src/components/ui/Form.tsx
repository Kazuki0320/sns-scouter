'use client';

import React, { useState, useEffect } from 'react';
import { Button, createButtonProps } from '@/components/ui/Button';
import Image from 'next/image';
import '@/app/globals.css';
import { Info } from 'lucide-react';
import styles from '@/styles/tooltip.module.css';

type FormProps = {
  onSubmit: (value: number) => void;
  onError: (hasError: boolean) => void;
};

export default function Form({ onSubmit, onError }: FormProps) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
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

  const toggleTooltip = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setShowTooltip(true);
  }

  const handleMouseEnter = () => {
    setShowTooltip(true);
  }

  const handleMouseLeave = () => {
    setShowTooltip(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-80 flex-col items-center gap-4"
    >
      <label htmlFor="follower" className="sr-only">
        Xのフォロワー数
      </label>
      <div className="flex items-center gap-2">
        <div className={`rounded-full border p-2 ${
          error && touched ? 'border-red-500 bg-red-900' : 'border-white bg-black'
        } pulseGentle`}
        >
          <Image
            src="/logo-white.png"
            alt="X logo"
            width={20}
            height={20}
            className="size-5"
          />
        </div>
        <input
          id="follower"
          type="text"
          placeholder="Xのフォロワー数"
          value={inputValue}
          onChange={handleChange}
          onBlur={handleXIcon}
          className="w-[320px] rounded-lg border border-green-500/50 bg-black/50 px-4 py-3 text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/50"
          min="0"
        />
      </div>
      {error && (
        <div className="w-full text-center text-sm text-red-500">{error}</div>
      )}
      <div className="relative mb-2 text-center">
        <button
          type="button"
          className="text-gray-400 hover:text-green-400"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={toggleTooltip}
        >
          <Info className="inline mr-1 size-4" />
          <span className="text-sm">SNSスカウターについて</span>
        </button>
        {showTooltip && (
          <div className={styles.tooltip}>
            SNSスカウターは、あなたのXのフォロワー数から総合的な「戦闘力」を算出します。数値が高いほど、SNSでの影響力が大きいことを示します！
            <div className={styles.tooltipArrow}></div>
          </div>
        )}
      </div>
      <Button
        button={createButtonProps('submit', '戦闘力を測定する', isDisabled) }
      />
      <div className="mt-4 text-center text-xs text-green-400 animate-pulse">
        {inputValue ? "タップして戦闘力をスキャン！" : "Xのフォロワー数を入力してください"}
      </div>
    </form>
  );
}
