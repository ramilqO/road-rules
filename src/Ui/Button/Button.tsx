import { ReactNode } from "react";
import style from "./Button.module.scss";

type ButtonType = "submit" | "reset" | "button";
type ButtonStyleType = "link" | "button";

interface IButton {
  type?: ButtonType;
  buttonStyle?: ButtonStyleType;
  text: string | ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({
  type = "button",
  buttonStyle = "button",
  text = "",
  onClick,
  disabled = false,
}: IButton) {
  return (
    <button
      color="#ffffff"
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${buttonStyle === "button" ? style.button : style.link} ${
        disabled && style["button--disabled"]
      } `}
    >
      {text}
    </button>
  );
}
