import { useState } from 'react';
import { Form } from 'react-router-dom';
import Button from '../../../Ui/Button/Button';
import UserPasswordInput from '../../../Ui/Input/UserPasswordInput/UserPasswordInput/UserPasswordInput';
import UserRepeatPasswordInput from '../../../Ui/Input/UserPasswordInput/UserRepeatPasswordInput/UserRepeatPasswordInput';
import Input from '../../Controls/Input/Input';
import style from './Register.module.scss';

export default function Register() {
  const [userName, setUserName] = useState('');
  const [surName, setSurName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={style.register}>
      <div className={style.infoSection}>
        <h2 className={style.infoSection__title}>Регистрация</h2>
        <p className={style.infoSection__description}>Создайте новый аккаунт</p>
      </div>

      <Form method="POST" className={style.form}>
        <div>
          <Input
            value={userName}
            onChange={setUserName}
            label="Имя"
            name="userName"
            placeholder="Иван"
          />
          <Input
            value={surName}
            onChange={setSurName}
            label="Фамилия"
            name="surName"
            placeholder="Иванов"
          />
          <Input
            value={email}
            onChange={setEmail}
            label="email"
            type="email"
            name="email"
            placeholder="your_email@yandex.ru"
          />

          <UserPasswordInput password={password} setPassword={setPassword} />
          <UserRepeatPasswordInput password={password} />

          <Input
            value=""
            onChange={() => {}}
            label="Название автошколы"
            name="department"
            placeholder="Форсаж"
          />
        </div>

        <div className={style.actions}>
          <Button type="submit" className={style.actions__button}>
            Зарегестрироваться
          </Button>
          <Button to="/login" className={style.actions__link}>
            Уже есть аккаунт?
          </Button>
        </div>
      </Form>
    </div>
  );
}
