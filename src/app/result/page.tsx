import {ShareButton} from '@/app/button';

async function fetchData() {
  // NOTE: ローデイング画面を確認するための一時的な処理
  await new Promise((resolve) => setTimeout(resolve, 3000)); // 3秒待つ
  return { message: 'SNSの結果表示' };
}

export default async function Page() {
  const data = await fetchData(); // データ取得のシミュレーション
  return (
    <>
      <h2>Result Page</h2>
      <h3>
        ここでスカウターの測定結果を表示する。
      </h3>
      <ShareButton text="test"/>
      <h3>{data.message}</h3>
    </>
  );
}
