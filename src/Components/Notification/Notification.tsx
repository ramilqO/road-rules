import { useState } from "react";
import style from "./Notification.module.scss";
import Button from "../../Ui/Button/Button";
import CrossIcon from "../../../public/svg/notification/CrossIcon";
import InfoIcon from "../../../public/svg/notification/InfoIcon";

interface INotification {
  type?: "basic" | "error";
  titleText: string;
  bodyText: string;
  button?: { text: string; onClick: () => void };
}

export default function Notification({
  type = "error",
  titleText,
  bodyText,
  button = { text: "", onClick() {} },
}: INotification) {
  const [displayNotification, setDisplayNotification] = useState(true);

  return (
    displayNotification && (
      <div
        className={`${style.notification} ${style[`notification--${type}`]}`}
      >
        <div className={style.cross}>
          <button
            type="button"
            className={style.cross__button}
            onClick={() => setDisplayNotification(false)}
            style={{ color: `${type === "error" ? "#900B09" : "#000"}` }}
          >
            <CrossIcon />
          </button>
        </div>

        <div className={style.info}>
          <button
            type="button"
            className={style.info__button}
            style={{ color: `${type === "error" ? "#900b09" : "#000"}` }}
          >
            <InfoIcon />
          </button>
        </div>

        <div className={style.container}>
          <div className={style.aboutNotification}>
            <h4
              className={`${style.aboutNotification__title} ${
                style[`aboutNotification__title--${type}`]
              }`}
            >
              {titleText}
            </h4>
            <p
              className={`${style.aboutNotification__description} ${
                style[`aboutNotification__description--${type}`]
              }`}
            >
              {bodyText}
            </p>
          </div>

          {button.text.length > 0 && (
            <Button
              className={`${style.container__button} ${
                style[`container__button--${type}`]
              }`}
              onClick={button.onClick}
            >
              {button.text}
            </Button>
          )}
        </div>
      </div>
    )
  );
}
