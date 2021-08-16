import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { FormLayout } from "../../../components";

import { SIGN_IN, SIGN_IN_GOOGLE } from "../../../redux/slices/dataSlice";

const Login = () => {
  const dispatch = useDispatch()

  return (
    <FormLayout dispatchType={SIGN_IN} name='Авторизация' inputs={[{
      name: 'Email',
      nameInput: 'email',
      type: 'email',
      email: '',
    }, {
      name: 'Пароль',
      nameInput: 'password',
      type: 'password',
      password: '',
    }]} nameSubmitBtn='Войти'>
      <Link to='/registration'>
        <button>Регистрация</button>
      </Link>
      <Link to='/forgot'>
        <button>Забыли пароль?</button>
      </Link>
      <button>Войти через VK</button>
      <button onClick={() => dispatch(SIGN_IN_GOOGLE())}>Войти через Google</button>
    </FormLayout>
  )
}

export default Login