'use client';

import { ShareButton } from '@/components/ui/Button';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const battlePowerResult = useSearchParams();
  const followers = Number(battlePowerResult.get('score'));
  return (
    <>
      <h2>Result Page</h2>
      <h3>{followers}</h3>
      <ShareButton text="test" />
    </>
  );
}
