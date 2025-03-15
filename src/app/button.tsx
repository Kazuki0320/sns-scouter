import React, { JSX } from 'react';

type Button = {
  type: 'submit' | 'reset' | 'button' | undefined;
  name: string;
  color: string;
};

type ButtonProps = {
  button: Button;
};

// memo: 関数コンポーネントとして定義するならこれでも通るよ
// const Button: FC<buttonProps> = (props) => {
//     const { button } = props;

//     return (
//         <>
//             <button type={button.type} style={{ backgroundColor: button.color }}>{button.name}</button>
//         </>
//     );
// }

export function Button(props: ButtonProps): JSX.Element {
  const { button } = props;

  return (
    <>
      <button type={button.type} style={{ backgroundColor: button.color }}>
        {button.name}
      </button>
    </>
  );
}

export function createButtonProps(
  type: 'submit' | 'reset' | 'button' | undefined,
  name: string,
  color: string
): Button {
  return { type, name, color };
}

interface ShareButtonProps {
  text: string;
}

//シェアボタン
//TODO：将来的にはボタンコンポーネントを使用してシェアボタンを作成する。現状UIが未定なので別でシェアボタンを作成
export function ShareButton({ text }: ShareButtonProps): JSX.Element {
  const url = new URL('https://x.com/intent/post');
  
  if (text !== undefined) url.searchParams.set('text', text);
  url.searchParams.append('hashtags', 'SNSスカウター');
  
  return (
    <>
    <a
      href={url.toString()}
      target='_blank'
      rel='noopener noreferrer'
    >
      シェアする
    </a>
  </>
  );
};