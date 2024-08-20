import { Form, redirect, useNavigate } from "react-router-dom";

import authStore from "../../../stores/Auth/authStore";
import loginStore from "../../../stores/Auth/loginStore";
import style from "./Register.module.scss";

import Loader from "../../../Ui/Loader/Loader";
import Button from "../../../Ui/Button/Button";
import Input from "../../../Ui/Input/Input";

import Passwords from "./Passwords/Passwords";

export default function Register() {
  const navigate = useNavigate();

  if (authStore.isLoading) return <Loader />;

  return (
    <div className={style.register}>
      <div className={style.infoSection}>
        <h2 className={style.infoSection__title}>Регистрация</h2>
        <p className={style.infoSection__description}>Создайте новый аккаунт</p>
      </div>

      <Form method="POST" className={style.form}>
        <div className={style.container}>
          <Input label="Имя" name="userName" placeholder="Иван" type="name" />
          <Input
            label="Фамилия"
            name="surName"
            placeholder="Иванов"
            type="name"
          />
          <Input
            label="email"
            name="email"
            placeholder="your_email@yandex.ru"
            type="email"
            onValidate={loginStore.handleValidateEmailField}
          />

          <Passwords />

          <Input
            label="Название автошколы"
            name="department"
            placeholder="Форсаж"
          />
        </div>

        <div className={style.actions}>
          <Button
            type="submit"
            text="Зарегестрироваться"
            onClick={() => redirect("/menu")}
          />

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
