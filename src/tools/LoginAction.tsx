import { redirect } from "react-router-dom";
import loginStore from "../stores/Auth/loginStore";
import notificationStore from "../stores/notificationStore";

interface ICredentials {
  email: string;
  password: string;
}

export async function LoginAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const credentials: ICredentials = {
    email: String(data.userEmail),
    password: String(data.userPassword),
  };

  await loginStore.login(credentials);

  if (notificationStore.notification) return redirect("/login");

  return redirect("/menu");
}
