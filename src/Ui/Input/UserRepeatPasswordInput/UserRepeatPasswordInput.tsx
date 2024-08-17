import { useRef, useState } from 'react';

import style from './UserRepeatPasswordInput.module.scss';

import Checkbox from '../../Checkbox/Checkbox';

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
    <div className={style.field}>
      //TODO: использовать компонент Input
      <label className={style.field__label}>Повторите пароль</label>
      <input
        type="password"
        name="userRepeatPassword"
        placeholder="*********"
        className={style.field__input}
        required
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
        ref={repeatPasswordInputRef}
      />
      //TODO: ошибки уже определяются внутри самого инпта, это здесь не нужно
      {false && (
        <p className={style.form__error}>
          <span>Error: </span>
          <span className={style['form__error--description']}></span>
        </p>
      )}
      <Checkbox
        onToggle={handleChangeVisibilityRepeatPassword}
        defaultChecked={false}
        label="Показать пароль"
      />
      //TODO: сверку паролей я сделаю сам ибо это задачка с двумя звездочками
      {isPasswordMismatch && (
        <label className={style['field__error--description']}>
          Пароли не совпадают!
        </label>
      )}
    </div>
  );
}
