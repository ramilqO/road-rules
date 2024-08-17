import type { MouseEventHandler, ReactNode } from 'react';

import style from './Button.module.scss';

type ButtonType = 'submit' | 'reset' | 'button';

interface IButton {
  type?: ButtonType;
  text: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export default function Button({
  type = 'button',
  text = '',
  onClick,
  disabled = false,
}: IButton) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={style.button}
    >
      {text}
    </button>
  );
}
