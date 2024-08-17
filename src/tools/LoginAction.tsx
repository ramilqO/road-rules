import { redirect } from "react-router-dom";

type FormData = {
  email: string;
  password: string;
};

export async function LoginAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // По typedData мы будем делать запрос на БЭК login
  const typedData: FormData = {
    email: String(data.userEmail),
    password: String(data.userPassword),
  };

  console.log(typedData);

  return redirect("/menu");
}
