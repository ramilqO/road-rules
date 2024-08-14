import { ChangeEventHandler } from "react";

interface IEmailInput {
  type?: string;
  name?: string;
  className?: string;
  placeholder: string;
  required?: boolean;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function EmailInput({
  type = "email",
  name = "email",
  className,
  placeholder,
  required = true,
  value,
  onChange,
}: IEmailInput) {
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
