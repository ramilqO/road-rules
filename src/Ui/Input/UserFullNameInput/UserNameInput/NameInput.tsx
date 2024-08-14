import { useState } from "react";

import style from "./NameInput.module.scss";

export default function NameInput() {
  const [userName, setUserName] = useState<string>("");

  return (
    <div className={style.field}>
      <label className={style.field__label}>Имя</label>
      <input
        type="name"
        name="userName"
        className={style.field__input}
        placeholder="Иван"
        required
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
    </div>
  );
}
