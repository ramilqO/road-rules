import { useState } from 'react';
import { Form, Link, redirect } from 'react-router-dom';

import style from './Login.module.scss';

import Input from '../../../Ui/Input/Input';
import Button from '../../../Ui/Button/Button';
import UserPasswordInput from '../../../Ui/Input/UserPasswordInput/UserPasswordInput';

export default function Login() {
  //TODO: можно не указывать тип, TS и так понимает что тут строка
  const [password, setPassword] = useState<string>('');

  return (
    <div className={style.login}>
      <div className={style.infoSection}>
        <h2 className={style.infoSection__title}>Логин</h2>
        <p className={style.infoSection__description}>Войдите в свой аккаунт</p>
      </div>

      <Form method="POST" className={style.form}>
        <div>
          <Input
            label="Email"
            name="userEmail"
            type="email"
            placeholder="your_email@yandex.ru"
          />
          <UserPasswordInput password={password} setPassword={setPassword} />
        </div>

        <div className={style.actions}>
          <Button
            type="submit"
            text="Войти"
            onClick={() => redirect('/menu')}
          />

          <Link to="/register" className={style.actions__link}>
            Зарегистрироваться
          </Link>
        </div>
      </Form>
    </div>
  );
}
