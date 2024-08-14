import { Form } from "react-router-dom";
import { useRef, useState } from "react";

import style from "./Register.module.scss";

import SecurityPassword from "../../../Ui/SecurityPassword/SecurityPassword";
import PasswordInput from "../../../Ui/Input/PasswordInput/PasswordInput";
import NameInput from "../../../Ui/Input/BasicInput/NameInput";
import Button from "../../../Ui/Button/Button";
import EmailInput from "../../../Ui/Input/EmailInput/EmailInput";

export default function Register() {
  const [userName, setUserName] = useState<string>("");
  const [userSurname, setUserSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [nameAutoschool, setNameAutoSchool] = useState<string>("");

  const passwordInputRef = useRef<HTMLInputElement>(null);
  const repeatPasswordInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={style.register}>
      <div className={style.infoSection}>
        <h2 className={style.infoSection__title}>Регистрация</h2>
        <p className={style.infoSection__description}>Создайте новый аккаунт</p>
      </div>

      <Form method="POST" className={style.form}>
        <div>
          <div className={style.field}>
            <label className={style.field__label}>Имя</label>
            <NameInput
              value={userName}
              className={style.field__input}
              onChange={(e) => setUserName(e.target.value)}
              name="userName"
              placeholder="Иван"
              required
            />
          </div>
          <div className={style.field}>
            <label className={style.field__label}>Фамилия</label>
            <NameInput
              value={userSurname}
              className={style.field__input}
              onChange={(e) => setUserSurname(e.target.value)}
              name="userSurname"
              placeholder="Иванов"
            />
          </div>
          <div className={style.field}>
            <label className={style.field__label}>Email</label>
            <EmailInput
              value={email}
              className={style.field__input}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your_email@yandex.ru"
            />
          </div>
          <div className={style.field}>
            <label className={style.field__label}>Пароль</label>
            <PasswordInput
              ref={passwordInputRef}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={style.field__input}
              password={password}
            />

            <SecurityPassword password={password} />

            {false && (
              <p className={style.form__error}>
                <span>Error: </span>
                <span className={style["form__error--description"]}></span>
              </p>
            )}
          </div>
          <div className={style.field}>
            <label className={style.field__label}>Повторите пароль</label>
            <PasswordInput
              name={"repeatPassword"}
              ref={repeatPasswordInputRef}
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className={style.field__input}
              classNamePasswordIdentity={style["field__label--invalid"]}
              password={password}
              repeatPassword={repeatPassword}
              showPasswordIdentityCheck={true}
            />
            {false && (
              <p className={style.form__error}>
                <span>Error: </span>
                <span className={style["form__error--description"]}></span>
              </p>
            )}
          </div>
          <div className={style.field}>
            <label className={style.field__label}>Название автошколы</label>
            <input
              type="text"
              value={nameAutoschool}
              onChange={(e) => setNameAutoSchool(e.target.value)}
              name="nameAutoschool"
              placeholder="Драйв"
              required
              className={style.field__input}
            />

            {false && (
              <p className={style.form__error}>
                <span>Error: </span>
                <span className={style["form__error--description"]}></span>
              </p>
            )}
          </div>
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
