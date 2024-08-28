import { lazy, type ReactNode } from "react";
import { observer } from "mobx-react-lite";

import style from "./Button.module.scss";
import authStore from "../../stores/Auth/authStore1";

const Loader = lazy(() => import("../Loader/Loader"));

type ButtonType = "submit" | "reset" | "button";
type ButtonStyleType = "link" | "button" | "ticketButton";

interface IButton {
  type?: ButtonType;
  buttonStyle?: ButtonStyleType;
  text: string | ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = observer(
  ({
    type = "button",
    buttonStyle = "button",
    text = "",
    onClick,
    disabled = false,
  }: IButton) => {
    return (
      <button
        color="#ffffff"
        type={type}
        disabled={authStore.isLoading || disabled}
        onClick={onClick}
        className={`${
          (buttonStyle === "button" && style.button) ||
          (buttonStyle === "link" && style.link) ||
          (buttonStyle === "ticketButton" &&
            ` ${style.button} ${style["button--ticket"]}`)
        } ${
          ((type === "submit" && authStore.isLoading) || disabled) &&
          style["button--disabled"]
        } `}
      >
        {type === "submit" && authStore.isLoading ? <Loader /> : text}
      </button>
    );
  }
);

export default Button;
