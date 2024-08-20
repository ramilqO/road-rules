import { useRef } from "react";
import { Form, redirect, useNavigate } from "react-router-dom";

import style from "./Login.module.scss";

import Button from "../../../Ui/Button/Button";
import Checkbox from "../../../Ui/Checkbox/Checkbox";
import Input from "../../../Ui/Input/Input";

export default function Login() {
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

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
          <div className={style.wrapper}>
            <Input
              label="Пароль"
              name="userPassword"
              placeholder="*********"
              inputRef={passwordInputRef}
            />
            <Checkbox
              defaultChecked
              label="Показать пароль"
              onToggle={handleChangeVisibility}
            />
          </div>
        </div>

        <div className={style.actions}>
          {/* Хочу поделится знаниями между вами. Когда у меня был onClick() у меня при отправке формы
           у меня выводилось вот такое предупреждение и не выводились данные в loginAction --> 
           ⚠ Form submission canceled because the form is not connected. Я полез в интернет искать, и оказалось, что onClick на 
           элементе button всегда выполняется первым чем метод "submit" на кнопке. Но я потом убрал onClick и всё начало работать
           , НО :) У нас в onClick было действие перенаправление navigate(/menu) и оно по идее должно было перенаправлять,
           но дурной метод navigate именно перенаправляет, из-за этого метода у меня перенаправлялось без проверки success form или нет
           в этом случае надо использовать redirect(/menu), потому что этот метод перенаправляет только тогда, когда
           выполнилось что-то. Короче, когда надо перенаправить с условием выполнения то redirect, когда просто перенаправить
           то navigate */}

          <Button
            type="submit"
            text="Войти"
            onClick={() => redirect("/menu")}
          />

          <Button
            buttonStyle="link"
            text="Зарегистрироваться"
            onClick={() => navigate("/register")}
          />
        </div>
      </Form>
    </div>
  );
}
