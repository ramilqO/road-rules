import { Form, useNavigate } from "react-router-dom";

import style from "./Register.module.scss";

import Button from "../../../Ui/Button/Button";
import Input from "../../../Ui/Input/Input";

import Passwords from "./Passwords";

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className={style.register}>
      <div className={style.infoSection}>
        <h2 className={style.infoSection__title}>Регистрация</h2>
        <p className={style.infoSection__description}>Создайте новый аккаунт</p>
      </div>

      <Form method="POST" className={style.form}>
        <div className={style.container}>
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

          <Button
            buttonStyle="link"
            text="Уже есть аккаунт?"
            onClick={() => navigate("/login")}
          />
        </div>
      </Form>
    </div>
  );
}
