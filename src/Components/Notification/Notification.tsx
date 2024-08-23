import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import notificationStore from "../../stores/notificationStore";
import style from "./Notification.module.scss";

import CrossIcon from "../../../public/svg/notification/CrossIcon";
import InfoIcon from "../../../public/svg/notification/InfoIcon";

const Notification = observer(() => {
  const notification = notificationStore.notification;

  useEffect(() => {
    //TODO: старайся не использовать any нужно описать тип ивента который сюда приходит
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

  if (!notification) return null;

  return (
    <div
      className={`${style.notification} ${
        style[`notification--${notification.type}`]
      }`}
    >
      <div className={style.cross}>
        <button
          type="button"
          className={`${style.cross__button} ${
            notification.type === "error"
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
            notification.type === "error"
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
              style[`aboutNotification__title--${notification.type}`]
            }`}
          >
            {notification.titleText}
          </h4>
          <p
            className={`${style.aboutNotification__description} ${
              style[`aboutNotification__description--${notification.type}`]
            }`}
          >
            {notification.bodyText}
          </p>
        </div>

        {notification.button && notification.button.text.length > 0 && (
          <button
            className={`${style.container__button} ${
              style[`container__button--${notification.type}`]
            }`}
            onClick={() => {
              notification.button?.onClick();
              notificationStore.deleteNotification();
            }}
            type="button"
          >
            {notification.button.text}
          </button>
        )}
      </div>
    </div>
  );
});

export default Notification;
