import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "../Ui/AppLayout";
import Menu from "./Menu/Menu";
import Questions from "./Questions/Questions";
import Results from "./Results/Results";

import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";

import PageNotFound from "./PageNotFound/PageNotFound";

export default function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="menu" />} />
          <Route path="menu" element={<Menu />} />
          <Route path="questions" element={<Questions />} />
          <Route path="results" element={<Results />} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
