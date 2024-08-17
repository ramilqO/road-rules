import { type RefObject, useState } from 'react';
import Checkbox from '../Checkbox/Checkbox';
import style from './Input.module.scss';

interface CheckBoxProps {
  label: string;
  onToggle: () => void;
  defaultChecked: boolean;
}

interface InputProps {
  label: string;
  name: string;
  placeholder: string;
  onValidate?: (value: string) => string;
  initialValue?: string;
  type?: string;
  inputRef?: RefObject<HTMLInputElement>;
  checkBox?: CheckBoxProps;
}

export default function Input({
  label,
  type = 'text',
  name,
  onValidate,
  initialValue = '',
  placeholder,
  inputRef,
  checkBox,
}: InputProps) {
  const [value, setValue] = useState(initialValue);
  //TODO: можно не указывать ип TS и так понимает что тут строка
  const [validateError, setValidateError] = useState<string>('');

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
          if (onValidate) {
            const error = onValidate(e.target.value);
            setValidateError(error);
          }
        }}
      />
      {checkBox && (
        <Checkbox
          label={checkBox.label}
          onToggle={checkBox.onToggle}
          defaultChecked={checkBox.defaultChecked}
        />
      )}
      {validateError && <p className={style.field__error}>{validateError}</p>}
    </div>
  );
}
