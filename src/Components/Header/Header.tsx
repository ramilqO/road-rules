import style from "./Header.module.scss";

import MoonIcon from "../../../public/svg/header/MoonIcon";
import { Link } from "react-router-dom";
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
            <Link
              to="/login"
              className={`${style.navigation__authItemButton} ${style["navigation__authItemButton--login"]}`}
            >
              Логин
            </Link>
          </li>
          <li className={style.navigation__authItem}>
            <Link
              to="/register"
              className={`${style.navigation__authItemButton} ${style["navigation__authItemButton--register"]}`}
            >
              Регистрация
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
