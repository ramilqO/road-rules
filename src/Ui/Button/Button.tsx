import type { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';

type ButtonType = 'submit' | 'reset' | 'button';
interface IButton {
  type?: ButtonType;
  to?: string; //TODO: этот проп не нужен
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string; //TODO: этот проп не нужен
}

export default function Button({
  type = 'button',
  to,
  //TODO: children лучше преименовать на text это имя создано для другого
  children = '',
  onClick,
  disabled = false,
  //TODO: классы не нужно передавать снаружи, все стили должны быть описаны внутри самой кнопки
  className = '',
}: IButton) {
  //TODO: проп to не нужно передавать, сделай нуный тебе редирект в функции onClick когда будет передавать эту функцию
  if (to)
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );

  return (
    <button
      type={type}
      disabled={disabled}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
