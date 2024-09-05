import type React from "react";
import { observer } from "mobx-react-lite";
import { Navigate } from "react-router-dom";

import authStore from "@/stores/Auth/authStore";
import ticketsStore from "@/stores/Tickets/ticketsStore";

interface IPrivateRoute {
  children: React.ReactElement;
  checkIsResult?: boolean;
}

const PrivateRoute = observer(
  ({ children, checkIsResult = false }: IPrivateRoute) => {
    const isAuth = authStore.isAuth;
    const isAllAnswersForResults =
      ticketsStore.questions.length > 0 &&
      ticketsStore.questions.length === ticketsStore.answers.length;

    if (checkIsResult)
      return isAllAnswersForResults ? (
        children
      ) : (
        <Navigate to="/menu" replace />
      );
    return isAuth ? children : <Navigate to="/login" replace />;
  }
);

export default PrivateRoute;
