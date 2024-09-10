import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import authStore from "@/stores/Auth/authStore";
import style from "./Header.module.scss";
import Button from "@/Ui/Button/Button";
import ThemeToggle from "@/tools/ThemeToggle/ThemeToggle";

const Header = observer(() => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navigate = useNavigate();

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastScrollY]);

  return (
    <header
      className={`${style.header} ${
        isVisible ? style.header__visible : style.header__hidden
      }`}
    >
      <ThemeToggle />
      <nav className={style.navigation}>
        <ul className={style.navigation_auth}>
          <li>
            {!authStore.isAuth ? (
              <Button
                buttonStyle="button"
                text="Логин"
                onClick={() => navigate("/login")}
              />
            ) : (
              <p className={style.navigation_authItemDescription}>
                {authStore.userInfo?.firstName} {authStore.userInfo?.secondName}
              </p>
            )}
          </li>
          <li>
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
