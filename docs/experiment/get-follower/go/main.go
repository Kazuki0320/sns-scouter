package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func main() {

	// .envファイルを読み込む
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	X_USER_NAME := os.Getenv("X_USER_NAME")
	fmt.Println(X_USER_NAME)

	X_BEARER_TOKEN := os.Getenv("X_BEARER_TOKEN")
	fmt.Println(X_BEARER_TOKEN)

	log.Println("log X_USER_NAME:", X_USER_NAME)
	log.Println("log X_BEARER_TOKEN len :", len(X_BEARER_TOKEN))

	isUsers := false
	if isUsers {
		users(X_USER_NAME, X_BEARER_TOKEN)
	} else {
		user(X_USER_NAME, X_BEARER_TOKEN)
	}
}

func users(username, token string) {
	url := "https://api.twitter.com/2/users/by?usernames=" + username
	log.Println("log url:", url)

	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Set("Authorization", "Bearer "+token)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)
	fmt.Println(string(body))

	// 上記で取得したJSONをパースして、必要な情報を取り出す
	var data map[string]interface{}
	json.Unmarshal(body, &data)

	// 以下のデータから、idを取り出す
	// {"data":[{"id":"1201638194745233408","name":"xの表示名","username":"xの@ほにゃららのところ"}]}
	fmt.Println(data["data"].([]interface{})[0].(map[string]interface{})["id"])
	fmt.Println(data["data"].([]interface{})[0].(map[string]interface{})["name"])
	fmt.Println(data["data"].([]interface{})[0].(map[string]interface{})["username"])

	// レートリミットの残り回数を取得
	rateLimitRemaining := resp.Header.Get("x-rate-limit-remaining")
	fmt.Println("Rate Limit Remaining:", rateLimitRemaining)
}

func user(username, token string) {
	url := "https://api.twitter.com/2/users/by/username/" + username
	log.Println("log url:", url)

	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Set("Authorization", "Bearer "+token)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)
	fmt.Println(string(body))

	// 上記で取得したJSONをパースして、必要な情報を取り出す
	var data map[string]interface{}
	json.Unmarshal(body, &data)

	// userID := data["data"].(map[string]interface{})["id"]
	fmt.Println(data["data"].(map[string]interface{})["id"])
	fmt.Println(data["data"].(map[string]interface{})["name"])
	fmt.Println(data["data"].(map[string]interface{})["username"])

	// レートリミットの残り回数を取得
	rateLimitRemaining := resp.Header.Get("x-rate-limit-remaining")
	fmt.Println("Rate Limit Remaining:", rateLimitRemaining)
}
