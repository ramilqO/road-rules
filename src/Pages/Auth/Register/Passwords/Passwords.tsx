import { useRef } from "react";
import type { RefObject } from "react";

import style from "./Passwords.module.scss";

import Checkbox from "../../../../Ui/Checkbox/Checkbox";
import Input from "../../../../Ui/Input/Input";
import authStore from "../../../../stores/Auth/authStore";
import registerStore from "../../../../stores/Auth/registerStore";

export default function Passwords() {
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const repeatPasswordInputRef = useRef<HTMLInputElement>(null);

  function securityPassword(value: string): string {
    const isStep1Complete = value.length >= 8;
    if (!isStep1Complete) {
      return "Не обязательно! длина пароля должна быть не менее 8 символов";
    }
    const isStep2Complete = /[A-Z]/.test(value);
    if (!isStep2Complete) {
      return "Не обязательно! Пароль должен содержать в себе заглавную букву";
    }

    const isStep3Complete = /[0-9]/.test(value);
    if (!isStep3Complete) {
      return "Не обязательно! Пароль должен содержать в себе цифру";
    }

    const isStep4Complete =
      isStep2Complete && /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value);
    if (!isStep4Complete) {
      return "Не обязательно! Пароль должен содержать в себе символ";
    }

    return "";
  }

  function handleChangeVisibility(ref: RefObject<HTMLInputElement>) {
    const input = ref.current;
    if (!input) return;

    input.type = input.type === "password" ? "text" : "password";
  }

  return (
    <>
      <div className={style.wrapper}>
        <Input
          onValidate={(value) => {
            if (!authStore.passwordFieldIsSuccess)
              return authStore.validatePasswordFiled(value.trim());
            return securityPassword(value.trim());
          }}
          label="Пароль"
          name="userPassword"
          placeholder="*********"
          inputRef={passwordInputRef}
        />

        <Checkbox
          defaultChecked
          label="Показать пароль"
          onToggle={() => handleChangeVisibility(passwordInputRef)}
        />
      </div>
      <div className={style.wrapper}>
        <Input
          onValidate={(value) => {
            return registerStore.validateUserRepeatPassword(value.trim());
          }}
          label="Повторите пароль"
          name="repeatUserPassword"
          placeholder="*********"
          inputRef={repeatPasswordInputRef}
        />

        <Checkbox
          defaultChecked
          label="Показать пароль"
          onToggle={() => handleChangeVisibility(repeatPasswordInputRef)}
        />
      </div>
    </>
  );
}
