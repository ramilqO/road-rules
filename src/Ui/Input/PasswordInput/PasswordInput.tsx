import { ChangeEventHandler, useRef, forwardRef } from "react";
import style from "./PasswordInput.module.scss";

interface IPasswordInputProps {
  type?: "password";
  name?: string;
  placeholder?: string;
  className: string;
  classNamePasswordIdentity?: string;
  required?: boolean;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  showPassword?: boolean;
  showPasswordIdentityCheck?: boolean;
  password: string;
  repeatPassword?: string;
}

const PasswordInput = forwardRef<HTMLInputElement, IPasswordInputProps>(
  (
    {
      type = "password",
      name = "password",
      placeholder = "*********",
      className = "",
      classNamePasswordIdentity = "",
      required = true,
      value,
      onChange,
      showPassword = true,
      showPasswordIdentityCheck = false,
      password = "",
      repeatPassword = "",
    },
    ref
  ) => {
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const repeatPasswordInputRef = useRef<HTMLInputElement>(null);

    const handleChangeVisibilityPassword = () => {
      if (passwordInputRef.current) {
        passwordInputRef.current.type =
          passwordInputRef.current.type === "password" ? "text" : "password";
      }
    };

    const handleChangeVisibilityRepeatPassword = () => {
      if (repeatPasswordInputRef.current) {
        repeatPasswordInputRef.current.type =
          repeatPasswordInputRef.current.type === "password"
            ? "text"
            : "password";
      }
    };

    const isPasswordMismatch =
      password.length > 0 &&
      repeatPassword.length > 0 &&
      password !== repeatPassword;

    return (
      <>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className={className}
          required={required}
          ref={type === "password" ? passwordInputRef : repeatPasswordInputRef}
          value={value}
          onChange={onChange}
        />

        {showPasswordIdentityCheck && isPasswordMismatch && (
          <label className={classNamePasswordIdentity}>
            Пароли не совпадают!
          </label>
        )}

        {showPassword && (
          <div className={style.visibilityPasswordContainer}>
            <input
              type="checkbox"
              onChange={
                type === "password"
                  ? handleChangeVisibilityPassword
                  : handleChangeVisibilityRepeatPassword
              }
              className={style.visibilityPasswordContainer__inputCheckBox}
            />
            <label className={style.visibilityPasswordContainer__label}>
              Показать пароль
            </label>
          </div>
        )}
      </>
    );
  }
);

export default PasswordInput;
