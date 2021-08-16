import React from 'react';
import { Field, FieldArray, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from 'yup'
import { ToastContainer } from "react-toastify";

import styles from "./FormLayout.module.scss";

const schema = Yup.object().shape({
  inputs: Yup.array().of(
    Yup.object().shape({
      email: Yup.string()
        .when('nameInput', {
          is: 'email',
          then: Yup.string()
            .email('Неправильный email')
            .required('Введите email')
        }),
      password: Yup.string()
        .when('nameInput', {
          is: 'password',
          then: Yup.string()
            .required('Введите пароль')
          // .matches(
          //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
          //   "Пароль должен содержать цифру, буквы в нижнем и верхнем регистре и иметь длину не менее 8 знаков"
          // ),
        }),
      confirmPassword: Yup.string()
        .when('nameInput', {
            is: 'confirmPassword',
            then: Yup.string()
              .test(
                'match',
                'НЕ РАБОТАЕТ',
                function (value) {
                  console.log(Yup.ref('password') === value)
                }
              )
          }
          // .test({
          //   name: 'Test',
          //   test: value => console.log(value)
          // })
          // Yup.string()
          //   .oneOf([Yup.ref('password'), null], 'Пароли несовпадают')
        ),
    })
  )
})

const FromLayout = ({children, dispatchType, name, inputs, nameSubmitBtn}) => {
  const {status, response} = useSelector(state => state.users)
  const dispatch = useDispatch()

  return (
    <div className={styles.authWrapper}>
      <div className={styles.titleWrapper}>
        <h1>{name}</h1>
      </div>
      <div className={styles.formWrapper}>
        <Formik
          initialValues={{inputs}}
          validationSchema={schema}
          onSubmit={values => {
            const response = {}
            values.inputs.forEach(item => {
              response[item.nameInput] = item[item.nameInput]
            })
            const {email, password} = response
            if (email === undefined) {
              dispatch(dispatchType({password: password}))
            } else if (password === undefined) {
              dispatch(dispatchType({email: email}))
            } else {
              dispatch(dispatchType({email: email, password: password}))
            }
          }}
        >
          {({values, errors, touched, setFieldValue}) => (
            <Form>
              {status === 'error' || (errors.inputs && touched.inputs) ?
                <ul className='error_block'>
                  {status === 'error' ? <li>{response}</li> : ''}
                  {errors.inputs && touched.inputs && errors.inputs.map((input, index) =>
                    input && <li key={index}>{Object.values(input)[0]}</li>
                  )}
                </ul>
                : ''}
              {status === 'success' && <ToastContainer/>}
              <FieldArray name='inputs' render={() => (
                <>
                  {values.inputs.map((input, index) => (
                    <React.Fragment key={index}>
                      <label htmlFor='email'>{input.name}</label>
                      <Field type={input.type} name={input.nameInput}
                             onChange={(e) => {
                               input[input.nameInput] = e.target.value
                             }}/>
                    </React.Fragment>
                  ))}
                </>
              )}/>
              <button type="submit" className='btn accent_btn'>{nameSubmitBtn}</button>
            </Form>
          )}
        </Formik>
        {children}
      </div>
    </div>
  );
};

export default FromLayout;
