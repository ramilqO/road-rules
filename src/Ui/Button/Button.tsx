import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";

interface IButton {
  type?: buttonType;
  to?: string;
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
}

type buttonType = "submit" | "reset" | "button";

export default function Button({
  type = 'button',
  to,
  children = '',
  onClick,
  disabled = false,
  className = '',
}: IButton) {
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
