import style from "../styleComponents/Cap.module.scss";

import MoonIcon from "../../public/svg/cap/Moon01";
import SunIcon from "../../public/svg/cap/Sun01";
//
export default function Cap() {
  return (
    <header className={style.cap}>
      <button className={style.cap__buttonChangeTheme}>
        <SunIcon />
      </button>

      <nav className={style.navigation}>
        <ul className={style.navigation__auth}>
          <li className={style.navigation__authItem}>
            <button
              className={`${style.navigation__authItemButton} ${style["navigation__authItemButton--login"]}`} // когда пользователь авторизован будет добавлятся вот этот класс --- ${style["navigation__authItemButtonLogin--authorized"]}
            >
              Логин
            </button>
          </li>
          <li className={style.navigation__authItem}>
            <button
              className={`${style.navigation__authItemButton} ${style["navigation__authItemButton--register"]}`}
            >
              Регистрация
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
