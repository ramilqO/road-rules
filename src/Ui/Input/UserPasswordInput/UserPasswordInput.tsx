import { useRef } from "react";
import Checkbox from "../../Checkbox/Checkbox";
import Input from "../Input";
import style from "./UserPasswordInput.module.scss";

interface UserPasswordInputProps {
  password: string;
  setPassword: (value: string) => void;
  onValidate: () => void;
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
    <div className={style.field}>
      <Input
        initialValue={password}
        onValidate={(value: string) => {
          setPassword(value);
          onValidate();
          return "";
        }}
        label="Пароль"
        name="userPassword"
        placeholder="*********"
        inputRef={passwordInputRef}
      />
      <Checkbox
        label="Показать пароль"
        onToggle={handleChangeVisibility}
        defaultChecked={false}
      />
    </div>
  );
}
