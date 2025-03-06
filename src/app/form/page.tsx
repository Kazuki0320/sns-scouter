import Link from "next/link";

export default function Page() {
  return (
    <>
      <h2>Form Page</h2>
      <h3>ここで診断用に必要なフォーム入力があればこのページを使う</h3>
      <button>
          <Link href={"/result"}>結果ページへ移動</Link>
      </button>
    </>
  );
}
