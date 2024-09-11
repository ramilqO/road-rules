import type React from "react";
import { observer } from "mobx-react-lite";
import { Navigate, useLocation } from "react-router-dom";

import authStore from "@/stores/Auth/authStore";
import ticketsStore from "@/stores/Tickets/ticketsStore";
import { useEffect, useState } from "react";
import storageSelectors from "@/stores/Selectors/storageSelectors";

interface IPrivateRoute {
  children: React.ReactElement;
  checkIsResult?: boolean;
}

const PrivateRoute = observer((props: IPrivateRoute) => {
  const { children, checkIsResult = false } = props;

  const { pathname } = useLocation();
  const [previousPathname, setPreviousPathname] = useState(() => {
    return localStorage.getItem(storageSelectors.previousPathname);
  });

  useEffect(() => {
    setPreviousPathname(pathname);
    localStorage.setItem(storageSelectors.previousPathname, pathname);
  }, [pathname]);

  const isAuth = authStore.isAuth;
  const isAllAnswersForResults =
    ticketsStore.questions.length > 0 &&
    ticketsStore.questions.length === ticketsStore.answers.length;

  if (checkIsResult)
    return isAllAnswersForResults ? (
      children
    ) : (
      <Navigate to={previousPathname ? previousPathname : ""} replace />
    );
  return isAuth ? children : <Navigate to="/login" replace />;
});

export default PrivateRoute;
