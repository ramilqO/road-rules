import React from "react";

import style from "./ShowPassword.module.scss";

interface ShowPasswordProps {
  passwordInputRef: React.RefObject<HTMLInputElement>;
}

export default function UserShowPassword({
  passwordInputRef,
}: ShowPasswordProps) {
  const handleChangeVisibilityPassword = () => {
    if (passwordInputRef.current) {
      passwordInputRef.current.type =
        passwordInputRef.current.type === "password" ? "text" : "password";
    }
  };

  return (
    <div className={style.visibilityPasswordContainer}>
      <input
        type="checkbox"
        onChange={handleChangeVisibilityPassword}
        className={style.visibilityPasswordContainer__inputCheckBox}
      />
      <label className={style.visibilityPasswordContainer__label}>
        Показать пароль
      </label>
    </div>
  );
}
