import style from "./Header.module.scss";

import MoonIcon from "../../../public/svg/header/MoonIcon";
// import SunIcon from "../../public/svg/cap/SunIcon";

export default function Header() {
  return (
    <header className={style.header}>
      <button className={style.header__buttonChangeTheme}>
        <MoonIcon />
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
