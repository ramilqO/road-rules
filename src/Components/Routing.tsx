import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import AppLayout from "../Ui/AppLayout";
import Menu from "./Menu/Menu";
import Questions from "./Questions/Questions";
import Results from "./Results/Results";

import Login, { action as loginActionData } from "./Auth/Login/Login";
import Register, {
  action as registerActionData,
} from "./Auth/Register/Register";

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
