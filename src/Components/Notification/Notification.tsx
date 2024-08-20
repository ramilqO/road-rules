import { useEffect } from "react";

import notificationStore from "../../stores/notificationStore";
import style from "./Notification.module.scss";

import CrossIcon from "../../../public/svg/notification/CrossIcon";
import InfoIcon from "../../../public/svg/notification/InfoIcon";

interface INotification {
  type: "basic" | "error";
  titleText: string;
  bodyText: string;
  button?: { text: string; onClick: () => void };
}

function Notification({ type, titleText, bodyText, button }: INotification) {
  useEffect(() => {
    function handleEscapeKeyPress(e: any) {
      if (e.key === "Escape") {
        notificationStore.deleteNotification();
      }
    }

    window.addEventListener("keydown", handleEscapeKeyPress);

    return () => {
      window.removeEventListener("keydown", handleEscapeKeyPress);
    };
  }, []);

  return (
    <div className={`${style.notification} ${style[`notification--${type}`]}`}>
      <div className={style.cross}>
        <button
          type="button"
          className={`${style.cross__button} ${
            type === "error"
              ? style["cross__buttonIcon--error"]
              : style["cross__buttonIcon--basic"]
          }`}
          onClick={() => {
            notificationStore.deleteNotification();
          }}
        >
          <CrossIcon />
        </button>
      </div>

      <div className={style.info}>
        <button
          type="button"
          className={`${style.info__button} ${
            type === "error"
              ? style["info__buttonIcon--error"]
              : style["info__buttonIcon--basic"]
          }`}
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

        {button && button.text.length > 0 && (
          <button
            className={`${style.container__button} ${
              style[`container__button--${type}`]
            }`}
            onClick={() => {
              button.onClick();
              notificationStore.deleteNotification();
            }}
            type="button"
          >
            {button.text}
          </button>
        )}
      </div>
    </div>
  );
}

export default Notification;
