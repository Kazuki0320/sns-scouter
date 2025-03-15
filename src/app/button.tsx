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
export const ShareButton: React.FC<ShareButtonProps> = ({ text }) => {

  const _url = new URL("https://twitter.com/intent/tweet");
  
  if (text !== undefined) _url.searchParams.set("text", text);
  _url.searchParams.append("hashtags", "SNSスカウター");
  
  return (
    <>
    <a
      href={_url.toString()}
      target="_blank"
      rel="noopener noreferrer"
    >
      シェアする
    </a>
  </>
  );
}