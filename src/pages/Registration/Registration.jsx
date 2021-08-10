import React from 'react';
import { useSelector } from "react-redux";
import { ErrorMessage, Field, Form } from "formik";
import { Link } from "react-router-dom";

import { FormLayout } from "../../components";
import { SIGN_UP } from "../../redux/slices/dataSlice";

import styles from "../Login/Login.module.scss";

const Registration = () => {
  const {status, response} = useSelector(state => state.users)

  return (
    <FormLayout dispatchType={SIGN_UP} name='Регистрация'>
      <Form className={styles.form}>
        {status === 'error' && <span>{response}</span>}
        <label htmlFor="email">Email</label>
        <Field type='email' name='email'/>
        <ErrorMessage name='email'/>
        <label htmlFor="password">Пароль</label>
        <Field type='password' name='password'/>
        <ErrorMessage name='password'/>
        <label htmlFor="confirmPassword">Подтверждение пароля</label>
        <Field type='password' name='confirmPassword'/>
        <ErrorMessage name='confirmPassword'/>
        <button className='btn accent_btn' type='submit'>Зарегистрироваться</button>
      </Form>
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
