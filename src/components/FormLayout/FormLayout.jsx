import React from 'react';
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from 'yup'

import styles from "./FormLayout.module.scss";

const schema = Yup.object().shape({
  inputs: Yup.array().of(
    Yup.object().shape({
      nameInput: Yup.string().when("email", {
        is: true,
        then: Yup.string()
          .email('Неправильный email!')
          .required('Введите email'),
      })
    })
  )
})

// const schema = Yup.object().shape({
//   inputs: Yup.array().of(
//     Yup.object.shape({
//       nameInput: Yup.string().when("email", {
//         is: true,
//         then: Yup.string()
//           .email('Неправильный email!')
//           .required('Введите email'),
//       })
//     })
//   )
//   // email: Yup.string()
//   //   .email('Неправильный email!')
//   //   .required('Введите email'),
//   // password: Yup.string()
//   //   .min(5, 'Слишком короткий пароль!')
//   //   .required('Введите пароль'),
//   // confirmPassword: Yup.string()
//   //   .oneOf([Yup.ref('password'), null], 'Пароли несовпадают')
// })

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
            console.log(values)
            const response = {}
            values.inputs.forEach(item => {
              response[item.nameInput] = item.value
            })
            const {email, password} = response
            if (email === undefined) {
              dispatch(dispatchType({password: password}))
            } else if (password === undefined) {
              console.log(`РАБОТАЕТ ${email}`)
              dispatch(dispatchType({email: email}))
            } else {
              dispatch(dispatchType({email: email, password: password}))
            }
          }}
        >
          {({values, setFieldValue}) => (
            <Form>
              {status === 'error' && <span>{response}</span>}
              <FieldArray name='inputs' render={({replace}) => (
                <>
                  {values.inputs.map(({type, name, nameInput, value}, index) => (
                    <React.Fragment key={index}>
                      <label htmlFor='email'>{name}</label>
                      <Field type={type} name={nameInput} value={value || ''}
                             onChange={(e) => replace(index, {
                               name,
                               nameInput,
                               type,
                               value: e.target.value
                             })}/>
                      <ErrorMessage name={nameInput}/>
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
