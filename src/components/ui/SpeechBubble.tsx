import React from 'react';

import Image from "next/image";
import webpImage from '../../../public/e1325_1.webp';
import webpMobileImage from '../../../public/e1241_1.webp';

export function SpeechBubble({ mode = 'mobile' }) {

  if (mode === 'mobile') {
    return (
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <Image 
          src={webpMobileImage} 
          alt="WebP Mobile Image" 
          width={300} // 幅を300pxに設定
          height={300} // 高さを200pxに設定
          style={{ display: 'block' }}
        />
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
          &nbsp;上位10%
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <Image 
        src={webpImage} 
        alt="WebP Image" 
        width={300} // 幅を300pxに設定
        height={300} // 高さを200pxに設定
        style={{ display: 'block' }}
      />
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
        &nbsp;&nbsp;&nbsp;上位10%
      </div>
    </div>
  );
}