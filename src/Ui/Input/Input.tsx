import { type RefObject, useState } from "react";

import style from "./Input.module.scss";

interface InputProps {
  label: string;
  name: string;
  placeholder: string;
  onValidate?: (value: string) => string;
  initialValue?: string;
  type?: string;
  inputRef?: RefObject<HTMLInputElement>;
  disabled?: boolean;
}

const Input = (props: InputProps) => {
  const {
    label,
    type = "text",
    name,
    onValidate,
    initialValue = "",
    placeholder,
    inputRef,
    disabled = false,
  } = props;

  const [value, setValue] = useState(initialValue);
  const [validateError, setValidateError] = useState("");

  return (
    <div className={style.field}>
      <label className={style.field_label}>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`${style.field_input} ${
          disabled && style.field_input__disabled
        }`}
        required
        disabled={disabled}
        ref={inputRef}
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
      {validateError && <p className={style.field_error}>{validateError}</p>}
    </div>
  );
};

export default Input;
