import { useEffect, useState } from "react";

import style from "./ThemeToggle.module.scss";

import MoonIcon from "../../../public/svg/header/MoonIcon";
import SunIcon from "../../../public/svg/header/SunIcon";

export default function ThemeToggle() {
  const [themeMode, setThemeMode] = useState("whiteMode");

  useEffect(
    function () {
      document.documentElement.setAttribute("data-theme", themeMode);

      return () => {
        document.documentElement.removeAttribute("data-theme");
      };
    },
    [themeMode]
  );

  const toggleTheme = () =>
    setThemeMode(themeMode === "whiteMode" ? "darkMode" : "whiteMode");

  return (
    <button className={style.buttonChangeTheme} onClick={toggleTheme}>
      {themeMode === "whiteMode" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
