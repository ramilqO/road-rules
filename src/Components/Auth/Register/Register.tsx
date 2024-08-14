import { Form } from "react-router-dom";
import { useState } from "react";

import style from "./Register.module.scss";

import Button from "../../../Ui/Button/Button";

import NameInput from "../../../Ui/Input/UserFullNameInput/UserNameInput/NameInput";
import SurnameInput from "../../../Ui/Input/UserFullNameInput/UserSurnameInput/SurnameInput";

import EmailInput from "../../../Ui/Input/UserEmailInput/EmailInput";

import UserPasswordInput from "../../../Ui/Input/UserPasswordInput/UserPasswordInput/UserPasswordInput";
import UserRepeatPasswordInput from "../../../Ui/Input/UserPasswordInput/UserRepeatPasswordInput/UserRepeatPasswordInput";
import UserAutoschoolInput from "../../../Ui/Input/UserAutoschoolInput/UserAutoschoolInput";

export default function Register() {
  const [password, setPassword] = useState<string>("");

  return (
    <div className={style.register}>
      <div className={style.infoSection}>
        <h2 className={style.infoSection__title}>Регистрация</h2>
        <p className={style.infoSection__description}>Создайте новый аккаунт</p>
      </div>

      <Form method="POST" className={style.form}>
        <div>
          <NameInput />
          <SurnameInput />

          <EmailInput />

          <UserPasswordInput password={password} setPassword={setPassword} />
          <UserRepeatPasswordInput password={password} />

          <UserAutoschoolInput />
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
