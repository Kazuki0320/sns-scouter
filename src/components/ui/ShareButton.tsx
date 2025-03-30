import React, {JSX} from 'react';
import { Button } from './Button';

type ShareButtonProps = {
  tweetText: string;
};

export function ShareButton(props: ShareButtonProps): JSX.Element {
  const { tweetText } = props;

  function handleShare() {
    const twitterShareUrl = 'https://x.com/intent/tweet?text=わたしのSNS戦闘力は'+tweetText+'です&hashtags=SNSスカウター';
    const newWindow = window.open(twitterShareUrl); // シェアリンクを新しいタブで開く

    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      alert('シェアがうまく行えませんでした。申し訳ありませんが、ご自身でシェアをお願いいたします。');
    }
  }

  return (
    <Button 
      button={{
        type:'button',
        name:'Xでシェアする',
        color:'Lightblue'
      }}
      onClick={handleShare}
    />
  );
}