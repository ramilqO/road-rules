import { useState } from 'react';
import { Form, Link } from 'react-router-dom';

import style from './Register.module.scss';

import Button from '../../../Ui/Button/Button';
import Input from '../../../Ui/Input/Input';
import UserPasswordInput from '../../../Ui/Input/UserPasswordInput/UserPasswordInput';
import UserRepeatPasswordInput from '../../../Ui/Input/UserRepeatPasswordInput/UserRepeatPasswordInput';

export default function Register() {
  //TODO: это состояние здесь не нужно, сверку двух паролей я сделаю сам чуть позже после того как ты испровишь это
  const [password, setPassword] = useState('');

  //TODO: вместо состояния, функция принимает значение из инпута
  function handleCheckedSecurityPassword(password) {
    const isStep1Complete = password.length >= 8;
    if (!isStep1Complete) {
      //TODO: вот так это должно работать, функция принимает пароль а возвращает строку с ошибкой
      return 'Длина пароля должна быть не менее 8 символов';
    }
    const isStep2Complete = /[A-Z]/.test(password);
    if (!isStep2Complete) {
      return; //TODO: добавить текст ошибки
    }

    const isStep3Complete = /[0-9]/.test(password);
    if (!isStep3Complete) {
      return; //TODO: добавить текст ошибки
    }

    const isStep4Complete =
      isStep2Complete && /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);
    if (!isStep4Complete) {
      return; //TODO: добавить текст ошибки
    }
    //TODO: если ошибки нет, то возвращает пустую строку
    return '';
  }

  return (
    <div className={style.register}>
      <div className={style.infoSection}>
        <h2 className={style.infoSection__title}>Регистрация</h2>
        <p className={style.infoSection__description}>Создайте новый аккаунт</p>
      </div>

      <Form method="POST" className={style.form}>
        <div>
          <Input label="Имя" name="userName" placeholder="Иван" />
          <Input label="Фамилия" name="surName" placeholder="Иванов" />
          <Input
            label="email"
            type="email"
            name="email"
            placeholder="your_email@yandex.ru"
          />

          {/* TODO: используй 2 отдельных компонента инпут и чекбокс по отдельности */}
          <UserPasswordInput
            password={password}
            setPassword={setPassword}
            onValidate={handleCheckedSecurityPassword}
          />
          {/* TODO: здесь тоже сделай проще используй 2 отдельных компонента инпут и чекбокс по отдельности */}
          <UserRepeatPasswordInput password={password} />

          <Input
            label="Название автошколы"
            name="department"
            placeholder="Форсаж"
          />
        </div>

        <div className={style.actions}>
          <Button type="submit" text="Зарегестрироваться" />

          <Link to="/login" className={style.actions__link}>
            Уже есть аккаунт?
          </Link>
        </div>
      </Form>
    </div>
  );
}
