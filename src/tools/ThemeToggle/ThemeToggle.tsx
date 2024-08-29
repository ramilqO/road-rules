import { useEffect, useState } from "react";

import MoonIcon from "../../../public/svg/header/MoonIcon";
import SunIcon from "../../../public/svg/header/SunIcon";

import Button from "../../Ui/Button/Button";
import storageSelectors from "../../stores/Any/storageSelectors";

export default function ThemeToggle() {
  const [themeMode, setThemeMode] = useState(() => {
    const savedTheme = localStorage.getItem(storageSelectors.theme);
    return savedTheme || "whiteMode";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeMode);
    localStorage.setItem(storageSelectors.theme, themeMode);

    return () => {
      document.documentElement.removeAttribute("data-theme");
    };
  }, [themeMode]);

  const toggleTheme = () =>
    setThemeMode(themeMode === "whiteMode" ? "darkMode" : "whiteMode");

  return (
    <Button
      type="button"
      text={themeMode === "whiteMode" ? <MoonIcon /> : <SunIcon />}
      onClick={toggleTheme}
    />
  );
}
