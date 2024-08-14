import React from "react";

import style from "./UserShowRepeatPassword.module.scss";

interface ShowPasswordProps {
  repeatPasswordInputRef: React.RefObject<HTMLInputElement>;
}

export default function UserShowRepeatPassword({
  repeatPasswordInputRef,
}: ShowPasswordProps) {
  const handleChangeVisibilityRepeatPassword = () => {
    if (repeatPasswordInputRef.current) {
      repeatPasswordInputRef.current.type =
        repeatPasswordInputRef.current.type === "password"
          ? "text"
          : "password";
    }
  };

  return (
    <div className={style.visibilityPasswordContainer}>
      <input
        type="checkbox"
        onChange={handleChangeVisibilityRepeatPassword}
        className={style.visibilityPasswordContainer__inputCheckBox}
      />
      <label className={style.visibilityPasswordContainer__label}>
        Показать пароль
      </label>
    </div>
  );
}
