import { Form, Link, redirect } from "react-router-dom";
import style from "./Login.module.scss";
import { useRef, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const passwordInputRef = useRef(null);

  function handleChangeVisibility() {
    if (passwordInputRef.current) {
      const input = passwordInputRef.current as HTMLInputElement;
      if (input.type === "password") {
        input.type = "text";
      } else {
        input.type = "password";
      }
    }
  }

  return (
    <div className={style.login}>
      <div className={style.infoSection}>
        <h2 className={style.infoSection__title}>Логин</h2>
        <p className={style.infoSection__description}>Войдите в свой аккаунт</p>
      </div>

      <Form method="POST" className={style.form}>
        <div>
          {/* Email */}
          <div className={`${style.field}`}>
            <label htmlFor="email" className={`${style.field__label}`}>
              Email
            </label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              placeholder="your_email@yandex.ru"
              className={`${style.field__input}`}
            />
          </div>

          {/* Password */}
          <div className={`${style.field}`}>
            <label htmlFor="password" className={`${style.field__label}`}>
              Пароль
            </label>
            <input
              id="password"
              ref={passwordInputRef}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              placeholder="*********"
              className={`${style.field__input}`}
            />
            <div className={style.visibilityPasswordContainer}>
              <input
                type="checkbox"
                onClick={handleChangeVisibility}
                className={style.visibilityPasswordContainer__inputCheckBox}
              />
              <label className={style.visibilityPasswordContainer__label}>
                Показать пароль
              </label>
            </div>
          </div>

          {/* Error --- чтобы его отобразить, надо изменить на "true" */}
          {false && (
            <p className={style.form__error}>
              <span>Error: </span>
              <span className={style["form__error--description"]}>
                Вы неправильно ввели почту или пароль!
              </span>
            </p>
          )}
        </div>

        {/* Button */}
        <div className={style.actions}>
          <button type="submit" className={style.actions__button}>
            Войти
          </button>
          <Link to="/register" className={style.actions__link}>
            Зарегистрироваться
          </Link>
        </div>
      </Form>
    </div>
  );
}

type FormData = {
  email: string;
  password: string;
};

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as {
    [key: string]: FormDataEntryValue;
  };

  // По typedData мы будем делать запрос на БЭК login
  const typedData: FormData = {
    email: String(data.email),
    password: String(data.password),
  };

  console.log(typedData);

  return redirect("/menu");
}
