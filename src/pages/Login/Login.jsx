import React from "react";
import firebase from "firebase";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import styles from './Login.module.scss'

import { sagaCreateUser, sagaSignInUser } from "../../redux/slices/dataSlice";

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
  const data = useSelector((state) => state.users)
  const dispatch = useDispatch()
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid
        console.log(uid)
        console.log(user)
      } else {
        console.log('Не зашёл')
      }
    });
    console.log(data)
  }, [data])
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
      <h1 className={styles.red}>Авторизация</h1>
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
      <button onClick={() => firebase.auth().signOut()}>Выход</button>
    </div>
  )
}

export default Login