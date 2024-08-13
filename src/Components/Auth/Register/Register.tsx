import { Form, Link, redirect } from "react-router-dom";

import style from "./Register.module.scss";
import { useRef, useState } from "react";

export default function Register() {
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [nameAutoschool, setNameAutoSchool] = useState<string>("");

  const passwordInputRef = useRef(null);
  const repeatPasswordInputRef = useRef(null);

  const isStep1Complete = password.length >= 8; // Если длина пароля больше 8
  const isStep2Complete =
    isStep1Complete && /[A-Z]/.test(password) && /[0-9]/.test(password); // Если длина пароля > 8 + есть заглавная буква
  const isStep3Complete =
    isStep2Complete && /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password); // Если длина > 8 + заглавная буква + Symbol

  function handleChangeVisibilityPassword() {
    if (passwordInputRef.current) {
      const input = passwordInputRef.current as HTMLInputElement;
      if (input.type === "password") {
        input.type = "text";
      } else {
        input.type = "password";
      }
    }
  }

  function handleChangeVisibilityRepeatPassword() {
    if (repeatPasswordInputRef.current) {
      const input = repeatPasswordInputRef.current as HTMLInputElement;
      if (input.type === "password") {
        input.type = "text";
      } else {
        input.type = "password";
      }
    }
  }

  return (
    <div className={style.register}>
      <div className={style.infoSection}>
        <h2 className={style.infoSection__title}>Регистрация</h2>
        <p className={style.infoSection__description}>Создайте новый аккаунт</p>
      </div>

      <Form method="POST" className={style.form}>
        <div>
          {/* Name */}
          <div className={style.field}>
            <label className={style.field__label}>Имя</label>
            <input
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="userName"
              placeholder="Иван"
              required
              className={style.field__input}
            />
          </div>
          {/* Surname */}
          <div className={style.field}>
            <label className={style.field__label}>Фамилия</label>
            <input
              type="name"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              name="userSurname"
              placeholder="Иванов"
              required
              className={style.field__input}
            />
          </div>
          {/* Email */}
          <div className={style.field}>
            <label className={style.field__label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              placeholder="your_email@yandex.ru"
              required
              className={style.field__input}
            />
          </div>
          {/* Password */}
          <div className={style.field}>
            <label className={style.field__label}>Пароль</label>
            <input
              type="password"
              ref={passwordInputRef}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              placeholder="*********"
              required
              className={style.field__input}
            />

            <div className={style.securityPassword}>
              <div
                className={`${style.securityPassword__field} ${
                  isStep1Complete && style["securityPassword__field--full"]
                }`}
              ></div>
              <div
                className={`${style.securityPassword__field} ${
                  isStep2Complete && style["securityPassword__field--full"]
                }`}
              ></div>
              <div
                className={`${style.securityPassword__field} ${
                  isStep3Complete && style["securityPassword__field--full"]
                }`}
              ></div>
            </div>

            <div className={style.visibilityPasswordContainer}>
              <input
                type="checkbox"
                onClick={handleChangeVisibilityPassword}
                className={style.visibilityPasswordContainer__inputCheckBox}
              />
              <label className={style.visibilityPasswordContainer__label}>
                Показать пароль
              </label>
            </div>

            {false && (
              <p className={style.form__error}>
                <span>Error: </span>
                <span className={style["form__error--description"]}></span>
              </p>
            )}
          </div>
          {/* Repeat Password */}
          <div className={style.field}>
            <label className={style.field__label}>Повторите пароль</label>
            <input
              type="password"
              ref={repeatPasswordInputRef}
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              name="repeatPassword"
              placeholder="*********"
              required
              className={style.field__input}
            />
            {password.length > 0 &&
            repeatPassword.length > 0 &&
            password !== repeatPassword ? (
              <label className={style["field__label--invalid"]}>
                Пароли не совпадают!
              </label>
            ) : null}

            <div className={style.visibilityPasswordContainer}>
              <input
                type="checkbox"
                onClick={handleChangeVisibilityRepeatPassword}
                className={style.visibilityPasswordContainer__inputCheckBox}
              />
              <label className={style.visibilityPasswordContainer__label}>
                Показать пароль
              </label>
            </div>

            {false && (
              <p className={style.form__error}>
                <span>Error: </span>
                <span className={style["form__error--description"]}></span>
              </p>
            )}
          </div>
          {/* Name Autoschool */}
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

        {/* Button */}
        <div className={style.actions}>
          <button type="submit" className={style.actions__button}>
            Зарегестрироваться
          </button>
          <Link to="/login" className={style.actions__link}>
            Уже есть аккаунт?
          </Link>
        </div>
      </Form>
    </div>
  );
}

type FormData = {
  name: string;
  surname: string;
  email: string;
  password: string;
  repeatPassword: string;
  nameAutoschool: string;
};

export async function action({ request }: { request: Request }) {
  const formdata = await request.formData();
  const data = (await Object.fromEntries(formdata)) as {
    [key: string]: FormDataEntryValue;
  };

  const typedData: FormData = {
    name: String(data.name),
    surname: String(data.surname),
    email: String(data.email),
    password: String(data.password),
    repeatPassword: String(data.repeatPassword),
    nameAutoschool: String(data.nameAutoschool),
  };

  console.log(typedData);

  return redirect("/menu");
}
