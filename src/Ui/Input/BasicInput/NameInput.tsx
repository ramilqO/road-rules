import { ChangeEventHandler } from "react";

interface INameInput {
  type?: string;
  name: string;
  className?: string;
  placeholder: string;
  required?: boolean;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function NameInput({
  type = "name",
  name,
  className = 'style.field__input',
  placeholder,
  required = true,
  value,
  onChange,
}: INameInput) {
  return (
    <input
      type={type}
      name={name}
      className={className}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={onChange}
    />
  );
}
