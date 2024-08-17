import { Form, Link } from 'react-router-dom';

import style from './Register.module.scss';

import Button from '../../../Ui/Button/Button';
import Input from '../../../Ui/Input/Input';

import Passwords from './Passwords';

export default function Register() {
  return (
    <div className={style.register}>
      <div className={style.infoSection}>
        <h2 className={style.infoSection__title}>Регистрация</h2>
        <p className={style.infoSection__description}>Создайте новый аккаунт</p>
      </div>

      <Form method="POST" className={style.form}>
        {/* TODO: ширина инпутов была сломана из-за того что у этого дива не было 100 процентов, вынеси это теперь в класс что бы стили не были прописаны инлайном */}
        <div style={{ width: '100%' }}>
          <Input label="Имя" name="userName" placeholder="Иван" />
          <Input label="Фамилия" name="surName" placeholder="Иванов" />
          <Input
            label="email"
            type="email"
            name="email"
            placeholder="your_email@yandex.ru"
          />

          <Passwords />

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
