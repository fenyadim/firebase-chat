import React from 'react';
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from 'yup'

import styles from "./FormLayout.module.scss";

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Неправильный email!')
    .required('Введите email'),
  password: Yup.string()
    .min(5, 'Слишком короткий пароль!')
    .required('Введите пароль'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Пароли несовпадают')
})

const FromLayout = ({children, dispatchType, name}) => {
  const dispatch = useDispatch()

  return (
    <div className={styles.authWrapper}>
      <div className={styles.titleWrapper}>
        <h1>{name}</h1>
      </div>
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={schema}
        onSubmit={values => {
          console.log(values)
          dispatch(dispatchType({email: values.email, password: values.password}))
        }}
      >
        {(errors, touched) => (
          <div className={styles.formWrapper}>
            {children}
          </div>
        )}
      </Formik>
    </div>
  );
};

export default FromLayout;
