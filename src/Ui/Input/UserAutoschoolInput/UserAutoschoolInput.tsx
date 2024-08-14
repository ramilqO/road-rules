import { useState } from "react";
import style from "./UserAutoschoolInput.module.scss";

export default function UserAutoschoolInput() {
  const [nameAutoschool, setNameAutoSchool] = useState<string>("");

  return (
    <div className={style.field}>
      <label className={style.field__label}>Название автошколы</label>

      <input
        type="text"
        value={nameAutoschool}
        onChange={(e) => setNameAutoSchool(e.target.value)}
        name="userNameAutoschool"
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
  );
}
