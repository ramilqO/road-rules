import type React from "react";
import { Navigate } from "react-router-dom";

import { observer } from "mobx-react-lite";
import authStore from "../../stores/Auth/authStore";

interface IPrivateRoute {
  children: React.ReactElement;
}

const PrivateRoute: React.FC<IPrivateRoute> = observer(({ children }) => {
  const isAuth = authStore.isAuth;

  return isAuth ? children : <Navigate to="/login" replace />;
});

export default PrivateRoute;
