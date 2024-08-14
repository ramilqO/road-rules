import { useState } from "react";

import style from "./EmailInput.module.scss";

export default function EmailInput() {
  const [email, setEmail] = useState<string>("");

  return (
    <div className={style.field}>
      <label className={style.field__label}>Email</label>
      <input
        type="email"
        name="userEmail"
        placeholder="your_email@yandex.ru"
        className={style.field__input}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>
  );
}
