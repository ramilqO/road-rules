import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import AppLayout from "../Ui/AppLayout/AppLayout";
import Menu from "./Menu/Menu";
import Questions from "./Questions/Questions";
import Results from "./Results/Results";

import Login from "./Auth/Login/Login";
import { LoginAction as loginActionData } from "./Auth/Login/LoginAction";
import Register from "./Auth/Register/Register";
import { RegisterAction as registerActionData } from "./Auth/Register/RegisterAction";

import PageNotFound from "./PageNotFound/PageNotFound";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <PageNotFound />,
    children: [
      { index: true, element: <Navigate replace to="menu" /> },
      { path: "menu", element: <Menu /> },
      { path: "questions", element: <Questions /> },
      { path: "results", element: <Results /> },
      { path: "login", element: <Login />, action: loginActionData },
      { path: "register", element: <Register />, action: registerActionData },
    ],
  },
]);

export default function Routing() {
  return <RouterProvider router={router} />;
}
