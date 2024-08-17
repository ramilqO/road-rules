import { redirect } from 'react-router-dom';

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
  //TODO: fromEntries не возвращает проис, его можно не ждать
  //TODO: data и так имеет такой тип, можно не писать его руками, если ты его удалишь ничего не сломается
  const data = (await Object.fromEntries(formdata)) as {
    [key: string]: FormDataEntryValue;
  };

  const typedData: FormData = {
    name: String(data.userName),
    surname: String(data.userSurname),
    email: String(data.userEmail),
    password: String(data.userPassword),
    repeatPassword: String(data.userRepeatPassword),
    nameAutoschool: String(data.userNameAutoschool),
  };

  console.log(typedData);

  return redirect('/menu');
}
