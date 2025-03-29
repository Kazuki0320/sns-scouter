import React, { JSX } from 'react';
import { Button, createButtonProps } from './Button';

type ShareButtonProps = {
  tweetText: string;
};

export function ShareButton(props: ShareButtonProps): JSX.Element {
  const { tweetText } = props;

  function handleShare() {
    const twitterShareUrl =
      'https://x.com/intent/tweet?text=わたしのSNS戦闘力は' +
      tweetText +
      'です&hashtags=SNSスカウター';
    const newWindow = window.open(twitterShareUrl); // シェアリンクを新しいタブで開く

    if (
      !newWindow ||
      newWindow.closed ||
      typeof newWindow.closed === 'undefined'
    ) {
      alert(
        'シェアがうまく行えませんでした。申し訳ありませんが、ご自身でシェアをお願いいたします。'
      );
    }
  }

  const buttonProps = createButtonProps('button', 'Xでシェアする', 'lightblue');

  return <Button button={buttonProps} onClick={handleShare} />;
}
