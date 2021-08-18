import React from 'react';
import { Field, FieldArray, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import * as Yup from 'yup'

import styles from "./FormLayout.module.scss";


const FormikInputs = ({input}) => {
  return (
    <FormGroup>
      <Label htmlFor='email'>{input.name}</Label>
      <Field>
        {() => (
          <Input className='mb-2' type={input.type} name={input.nameInput} onChange={(e) => input[input.nameInput] = e.target.value}/>
        )}
      </Field>
    </FormGroup>
  )
}

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
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
              "Пароль должен содержать цифру, буквы в нижнем и верхнем регистре и иметь длину не менее 8 знаков"
            ),
        }),
      confirmPassword: Yup.string()
        .when('nameInput', {
            is: 'confirmPassword',
            then: Yup.string()
          }
        ),
    })
  )
    .test(
      'confirmPassword',
      'Пароли несовпадают',
      function (values) {
        const response = {}
        values.map((item) => {
          response[item.nameInput] = item[item.nameInput]
        })
        if (response.confirmPassword !== undefined) {
          return response.password === response.confirmPassword;
        }
        return true
      }
    )
})

const FromLayout = ({children, dispatchType, name, inputs, nameSubmitBtn, additionalParam}) => {
  const {status, response} = useSelector(state => state.users)
  const dispatch = useDispatch()

  const dispatchPayload = (email, password, additional) => {
    let objToPass = {}
    if (email === undefined) {
      objToPass.password = password
    } else if (password === undefined) {
      objToPass.email = email
    } else {
      objToPass.email = email
      objToPass.password = password
    }
    if (additional) {
      objToPass.additional = additional
    }
    return objToPass
  }

  return (
    <div className={styles.authWrapper}>
      <div className='bg-primary col p-3 mb-1'>
        <h1 className='fs-2 text-light text-center'>{name}</h1>
      </div>
      <div>
        <Formik
          initialValues={{inputs}}
          validationSchema={schema}
          onSubmit={values => {
            let response = {}
            values.inputs.forEach(item => {
              response[item.nameInput] = item[item.nameInput]
            })
            const {email, password} = response
            dispatch(dispatchType(dispatchPayload(email, password, additionalParam)))
          }}
        >
          {({values, errors, touched, handleSubmit}) => (
            <Form className='p-3' onSubmit={handleSubmit}>
              {status === 'error' || (errors.inputs && touched.inputs) ?
                <ul className='error_block'>
                  {status === 'error' ? <li>{response}</li> : ''}
                  {errors.inputs && touched.inputs && ((Array.isArray(errors.inputs)) ? errors.inputs.map((input, index) =>
                    <li key={index}>{Object.values(input)[0]}</li>
                  ) : <li>{errors.inputs}</li>)}
                </ul>
                : ''}
              <FieldArray name='inputs' render={() => (
                <>
                  {values.inputs.map((input, index) => (
                    <FormikInputs key={index} input={input}/>
                  ))}
                </>
              )}/>
              <Button className='mt-3' type="submit" color='primary'>{nameSubmitBtn}</Button>
            </Form>
          )}
        </Formik>
        {children}
      </div>
    </div>
  );
};

export default FromLayout;