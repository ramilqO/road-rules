import { lazy } from "react";
import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";

import notificationStore from "../../stores/Notification/notificationStore";
import style from "./AppLayout.module.scss";

const Header = lazy(() => import("../../Components/Header/Header"));
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
