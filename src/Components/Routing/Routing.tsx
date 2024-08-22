import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import AppLayout from "../../Ui/AppLayout/AppLayout";
import Menu from "../../Pages/Menu/Menu";
import Questions from "../../Pages/Questions/Questions";
import Results from "../../Pages/Results/Results";

import Login from "../../Pages/Auth/Login/Login";
import { LoginAction as loginActionData } from "../../tools/LoginAction";
import Register from "../../Pages/Auth/Register/Register";
import { RegisterAction as registerActionData } from "../../tools/RegisterAction";

import PageNotFound from "../../Pages/PageNotFound/PageNotFound";

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
        path: "questions",
        element: (
          <PrivateRoute>
            <Questions />
          </PrivateRoute>
        ),
      },
      {
        path: "results",
        element: (
          <PrivateRoute>
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
    ],
  },
]);

export default function Routing() {
  return <RouterProvider router={router} />;
}
