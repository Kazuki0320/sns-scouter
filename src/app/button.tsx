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
