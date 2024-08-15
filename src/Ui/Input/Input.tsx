import type { RefObject } from 'react';
import style from './Input.module.scss';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  errorText?: string;
  inputRef?: RefObject<HTMLInputElement>;
}
export default function Input({
  value,
  onChange,
  label,
  type = 'text',
  name,
  placeholder,
  errorText,
  inputRef,
}: InputProps) {
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
        onChange={(e) => onChange(e.target.value)}
      />
      {/* TODO: стили для ошибки написать */}
      {errorText && <p className={style.form__error}>{errorText}</p>}
    </div>
  );
}
