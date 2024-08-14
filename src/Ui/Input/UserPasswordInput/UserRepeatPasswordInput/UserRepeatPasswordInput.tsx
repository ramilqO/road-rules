import { useRef, useState } from "react";

import style from "./UserRepeatPasswordInput.module.scss";

import UserShowRepeatPassword from "../ShowPassword/UserShowRepeatPassword/UserShowRepeatPassword";

export default function UserRepeatPasswordInput({
  password,
}: {
  password: string;
}) {
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  const repeatPasswordInputRef = useRef<HTMLInputElement>(null);

  const isPasswordMismatch =
    password.length > 0 &&
    repeatPassword.length > 0 &&
    password !== repeatPassword;

  return (
    <div className={style.field}>
      <label className={style.field__label}>Повторите пароль</label>

      <input
        type="password"
        name="userRepeatPassword"
        placeholder="*********"
        className={style.field__input}
        required
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
        ref={repeatPasswordInputRef}
      />

      {false && (
        <p className={style.form__error}>
          <span>Error: </span>
          <span className={style["form__error--description"]}></span>
        </p>
      )}

      <UserShowRepeatPassword repeatPasswordInputRef={repeatPasswordInputRef} />

      {isPasswordMismatch && <label className={style["field__error--description"]}>
        Пароли не совпадают!
      </label>}
    </div>
  );
}
