import { type RefObject, useState } from "react";

import style from "./Input.module.scss";

interface InputProps {
  label: string;
  name: string;
  placeholder: string;
  // Делает проверку данных на правильность, принимает значение инпута, а возращает строку с ошибой!
  onValidate?: (value: string) => string;
  initialValue?: string;
  type?: string;
  inputRef?: RefObject<HTMLInputElement>;
  disabled?: boolean;
}

export default function Input({
  label,
  type = "text",
  name,
  onValidate,
  initialValue = "",
  placeholder,
  inputRef,
  disabled = false,
}: InputProps) {
  const [value, setValue] = useState(initialValue);
  const [validateError, setValidateError] = useState("");

  return (
    <div className={style.field}>
      <label className={style.field__label}>{label}</label>
      <input
        ref={inputRef}
        type={type}
        name={name}
        className={`${style.field__input} ${
          disabled && style["field__input--disabled"]
        }`}
        placeholder={placeholder}
        required
        disabled={disabled}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (onValidate) {
            const value = e.target.value;
            const error = onValidate(value.trim());
            setValidateError(error);
          }
        }}
      />
      {validateError && <p className={style.field__error}>{validateError}</p>}
    </div>
  );
}
