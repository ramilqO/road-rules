import { useRef } from "react";

import Input from "../Input";
import Checkbox from "../../Checkbox/Checkbox";

interface UserPasswordInputProps {
  password?: string;
  setPassword?: (value: string) => void;
  onValidate?: (value: string) => string;
}

export default function UserPasswordInput({
  password,
  setPassword,
  onValidate,
}: UserPasswordInputProps) {
  const passwordInputRef = useRef<HTMLInputElement>(null);

  function handleChangeVisibility() {
    const input = passwordInputRef.current;
    if (!input) return;

    input.type = input.type === "password" ? "text" : "password";
  }

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <Input
          initialValue={password}
          onValidate={(value: string) => {
            if (setPassword) {
              setPassword(value)
            }
            if (onValidate) {
              return onValidate(value);
            }
            return "";
          }}
          label="Пароль"
          name="userPassword"
          placeholder="*********"
          inputRef={passwordInputRef}
        />

        <Checkbox label="Показать пароль" onToggle={handleChangeVisibility} />
      </div>
    </div>
  );
}
