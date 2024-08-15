import { type RefObject, useState } from "react";
import style from "./Input.module.scss";

interface InputProps {
  label: string;
  name: string;
  placeholder: string;
  /** Валидирует данные, принимает значение из инпута, возвращает строку с ошибкой */
  onValidate?: (value: string) => string;
  initialValue?: string;
  type?: string;
  inputRef?: RefObject<HTMLInputElement>;
}
export default function Input({
  label,
  type = "text",
  name,
  onValidate,
  initialValue = "",
  placeholder,
  inputRef,
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
        className={style.field__input}
        placeholder={placeholder}
        required
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onValidate && setValidateError(onValidate(e.target.value));
        }}
      />
      {/* TODO: стили для ошибки написать */}
      {validateError && <p className={style.form__error}>{validateError}</p>}
    </div>
  );
}
