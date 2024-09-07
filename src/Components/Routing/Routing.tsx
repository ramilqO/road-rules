import { lazy } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

const AppLayout = lazy(() => import("@/Ui/AppLayout/AppLayout"));
const Menu = lazy(() => import("@/Pages/Menu/Menu"));
const Questions = lazy(() => import("@/Pages/Questions/Questions"));
const Results = lazy(() => import("@/Pages/Results/Results"));
const Login = lazy(() => import("@/Pages/Auth/Login/Login"));
const Register = lazy(() => import("@/Pages/Auth/Register/Register"));
const PageNotFound = lazy(() => import("@/Pages/PageNotFound/PageNotFound"));

import { LoginAction as loginActionData } from "@/tools/Actions/LoginAction";
import { RegisterAction as registerActionData } from "@/tools/Actions/RegisterAction";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        element: <Navigate replace to="menu" />,
      },
      {
        path: "menu",
        element: (
          <PrivateRoute>
            <Menu />
          </PrivateRoute>
        ),
      },
      {
        path: "tickets/:ticketId",
        element: (
          <PrivateRoute>
            <Questions />
          </PrivateRoute>
        ),
      },
      {
        path: "exam",
        element: (
          <PrivateRoute>
            <Questions />
          </PrivateRoute>
        ),
      },
      {
        path: "results",
        element: (
          <PrivateRoute checkIsResult={true}>
            <Results />
          </PrivateRoute>
        ),
      },

      {
        path: "login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
        action: loginActionData,
      },
      {
        path: "register",
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
        action: registerActionData,
      },
      {
        path: "*",
        element: (
          <PublicRoute>
            <PageNotFound />
          </PublicRoute>
        ),
      },
    ],
  },
]);

const Routing = () => {
  return <RouterProvider router={router} />;
}

export default Routing