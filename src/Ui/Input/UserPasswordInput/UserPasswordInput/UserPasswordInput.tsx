import { useRef, useState } from 'react';
import Checkbox from '../../../../Components/Controls/Checkbox/Checkbox';
import Input from '../../../../Components/Controls/Input/Input';
import style from './UserPasswordInput.module.scss';

// Определяем интерфейс для пропсов
interface UserPasswordInputProps {
  password: string;
  setPassword: (value: string) => void;
}

export default function UserPasswordInput({
  password,
  setPassword,
}: UserPasswordInputProps) {
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [validationError, setValidationError] = useState('');

  function handleChangeVisibility() {
    const input = passwordInputRef.current;
    if (!input) return;

    if (input.type === 'password') {
      input.type = 'text';
    } else {
      input.type = 'password';
    }
  }

  function handleErrors() {
    const isStep1Complete = password.length >= 8;
    if (!isStep1Complete) {
      setValidationError('Длина пароля должна быть больше 8 символов');
      return;
    }
    const isStep2Complete = /[A-Z]/.test(password);
    if (!isStep2Complete) {
      setValidationError('Пароль должен содержать заглавную букву');
      return;
    }

    const isStep3Complete = /[0-9]/.test(password);
    if (!isStep3Complete) {
      setValidationError('Пароль должен содержать цифру');
      return;
    }

    const isStep4Complete =
      isStep2Complete && /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);
    if (!isStep4Complete) {
      setValidationError('Пароль должен содержать символ');
      return;
    }
    setValidationError('');
  }

  return (
    <div className={style.field}>
      <Input
        value={password}
        onChange={(value) => {
          setPassword(value);
          handleErrors();
        }}
        label="Пароль"
        name="userPassword"
        placeholder="*********"
        inputRef={passwordInputRef}
        errorText={validationError}
      />
      <Checkbox
        label="Показать пароль"
        onToggle={handleChangeVisibility}
        defaultChecked={true}
      />
    </div>
  );
}
