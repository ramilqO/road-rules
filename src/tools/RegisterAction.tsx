import { redirect } from "react-router-dom";
import registerStore from "../stores/Auth/registerStore";
import notificationStore from "../stores/notificationStore";

interface ICredentials {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
  department: string;
}

export async function RegisterAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const credentials: ICredentials = {
    email: String(data.email),
    password: String(data.userPassword),
    firstName: String(data.userName),
    secondName: String(data.surName),
    department: String(data.department),
  };

  await registerStore.register(credentials);

  if (notificationStore.notification) return;

  return redirect("/menu");
}
