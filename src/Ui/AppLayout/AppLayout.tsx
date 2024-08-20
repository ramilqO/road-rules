import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";

import style from "./AppLayout.module.scss";

import Header from "../../Components/Header/Header";
import Notification from "../../Components/Notification/Notification";
import notificationStore from "../../stores/notificationStore";

const AppLayout = observer(() => {
  const notification = notificationStore.notification;

  return (
    <div className={style.wrapper}>
      <Header />

      <main className={style.main}>
        <Outlet />

        {notification && (
          <Notification
            type={notification.type}
            titleText={notification.titleText}
            bodyText={notification.bodyText}
            button={
              notification.button
                ? {
                    text: notification.button.buttonText,
                    onClick: notification.button.buttonAction,
                  }
                : undefined
            }
          />
        )}
      </main>
    </div>
  );
});

export default AppLayout;
