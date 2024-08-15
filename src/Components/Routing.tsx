import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import AppLayout from "../Ui/AppLayout/AppLayout";
import Menu from "../Pages/Menu/Menu";
import Questions from "../Pages/Questions/Questions";
import Results from "../Pages/Results/Results";

import Login from "../Pages/Auth/Login/Login";
import { LoginAction as loginActionData } from "../tools/LoginAction";
import Register from "../Pages/Auth/Register/Register";
import { RegisterAction as registerActionData } from "../tools/RegisterAction";

import PageNotFound from "../Pages/PageNotFound/PageNotFound";

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
