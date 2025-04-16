import React, { JSX } from 'react';
import styles from '@/styles/button.module.css';

type Button = {
  type: 'submit' | 'reset' | 'button' | undefined;
  name: string;
  color: string;
  disabled?: boolean;
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
        className={styles.button}
        disabled={button.disabled}
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
  color: string,
  disabled?: boolean
): Button {
  return { type, name, color, disabled };
}
