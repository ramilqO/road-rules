import { redirect } from "react-router-dom";

import registerStore from "@/stores/Auth/registerStore";
import authStore from "@/stores/Auth/authStore";

import helpers from "../Helpers/helpers";

interface ICredentials {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
  department: string;
}

export async function RegisterAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as {
    [key: string]: string;
  };

  const credentials: ICredentials = {
    email: data.email,
    password: data.userPassword,
    firstName: helpers.capitalizeFirstLetter(data.userName),
    secondName: helpers.capitalizeFirstLetter(data.surName),
    department: data.department,
  };

  await registerStore.register(credentials);

  if (!authStore.isAuth) return redirect("/register");

  return redirect("/menu");
}
