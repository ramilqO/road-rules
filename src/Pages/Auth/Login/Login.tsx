import { useRef } from "react";
import { Form, redirect } from "react-router-dom";

import useNavigation from "../../../tools/useNavigation";
import style from "./Login.module.scss";

import Button from "../../../Ui/Button/Button";
import Checkbox from "../../../Ui/Checkbox/Checkbox";
import Input from "../../../Ui/Input/Input";

export default function Login() {
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const { goToPath } = useNavigation();
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
          <div style={{ marginBottom: "24px" }}>
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
          <Button
            type="submit"
            text="Войти"
            //TODO: или вот здесь ты ведь просто используешь redirect и все, тебе не нужна эта обертка goToPath
            onClick={() => redirect("/menu")}
          />

          <Button
            buttonStyle="link"
            text="Зарегистрироваться"
            onClick={() => goToPath("/register")}
          />
        </div>
      </Form>
    </div>
  );
}
