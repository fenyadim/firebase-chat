import React from 'react';
import { Link } from "react-router-dom";

import { FormLayout } from "../../components";
import { SIGN_UP } from "../../redux/slices/dataSlice";

const Registration = () => {
  return (
    <FormLayout dispatchType={SIGN_UP} name='Регистрация' inputs={[{
      name: 'Email',
      nameInput: 'email',
      type: 'email',
      email: ''
    }, {
      name: 'Пароль',
      nameInput: 'password',
      type: 'password',
      password: ''
    }, {
      name: 'Подтверждение пароля',
      nameInput: 'confirmPassword',
      type: 'password',
      confirmPassword: ''
    }]} nameSubmitBtn='Зарегистрироваться'>
      <Link to='/login'>
        <button>Авторизация</button>
      </Link>
      <Link to='/forgot'>
        <button>Забыли пароль?</button>
      </Link>
    </FormLayout>
  )
};

export default Registration;
