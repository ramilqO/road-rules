import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import authStore from "../../stores/Auth/authStore";

import style from "./Header.module.scss";

import Button from "../../Ui/Button/Button";
import ThemeToggle from "../../tools/ThemeToggle/ThemeToggle";

const Header = observer(() => {
  const navigate = useNavigate();

  return (
    <header className={style.header}>
      <ThemeToggle />

      <nav className={style.navigation}>
        <ul className={style.navigation__auth}>
          <li className={style.navigation__authItem}>
            {!authStore.isAuth ? (
              <Button
                buttonStyle="button"
                text="Логин"
                onClick={() => navigate("/login")}
              />
            ) : (
              <p className={style.navigation__authItemDescription}>
                {authStore.userInfo?.firstName} {authStore.userInfo?.secondName}
              </p>
            )}
          </li>
          <li className={style.navigation__authItem}>
            {!authStore.isAuth ? (
              <Button
                text="Регистрация"
                onClick={() => navigate("/register")}
              />
            ) : (
              <Button onClick={() => authStore.logout()} text="Выйти" />
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
});

export default Header;
