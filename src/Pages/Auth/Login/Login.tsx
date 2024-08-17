import { Form, Link, redirect } from "react-router-dom";
import { useRef } from "react";

import style from "./Login.module.scss";

import Input from "../../../Ui/Input/Input";
import Checkbox from "../../../Ui/Checkbox/Checkbox";
import Button from "../../../Ui/Button/Button";

export default function Login() {
  const passwordInputRef = useRef<HTMLInputElement>(null);

  function handleChangeVisibility() {
    const input = passwordInputRef.current;
    if (!input) return;

    input.type = input.type === "password" ? "text" : "password";
  }

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
          <Input
            label="Пароль"
            name="userPassword"
            type="password"
            placeholder="*********"
            inputRef={passwordInputRef}
          />

          <Checkbox
            label="Показать пароль"
            onToggle={handleChangeVisibility}
            defaultChecked={false}
          />
        </div>

        <div className={style.actions}>
          <Button type="submit" text="Войти" onClick={() => redirect("/menu")} />
          <Link to="/register" className={style.actions__link}>
            Зарегистрироваться
          </Link>
        </div>
      </Form>
    </div>
  );
}
