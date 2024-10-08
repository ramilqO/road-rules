import { observer } from "mobx-react-lite";
import { useRef } from "react";
import type { RefObject } from "react";

import registerStore from "@/stores/Auth/registerStore";
import style from "./Passwords.module.scss";

import Checkbox from "@/Ui/Checkbox/Checkbox";
import Input from "@/Ui/Input/Input";

import SecurityPassword from "@/Ui/SecurityPassword/SecurityPassword";

const Passwords = observer(() => {
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const repeatPasswordInputRef = useRef<HTMLInputElement>(null);

  const handleChangeVisibility = (ref: RefObject<HTMLInputElement>) => {
    const input = ref.current;
    if (!input) return;

    input.type = input.type === "password" ? "text" : "password";
  }

  return (
    <>
      <div className={style.wrapper}>
        <Input
          onValidate={(value) => {
            return registerStore.validatePasswordField(value.trim());
          }}
          label="Пароль"
          name="userPassword"
          placeholder="*********"
          inputRef={passwordInputRef}
        />

        <SecurityPassword />

        <Checkbox
          defaultChecked
          label="Показать пароль"
          onToggle={() => handleChangeVisibility(passwordInputRef)}
        />
      </div>
      <div className={style.wrapper}>
        <Input
          onValidate={(value) => {
            return registerStore.validateRepeatPassword(value.trim());
          }}
          label="Повторите пароль"
          name="repeatUserPassword"
          placeholder="*********"
          inputRef={repeatPasswordInputRef}
          disabled={!registerStore.passwordFieldIsSuccess}
        />

        <Checkbox
          defaultChecked
          label="Показать пароль"
          onToggle={() => handleChangeVisibility(repeatPasswordInputRef)}
        />
      </div>
    </>
  );
});

export default Passwords;
