import { Dispatch, SetStateAction, useRef } from "react";
import style from "./UserPasswordInput.module.scss";
import SecurityPassword from "../SecurityPassword/SecurityPassword";
import ShowPassword from "../ShowPassword/UserShowPassword/UserShowPassword";

// Определяем интерфейс для пропсов
interface UserPasswordInputProps {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
}

export default function UserPasswordInput({
  password,
  setPassword,
}: UserPasswordInputProps) {
  const passwordInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={style.field}>
      <label className={style.field__label}>Пароль</label>
      <input
        type="password"
        name="userPassword"
        placeholder="*********"
        className={style.field__input}
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        ref={passwordInputRef}
      />

      {false && (
        <p className={style.form__error}>
          <span>Error: </span>
          <span className={style["form__error--description"]}></span>
        </p>
      )}

      <ShowPassword passwordInputRef={passwordInputRef} />

      <SecurityPassword password={password} />
    </div>
  );
}
