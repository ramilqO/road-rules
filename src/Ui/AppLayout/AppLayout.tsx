import { Outlet } from "react-router-dom";

import style from "./AppLayout.module.scss";

import Header from "../../Components/Header/Header";
import Notification from "../../Components/Notification/Notification";

export default function AppLayout() {
  return (
    <div>
      <Header />

      <main className={style.main}>
        <Outlet />
        <div className={style.notification}>
          <Notification
            type="basic"
            titleText="Title"
            bodyText="Body text"
            button={{ text: "Button", onClick() {} }}
          />
        </div>
      </main>
    </div>
  );
}
