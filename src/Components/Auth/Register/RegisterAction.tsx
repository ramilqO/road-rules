import { redirect } from "react-router-dom";

type FormData = {
  name: string;
  surname: string;
  email: string;
  password: string;
  repeatPassword: string;
  nameAutoschool: string;
};

export async function RegisterAction({ request }: { request: Request }) {
  const formdata = await request.formData();
  const data = (await Object.fromEntries(formdata)) as {
    [key: string]: FormDataEntryValue;
  };

  const typedData: FormData = {
    name: String(data.userName),
    surname: String(data.userSurname),
    email: String(data.email),
    password: String(data.password),
    repeatPassword: String(data.repeatPassword),
    nameAutoschool: String(data.nameAutoschool),
  };

  console.log(typedData);

  return redirect("/menu");
}
