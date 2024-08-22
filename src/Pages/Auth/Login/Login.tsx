import { useRef } from "react";
import { Form, redirect, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import authStore from "../../../stores/Auth/authStore";
import style from "./Login.module.scss";

import Button from "../../../Ui/Button/Button";
import Checkbox from "../../../Ui/Checkbox/Checkbox";
import Input from "../../../Ui/Input/Input";
import Loader from "../../../Ui/Loader/Loader";

const Login = observer(() => {
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const fieldIsSuccess =
    authStore.emailFieldIsSuccess && authStore.passwordFieldIsSuccess;

  const navigate = useNavigate();

  function handleChangeVisibility() {
    const input = passwordInputRef.current;
    if (!input) return;

    input.type = input.type === "password" ? "text" : "password";
  }

  if (authStore.isLoading) return <Loader />;

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
            onValidate={authStore.validateEmailField}
          />
          <div className={style.wrapper}>
            <Input
              label="Пароль"
              name="userPassword"
              placeholder="*********"
              inputRef={passwordInputRef}
              onValidate={authStore.validatePasswordFiled}
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
            disabled={!fieldIsSuccess}
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
});

export default Login;
