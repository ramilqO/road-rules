import { lazy } from "react";
import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";

import style from "./AppLayout.module.scss";

import Header from "../../Components/Header/Header";

import notificationStore from "../../stores/Notification/notificationStore";
const Notification = lazy(
  () => import("../../Components/Notification/Notification")
);

const AppLayout = observer(() => {
  return (
    <div className={style.wrapper}>
      <Header />

      <main className={style.main}>
        <Outlet />

        {notificationStore.notification && <Notification />}
      </main>
    </div>
  );
});

export default AppLayout;
