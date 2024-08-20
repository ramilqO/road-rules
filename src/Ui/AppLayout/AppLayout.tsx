import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";

import notificationStore from "../../stores/notificationStore";
import style from "./AppLayout.module.scss";

import Header from "../../Components/Header/Header";
import Notification from "../../Components/Notification/Notification";

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
