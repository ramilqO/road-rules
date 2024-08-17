import { Form, Link } from "react-router-dom";

import style from "./Register.module.scss";

import Button from "../../../Ui/Button/Button";
import Input from "../../../Ui/Input/Input";
import UserPasswordInput from "../../../Ui/Input/UserPasswordInput/UserPasswordInput";
import UserRepeatPasswordInput from "../../../Ui/Input/UserRepeatPasswordInput/UserRepeatPasswordInput";

export default function Register() {
  function handleCheckedSecurityPassword(value: string): string {
    const isStep1Complete = value.length >= 8;
    if (!isStep1Complete) {
      return "Длина пароля должна быть не менее 8 символов";
    }
    const isStep2Complete = /[A-Z]/.test(value);
    if (!isStep2Complete) {
      return "Пароль должен содержать в себе заглавную букву";
    }

    const isStep3Complete = /[0-9]/.test(value);
    if (!isStep3Complete) {
      return "Пароль должен содержать в себе цифру";
    }

    const isStep4Complete =
      isStep2Complete && /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value);
    if (!isStep4Complete) {
      return "Пароль должен содержать в себе символ";
    }
    return "";
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

          <UserPasswordInput onValidate={handleCheckedSecurityPassword} />
          <UserRepeatPasswordInput />

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
