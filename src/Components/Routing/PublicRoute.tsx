import type React from "react";
import { Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import authStore from "../../stores/Auth/authStore";

interface IPublicRoute {
  children: React.ReactElement;
}

const PublicRoute: React.FC<IPublicRoute> = observer(({ children }) => {
  const isAuth = authStore.isAuth;

  return !isAuth ? children : <Navigate to="/menu" replace />;
});

export default PublicRoute;
