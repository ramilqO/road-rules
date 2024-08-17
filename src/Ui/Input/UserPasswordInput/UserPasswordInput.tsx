import { useRef } from 'react';

import Input from '../Input';

interface UserPasswordInputProps {
  password: string;
  setPassword: (value: string) => void;
  onValidate?: () => void;
}

export default function UserPasswordInput({
  password,
  setPassword,
  onValidate,
}: UserPasswordInputProps) {
  const passwordInputRef = useRef<HTMLInputElement>(null);

  /**
   * TODO:
   * Ты сделал целый отдельный компонент что бы сделать одну проверку?
   * Сделай обычные инпуты для паролей и отдельно чекбоксы к ним
   */
  function handleChangeVisibility() {
    const input = passwordInputRef.current;
    if (!input) return;

    input.type = input.type === 'password' ? 'text' : 'password';
  }

  return (
    <div>
      <Input
        initialValue={password}
        onValidate={(value: string) => {
          setPassword(value);
          if (onValidate) {
            onValidate();
          }
          return '';
        }}
        label="Пароль"
        name="userPassword"
        placeholder="*********"
        inputRef={passwordInputRef}
        checkBox={{
          label: 'Показать пароль',
          onToggle: handleChangeVisibility,
          //TODO: у тебя значение и так опциональное, если ты его не будешь передавать оно будет false по умолчанию
          defaultChecked: false,
        }}
      />
    </div>
  );
}
