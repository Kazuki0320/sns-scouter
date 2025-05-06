'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ScouterViewer } from '@/components/ui/ScouterViewer';
import { Button, createButtonProps } from '@/components/ui/Button';

export default function Loading() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const score = searchParams.get('score');

  const handleSubmit = () => {
    if (score) {
      router.push(`/result?score=${score}`);
    }
  };
  
  return (
    <div className="flex items-center justify-center">
      <div className="h-[650px] w-[800px] flex flex-col items-center justify-center">
        <ScouterViewer />
        <div className="mt-2">
          <Button
            button={createButtonProps('button', '結果を見る')}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
