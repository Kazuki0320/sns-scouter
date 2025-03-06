async function fetchData() {
    await new Promise((resolve) => setTimeout(resolve, 3000)); // 3秒待つ
    return {message: "SNSの結果表示"};
}

export default async function Page() {
    const data = await fetchData(); // データ取得のシミュレーション
    return (
        <>
            <h2>Result Page</h2>
            <h3>
                ここでスカウターの測定結果を表示する。Xへのシェアボタンもここに配置
            </h3>
            <h3>
                {data.message}
            </h3>
        </>
    );
}