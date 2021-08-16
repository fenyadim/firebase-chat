import React from 'react';
import { Link } from "react-router-dom";

import { FormLayout } from "../../../components";
import { FORGOT } from "../../../redux/slices/dataSlice";

const ForgotPassword = () => {
  return (
    <FormLayout dispatchType={FORGOT} name='Забыл пароль' inputs={[{
      name: 'Email',
      nameInput: 'email',
      type: 'email'
    }]} nameSubmitBtn='Отправить ссылку для восстановления'>
      <Link to='/login'>
        <button>Войти</button>
      </Link>
      <Link to='/registration'>
        <button>Регистрация</button>
      </Link>
    </FormLayout>
  );
};

export default ForgotPassword;
