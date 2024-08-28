import { redirect } from "react-router-dom";
import registerStore from "../../stores/Auth/registerStore";
import capitalizeFirstLetter from "../Helpers/capitalizeFirstLetter.ts";
import authStore from "../../stores/Auth/authStore";

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
    firstName: capitalizeFirstLetter(String(data.userName)),
    secondName: capitalizeFirstLetter(String(data.surName)),
    department: String(data.department),
  };

  await registerStore.register(credentials);

  if (!authStore.isAuth) return redirect("/register");

  return redirect("/menu");
}
