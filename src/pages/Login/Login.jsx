import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { sagaLoggedUser, sagaSignInUser, sagaSignOutUser } from "../../redux/action/saga";

import styles from './Login.module.scss'
import { Link } from "react-router-dom";

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Email должен быть введен.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Email должен иметь общепринятый вид адреса электронной почты.';
  }
  if (!values.password) {
    errors.password = 'Пароль должен быть введен.';
  }
  return errors;
};

const Login = () => {
  const state = useSelector((state) => state.users)
  const {status, response} = state
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(sagaLoggedUser())
  }, [dispatch])

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate,
    onSubmit: values => {
      dispatch(sagaSignInUser({email: values.email, password: values.password}))
    }
  })

  return (
    <div className={styles.loginWrapper}>
      <h1>Авторизация</h1>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" value={formik.values.email}
               onChange={formik.handleChange}/>
        {formik.errors.email && formik.touched.email ? <span>{formik.errors.email}</span> : ''}
        <label htmlFor="password">Пароль</label>
        <input type="password" name="password" id="password" value={formik.values.password}
               onChange={formik.handleChange}/>
        {formik.errors.password && formik.touched.password ? <span>{formik.errors.password}</span> : ''}
        <button type="submit">Войти</button>
      </form>
      <button onClick={() => dispatch(sagaSignOutUser())}>Выход</button>
      <Link to='/chat'>CHAT</Link>
    </div>
  )
}

export default Login