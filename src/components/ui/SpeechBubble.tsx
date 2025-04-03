import React from 'react';

import Image from "next/image";
import webpImage from '../../../public/e1325_1.webp';

export function SpeechBubble() {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <Image src={webpImage} alt="WebP Image" style={{ display: 'block' }} />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'black',
          fontSize: '30px',
          fontWeight: 'bold',
          textAlign: 'center',
          width: '100%',
        }}
      >
        黒い文字
      </div>
    </div>
  );
}