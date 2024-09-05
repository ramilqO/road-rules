import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import style from "./Notification.module.scss";
import notificationStore from "@/stores/Notification/notificationStore";

import CrossIcon from "/public/svg/notification/CrossIcon";
import InfoIcon from "/public/svg/notification/InfoIcon";

const Notification = observer(() => {
  const notification = notificationStore.notification;

  useEffect(() => {
    function handleEscapeKeyPress(e: KeyboardEvent) {
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
        style[`notification_${notification.type}`] // nt, тут никак, из-за notification.type... ццц
      }`}
    >
      <div className={style.cross}>
        <button
          type="button"
          className={`${style.cross_button} ${
            notification.type === "error"
              ? style.cross_buttonIcon__error
              : style.cross_buttonIcon__basic
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
          className={`${style.info_button} ${
            notification.type === "error"
              ? style.info_buttonIcon__error
              : style.info_buttonIcon__basic
          }`}
        >
          <InfoIcon />
        </button>
      </div>

      <div className={style.container}>
        <div className={style.aboutNotification}>
          <h4
            className={`${style.aboutNotification_title} ${
              style[`aboutNotification_title__${notification.type}`]
            }`}
          >
            {notification.titleText}
          </h4>
          <p
            className={`${style.aboutNotification_description} ${
              style[`aboutNotification_description__${notification.type}`]
            }`}
          >
            {notification.bodyText}
          </p>
        </div>

        {notification.button && notification.button.text.length > 0 && (
          <button
            className={`${style.container_button} ${
              style[`container_button__${notification.type}`]
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
