import React, { JSX } from 'react';

type Button = {
  type: 'submit' | 'reset' | 'button' | undefined;
  name: string;
  color: string;
};

type ButtonProps = {
  button: Button;
  onClick?: () => void;
};

export function Button(props: ButtonProps): JSX.Element {
  const { button, onClick } = props;

  return (
    <>
      <button
        type={button.type}
        style={{ backgroundColor: button.color }}
        onClick={onClick}
      >
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
