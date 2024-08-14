import { useState } from "react";

import style from "./SurnameInput.module.scss";

export default function SurnameInput() {
  const [userSurname, setUserSurname] = useState<string>("");

  return (
    <div className={style.field}>
      <label className={style.field__label}>Фамилия</label>
      <input
        type="name"
        name="userSurname"
        value={userSurname}
        onChange={(e) => setUserSurname(e.target.value)}
        placeholder="Иванов"
        className={style.field__input}
        required
      />
    </div>
  );
}
