import { type ReactNode } from "react";
import { observer } from "mobx-react-lite";

import authStore from "@/stores/Auth/authStore";
import style from "./Button.module.scss";

import Loader from "../Loader/Loader";

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
    const buttonStyleClass = (() => {
      switch (buttonStyle) {
        case "link":
          return style.link;
        case "ticketButton":
          return `${style.button} ${style.button__ticket}`;
        default:
          return style.button;
      }
    })();

    const isLoading = authStore.isLoading;
    const isSubmitType = type === "submit";

    const combinedClassNames = [
      buttonStyleClass,
      isSubmitType && isLoading && style.button__disabled,
      disabled && style.button__disabled,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        type={type}
        className={combinedClassNames}
        color="#FFFFFF"
        disabled={isLoading || disabled}
        onClick={onClick}
      >
        {isSubmitType && isLoading ? <Loader /> : text}
      </button>
    );
  }
);

export default Button;
