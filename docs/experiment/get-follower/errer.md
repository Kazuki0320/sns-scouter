```
{
  "title": "Unsupported Authentication",
  "detail": "Authenticating with OAuth 2.0 Application-Only is forbidden for this endpoint.  Supported authentication types are [OAuth 1.0a User Context, OAuth 2.0 User Context].",
  "type": "https://api.twitter.com/2/problems/unsupported-authentication",
  "status": 403
}
```

ChatGPT

```
これは、Twitter API（X API）を使用してリクエストを送信した際に発生したエラーレスポンスです。内容を解析すると、次のような意味になります。

### **エラーの意味**
- **エラーメッセージ**: `Unsupported Authentication`（サポートされていない認証）
- **詳細**: `OAuth 2.0 Application-Only`（アプリケーションのみの認証）ではアクセスできないエンドポイントを呼び出している。
  - **許可されている認証方式**:
    1. **OAuth 1.0a User Context**（OAuth 1.0aのユーザーコンテキスト）
    2. **OAuth 2.0 User Context**（OAuth 2.0のユーザーコンテキスト）
- **ステータスコード**: `403 Forbidden`（アクセス禁止）

### **原因**
あなたが呼び出したTwitter APIのエンドポイントは、ユーザー認証が必要なものです。しかし、現在の認証方法が「**OAuth 2.0 Application-Only**」になっているため、アクセスできません。

### **解決策**
1. **OAuth 2.0 User Context で認証する**
   - クライアント側で **ユーザーのアクセストークン** を取得し、それを使用してAPIを呼び出す。
   - これは、ユーザーのTwitterアカウントを認証し、そのユーザーの権限でAPIを利用する方式。

2. **OAuth 1.0a User Context を使用する**
   - これは古い方式ですが、Twitter API v1.1 互換のエンドポイントでは依然として利用されることがあります。
   - `oauth_token` と `oauth_token_secret` を取得し、署名付きリクエストを送信する。

### **具体的な対応**
#### ① ユーザー認証が必要なエンドポイントを使っていないか確認
   - Twitter APIのドキュメントをチェックして、該当エンドポイントが **OAuth 2.0 Application-Only** で利用可能か確認する。
   - もし **OAuth 2.0 User Context** が必要なら、ユーザーアクセストークンを取得する。

#### ② アプリ認証（App-Only）を使う場合
   - `Bearer Token` を使っている場合、App-Only認証のため、ユーザー認証が必須のAPIにはアクセスできない。
   - その場合は、**OAuth 2.0 User Context** で認証し直す。

### **よくあるエラーの発生ケース**
1. **ツイートの取得API（GET /2/tweets/:id）をアプリ認証で呼び出した**
   - `OAuth 2.0 Application-Only` ではツイートの詳細取得が制限される場合がある。
   - `OAuth 2.0 User Context` で認証する必要がある。

2. **DM（ダイレクトメッセージ）の取得・送信を試みた**
   - DM系のエンドポイントは **ユーザー認証が必須** なので、アプリ認証では使えない。

### **まとめ**
このエラーは、アプリのみの認証（App-Only OAuth 2.0）ではアクセスできないAPIを呼び出したときに発生します。
- **解決策**: OAuth 2.0の **User Context** 認証を使って、ユーザーのアクセストークンを取得する。
- **確認すべきこと**: Twitter APIのドキュメントで、そのエンドポイントが `OAuth 2.0 Application-Only` に対応しているか確認する。

どのAPIを呼び出しているのか教えてくれれば、具体的な対処方法をアドバイスできます！ 🚀
```

```
{"title":"Too Many Requests","detail":"Too Many Requests","type":"about:blank","status":429}
panic: interface conversion: interface {} is nil, not map[string]interface {}
```

これは **Twitter API のレート制限 (Rate Limit) に引っかかったエラー** です。

---

## **エラーの解析**
1. **HTTP ステータスコード**: `429 Too Many Requests`
   - **短時間に API を呼びすぎたため、一時的にリクエストがブロックされた。**
   - Twitter API はレート制限 (Rate Limit) を設けており、**一定時間内に許可された回数以上のリクエストを送るとブロックされる。**

2. **エラーメッセージ**
   ```json
   {
     "title": "Too Many Requests",
     "detail": "Too Many Requests",
     "type": "about:blank",
     "status": 429
   }
- `status: 429` → レート制限オーバー
- `title: "Too Many Requests"` → API へのリクエストが多すぎる

3. **panic: interface conversion: interface {} is nil, not map[string]interface {}**
   - **Twitter API からのレスポンスを JSON として解析しようとしたが、 `nil` だったため `map[string]interface{}` に変換できなかった。**
   - つまり、Twitter API が `429 Too Many Requests` を返し、期待していた JSON データが取得できなかった。

---

## **なぜこのエラーが起こるのか？**

### **🔹 Twitter API のレート制限**

Twitter API には、エンドポイントごとに **一定時間内のリクエスト数制限** がある。例えば:

- **ユーザー情報取得** (`GET /users/by/username/:username`) → **15分ごとに 900 回**
- **ツイート取得** (`GET /tweets`) → **15分ごとに 900 回**
- **フォロワーリスト取得** (`GET /followers`) → **15分ごとに 15 回**  
  _(制限はエンドポイントごとに異なる)_

**短時間に API を連続で呼びすぎると、一時的にリクエストがブロックされる。**

---

## **解決策**

### ✅ **方法 1: リクエスト頻度を制限する**

- **API リクエストの間隔を空ける**（スリープを入れる）
- **1秒に1回程度の頻度** にするのが安全

#### **Go (Golang) でリクエスト間隔を制御する**

```go
package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"time"
)

func fetchUser(username string) {
	url := fmt.Sprintf("https://api.twitter.com/2/users/by/username/%s", username)
	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Set("Authorization", "Bearer YOUR_ACCESS_TOKEN")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode == 429 {
		fmt.Println("Rate limit exceeded. Waiting...")
		time.Sleep(15 * time.Minute) // 15分待機
		return
	}

	body, _ := ioutil.ReadAll(resp.Body)
	fmt.Println(string(body))

	// 次のリクエストまで待機（例: 1秒）
	time.Sleep(1 * time.Second)
}

func main() {
	usernames := []string{"user1", "user2", "user3"}
	for _, username := range usernames {
		fetchUser(username)
	}
}
```

**💡 ポイント:**

- `429 Too Many Requests` を受け取ったら **15分待機** (`time.Sleep(15 * time.Minute)`)
- 連続リクエストを防ぐため、**各リクエストの間に 1秒のスリープ (`time.Sleep(1 * time.Second)`) を入れる**

---

### ✅ **方法 2: レート制限の情報を取得する**

Twitter API は **レート制限情報をヘッダーに含めて返す**  
これを確認すれば、**今どれくらい使ったか & いつリセットされるか** がわかる。

#### **レスポンスヘッダーに含まれるレートリミット情報**

```http
x-rate-limit-limit: 900
x-rate-limit-remaining: 2
x-rate-limit-reset: 1712345678
```

| ヘッダー名               | 説明                               |
| ------------------------ | ---------------------------------- |
| `x-rate-limit-limit`     | 15分間に許可されているリクエスト数 |
| `x-rate-limit-remaining` | 残りリクエスト数                   |
| `x-rate-limit-reset`     | 次のリセット時間（Unix timestamp） |

#### **Go でレート制限をチェック**

```go
resetTime := resp.Header.Get("x-rate-limit-reset")
fmt.Println("Rate limit resets at:", resetTime)
```

---

### ✅ **方法 3: Twitter API の `expansions` & `fields` を活用**

**複数のリクエストをまとめる** ことで、リクエスト回数を減らす。

```http
GET https://api.twitter.com/2/users/by?usernames=user1,user2,user3
```

- **複数のユーザーを一度に取得する** (`?usernames=user1,user2,user3`)
- **余分なリクエストを削減できる**

---

### ✅ **方法 4: Twitter API の `App-Only Authentication` を使う**

- **ユーザー単位ではなく、アプリ単位の認証** を使うとレート制限が緩和される
- ただし、**ユーザーごとの情報取得には向かない**

---

## **まとめ**

| 解決策                                    | メリット                     | デメリット                         |
| ----------------------------------------- | ---------------------------- | ---------------------------------- |
| **リクエスト間隔を空ける** (`time.Sleep`) | 簡単に実装可能               | 遅延が発生する                     |
| **レート制限情報をチェック**              | 効率的にリクエスト管理できる | 実装が少し面倒                     |
| **複数ユーザーのデータをまとめて取得**    | API 呼び出し回数を削減       | 取得できるデータが限定的           |
| **App-Only Authentication を使う**        | レート制限が緩和される       | ユーザーごとのデータ取得には不向き |

✅ **結論:** **レート制限情報 (`x-rate-limit-remaining`) をチェックしつつ、リクエスト間隔を適切に調整するのがベスト！** 🚀

```

### レートリミットについて
- QA 回したところ、15 分に 3 回が目処っぽい。
- エラーハンドリング追加した方が良さそう。
- レートリミットの残り回数を取得する方法は記載の通り
```
