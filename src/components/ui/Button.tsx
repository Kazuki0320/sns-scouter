import React, {JSX} from 'react';

type ButtonProps = {
  name: string;
  color: string;
  onClick: () => void;
};

export function Button(props: ButtonProps):JSX.Element {
  const { name, color, onClick } = props;
  return (
    <button style={{ backgroundColor: color }} onClick={onClick}>
      {name}
    </button>
  );
}