'use client';

import { ShareButton } from '@/components/ui/Button';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from './loading';

export default function Page() {
  const [loading, setLoading] = useState(true);
  const battlePowerResult = useSearchParams();
  const followers = Number(battlePowerResult.get('score'));

  useEffect (() => {
    const timer = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return Loading()
  }

  return (
    <>
      <h2>Result Page</h2>
      <h3>{followers}</h3>
      <ShareButton text="test" />
    </>
  );
}