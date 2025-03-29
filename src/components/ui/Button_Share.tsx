import React, {JSX} from 'react';
import { Button } from './Button';

type ShareButtonProps = {
  tweetText: string;
};

export function ShareButton(props: ShareButtonProps): JSX.Element {
  const { text } = props;

  function handleShare() {
    const twitterShareUrl = 'https://x.com/intent/tweet?text=わたしのSNS戦闘力は'+text+'です&hashtags=SNSスカウター';
    window.open(twitterShareUrl, '_blank'); // シェアリンクを新しいタブで開く
  }

  return (
    <Button
      name='Xでシェアする'
      color='Lightblue'
      onClick={handleShare}
    />
  );
}