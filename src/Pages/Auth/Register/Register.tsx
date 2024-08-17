import { useState } from "react";
import { Form, Link } from "react-router-dom";

import style from "./Register.module.scss";

import Button from "../../../Ui/Button/Button";
import UserPasswordInput from "../../../Ui/Input/UserPasswordInput/UserPasswordInput";
import UserRepeatPasswordInput from "../../../Ui/Input/UserRepeatPasswordInput/UserRepeatPasswordInput";
import Input from "../../../Ui/Input/Input";

export default function Register() {
  const [password, setPassword] = useState("");

  function handleCheckedSecurityPassword() {
    const isStep1Complete = password.length >= 8;
    if (!isStep1Complete) {
      return;
    }
    const isStep2Complete = /[A-Z]/.test(password);
    if (!isStep2Complete) {
      return;
    }

    const isStep3Complete = /[0-9]/.test(password);
    if (!isStep3Complete) {
      return;
    }

    const isStep4Complete =
      isStep2Complete && /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);
    if (!isStep4Complete) {
      return;
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
          <Input label="Имя" name="userName" placeholder="Иван" />
          <Input label="Фамилия" name="surName" placeholder="Иванов" />
          <Input
            label="email"
            type="email"
            name="email"
            placeholder="your_email@yandex.ru"
          />

          <UserPasswordInput
            password={password}
            setPassword={setPassword}
            onValidate={handleCheckedSecurityPassword}
          />
          <UserRepeatPasswordInput password={password} />

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
