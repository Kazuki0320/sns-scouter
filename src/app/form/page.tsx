"use client"; // useRouterを使うために必要
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <>
      <h2>Form Page</h2>
      <h3>ここで診断用に必要なフォーム入力があればこのページを使う</h3>
      <button
        onClick={() => {
          router.push("/result");
        }}
      >
        結果ページへ移動
      </button>
    </>
  );
}
