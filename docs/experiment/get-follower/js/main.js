const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

const X_USER_NAME = process.env.X_USER_NAME;
const X_BEARER_TOKEN = process.env.X_BEARER_TOKEN;

console.log('log X_USER_NAME:', X_USER_NAME);
console.log('log X_BEARER_TOKEN len:', X_BEARER_TOKEN.length);

const isUsers = false;

if (isUsers) {
  users(X_USER_NAME, X_BEARER_TOKEN);
} else {
  user(X_USER_NAME, X_BEARER_TOKEN);
}

async function users(username, token) {
  const url = `https://api.twitter.com/2/users/by?usernames=${username}`;
  console.log('log url:', url);

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data;
    console.log(data);

    const userData = data.data[0];
    console.log(userData.id);
    console.log(userData.name);
    console.log(userData.username);

    const rateLimitRemaining = response.headers['x-rate-limit-remaining'];
    console.log('Rate Limit Remaining:', rateLimitRemaining);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function user(username, token) {
  const url = `https://api.twitter.com/2/users/by/username/${username}`;
  console.log('log url:', url);

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data;
    console.log(data);

    const userData = data.data;
    console.log(userData.id);
    console.log(userData.name);
    console.log(userData.username);

    const rateLimitRemaining = response.headers['x-rate-limit-remaining'];
    console.log('Rate Limit Remaining:', rateLimitRemaining);
  } catch (error) {
    console.error('Error:', error);
  }
}
