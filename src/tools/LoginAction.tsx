import { redirect } from 'react-router-dom';

type FormData = {
  email: string;
  password: string;
};

export async function LoginAction({ request }: { request: Request }) {
  const formData = await request.formData();
  //TODO: data и так имеет такой тип, можно не писать его руками, если ты его удалишь ничего не сломается
  const data = Object.fromEntries(formData) as {
    [key: string]: FormDataEntryValue;
  };

  // По typedData мы будем делать запрос на БЭК login
  const typedData: FormData = {
    email: String(data.userEmail),
    password: String(data.userPassword),
  };

  console.log(typedData);

  return redirect('/menu');
}
