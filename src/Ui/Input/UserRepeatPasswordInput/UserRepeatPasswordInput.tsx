import { useRef, useState } from "react";

import Input from "../Input";
import Checkbox from "../../Checkbox/Checkbox";

export default function UserRepeatPasswordInput({
  password = "",
}: {
  password?: string;
}) {
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const repeatPasswordInputRef = useRef<HTMLInputElement>(null);

  function handleChangeVisibilityRepeatPassword() {
    const input = repeatPasswordInputRef.current;
    if (!input) return;

    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  }

  const isPasswordMismatch =
    password.length > 0 &&
    repeatPassword.length > 0 &&
    password !== repeatPassword;

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <Input
          label="Повторите пароль"
          type="password"
          name="userRepeatPassword"
          placeholder="*********"
          inputRef={repeatPasswordInputRef}
        />
        <Checkbox
          label="Показать пароль"
          onToggle={handleChangeVisibilityRepeatPassword}
        />
      </div>
      {isPasswordMismatch && <label>Пароли не совпадают!</label>}
    </div>
  );
}
