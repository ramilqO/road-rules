import { useEffect, useState } from "react";

import style from "./ThemeToggle.module.scss";

import MoonIcon from "../../../public/svg/header/MoonIcon";
import SunIcon from "../../../public/svg/header/SunIcon";

export default function ThemeToggle() {
  const [themeMode, setThemeMode] = useState("whiteMode");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeMode);

    return () => {
      document.documentElement.removeAttribute("data-theme");
    };
  }, [themeMode]);

  const toggleTheme = () =>
    setThemeMode(themeMode === "whiteMode" ? "darkMode" : "whiteMode");

  return (
    // TODO: давай эта кнопка тоже будет черного цвета, как остальные кнопки, а то она не туда и не сюда серая непонятная в макете поправлю
    <button
      className={style.buttonChangeTheme}
      onClick={toggleTheme}
      type="button"
    >
      {themeMode === "whiteMode" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
