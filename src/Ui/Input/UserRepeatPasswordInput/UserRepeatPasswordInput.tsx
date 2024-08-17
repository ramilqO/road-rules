import { useRef, useState } from 'react';

import Input from '../Input';

export default function UserRepeatPasswordInput({
  password,
}: {
  password: string;
}) {
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const repeatPasswordInputRef = useRef<HTMLInputElement>(null);

  function handleChangeVisibilityRepeatPassword() {
    const input = repeatPasswordInputRef.current;
    if (!input) return;

    if (input.type === 'password') {
      input.type = 'text';
    } else {
      input.type = 'password';
    }
  }

  const isPasswordMismatch =
    password.length > 0 &&
    repeatPassword.length > 0 &&
    password !== repeatPassword;

  return (
    <div>
      <Input
        label="Повторите пароль"
        type="password"
        name="userRepeatPassword"
        placeholder="*********"
        inputRef={repeatPasswordInputRef}
        checkBox={{
          label: 'Показать пароль',
          onToggle: handleChangeVisibilityRepeatPassword,
          //TODO: у тебя значение и так опциональное, если ты его не будешь передавать оно будет false по умолчанию
          defaultChecked: false,
        }}
      />
      {isPasswordMismatch && <label>Пароли не совпадают!</label>}
    </div>
  );
}
