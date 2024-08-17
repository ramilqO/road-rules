import { useRef } from 'react';
import type { RefObject } from 'react';

import Checkbox from '../../../Ui/Checkbox/Checkbox';
import Input from '../../../Ui/Input/Input';

export default function Passwords() {
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const repeatPasswordInputRef = useRef<HTMLInputElement>(null);

  let password = '';
  let repeatPassword = '';

  function checkValidation(value: string): string {
    const isStep1Complete = value.length >= 8;
    if (!isStep1Complete) {
      return 'Длина пароля должна быть не менее 8 символов';
    }
    const isStep2Complete = /[A-Z]/.test(value);
    if (!isStep2Complete) {
      return 'Пароль должен содержать в себе заглавную букву';
    }

    const isStep3Complete = /[0-9]/.test(value);
    if (!isStep3Complete) {
      return 'Пароль должен содержать в себе цифру';
    }

    const isStep4Complete =
      isStep2Complete && /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value);
    if (!isStep4Complete) {
      return 'Пароль должен содержать в себе символ';
    }

    return validatePasswordMatch();
  }

  function validatePasswordMatch() {
    if (!password || !repeatPassword) {
      return '';
    }
    return password === repeatPassword ? '' : 'Пароли не совпадают!';
  }

  function handleChangeVisibility(ref: RefObject<HTMLInputElement>) {
    const input = ref.current;
    if (!input) return;

    input.type = input.type === 'password' ? 'text' : 'password';
  }

  return (
    <>
      <div style={{ marginBottom: '24px' }}>
        <Input
          onValidate={(value) => {
            password = value;
            return checkValidation(value);
          }}
          label="Пароль"
          name="userPassword"
          placeholder="*********"
          inputRef={passwordInputRef}
        />

        <Checkbox
          defaultChecked
          label="Показать пароль"
          onToggle={() => handleChangeVisibility(passwordInputRef)}
        />
      </div>
      <div style={{ marginBottom: '24px' }}>
        <Input
          onValidate={(value) => {
            repeatPassword = value;
            return checkValidation(value);
          }}
          label="Повторите пароль"
          name="repeatUserPassword"
          placeholder="*********"
          inputRef={repeatPasswordInputRef}
        />

        <Checkbox
          defaultChecked
          label="Показать пароль"
          onToggle={() => handleChangeVisibility(repeatPasswordInputRef)}
        />
      </div>
    </>
  );
}
