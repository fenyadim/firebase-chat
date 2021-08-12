import React from "react";
import { ErrorMessage, Field, Form } from "formik";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import FormLayout from "../../components/FormLayout/FormLayout";

import { SIGN_IN } from "../../redux/slices/dataSlice";

const Login = () => {
  const {status, response} = useSelector(state => state.users)

  return (
    <FormLayout dispatchType={SIGN_IN} name='Авторизация'>
      <Form>
        {status === 'error' && <span>{response}</span>}
        <label htmlFor="email">Email</label>
        <Field type='email' name='email'/>
        <ErrorMessage name='email'/>
        <label htmlFor="password">Пароль</label>
        <Field type='password' name='password'/>
        <ErrorMessage name='password'/>
        <button className='btn accent_btn' type='submit'>Войти</button>
        test
      </Form>
      <Link to='/registration'>
        <button>Регистрация</button>
      </Link>
      <Link to='/forgot'>
        <button>Забыли пароль?</button>
      </Link>
    </FormLayout>
  )
}

export default Login