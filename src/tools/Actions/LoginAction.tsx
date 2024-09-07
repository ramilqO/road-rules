import { redirect } from "react-router-dom";

import loginStore from "@/stores/Auth/loginStore";
import authStore from "@/stores/Auth/authStore";

interface ICredentials {
  email: string;
  password: string;
}

export async function LoginAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as {
    [key: string]: string;
  };

  const credentials: ICredentials = {
    email: data.userEmail,
    password: data.userPassword,
  };

  await loginStore.login(credentials);

  if (!authStore.isAuth) return redirect("/login");

  return redirect("/menu");
}
