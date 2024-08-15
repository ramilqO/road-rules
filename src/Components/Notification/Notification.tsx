import { useState } from "react";

import style from "./Notification.module.scss";

import Button from "../../Ui/Button/Button";

import CrossIcon from "../../../public/svg/notification/CrossIcon";
import InfoIcon from "../../../public/svg/notification/InfoIcon";

interface INotification {
  stateNotification?:
    | "basicLightTheme"
    | "basicDarkTheme"
    | "errorLightTheme"
    | "errorDarkTheme";
  titleText: string;
  bodyText: string;
  button?: string;
  width?: string; // можно убрать
  height?: string; // можно убрать
}

export default function Notification({
  stateNotification = "basicLightTheme",
  titleText, // ✅
  bodyText, // ✅
  button = "", // ✅
  width = "320", // ✅
  height = "80", // ✅
}: INotification) {
  const [displayNotification, setDisplayNotification] = useState(true);

  return (
    displayNotification && (
      <div
        style={{
          width: `${width}px`,
          height: `${
            button.length > 0 && Number(height) < 128 ? 128 : height
          }px`,
        }}
        className={`${style.notification} ${
          style[`notification--${stateNotification}`]
        }`}
      >
        <div className={style.cross}>
          <button
            type="button"
            className={style.cross__button}
            onClick={() => setDisplayNotification(!displayNotification)}
          >
            <CrossIcon stateNotification={stateNotification} />
          </button>
        </div>

        <div className={style.info}>
          <button type="button" className={style.info__button}>
            <InfoIcon stateNotification={stateNotification} />
          </button>
        </div>

        <div className={style.container}>
          <div className={style.aboutNotification}>
            <h4
              className={`${style.aboutNotification__title} ${
                style[`aboutNotification__title--${stateNotification}`]
              }`}
            >
              {titleText}
            </h4>
            <p
              className={`${style.aboutNotification__description} ${
                style[`aboutNotification__description--${stateNotification}`]
              }`}
            >
              {bodyText}
            </p>
          </div>

          {button.length > 0 && (
            <Button
              className={`${style.notification__button} ${
                style[`notification__button--${stateNotification}`]
              }`}
            >
              {button}
            </Button>
          )}
        </div>
      </div>
    )
  );
}
