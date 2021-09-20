import React from 'react';
import { Link } from "react-router-dom";
import { Button, FormGroup } from "reactstrap";

import { FormLayout } from "../../components";
import { SIGN_UP } from "../../redux/slices/usersSlice";

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
      <FormGroup className='d-flex justify-content-between p-3 pt-0'>
        <Link to='/login'>
          <Button color='link'>Авторизация</Button>
        </Link>
        <Link to='/forgot'>
          <Button color='link'>Забыли пароль?</Button>
        </Link>
      </FormGroup>
    </FormLayout>
  )
};

export default Registration;
