import { ShareButton } from '@/app/button';

async function fetchData() {
  // NOTE: ローディング画面を一定時間表示するための一時的な処理
  await new Promise((resolve) => setTimeout(resolve, 4000));
  return { message: 'SNSの結果表示' };
}

export default async function Page() {
  const data = await fetchData();
  return (
    <>
      <h2>Result Page</h2>
      <h3>ここでスカウターの測定結果を表示する。</h3>
      <ShareButton text="test" />
      <h3>{data.message}</h3>
    </>
  );
}
