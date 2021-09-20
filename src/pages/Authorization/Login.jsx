import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button, FormGroup } from "reactstrap";

import { FormLayout } from "../../components";

import { SIGN_IN, SIGN_IN_GOOGLE } from "../../redux/slices/usersSlice";

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
      <FormGroup className='d-flex justify-content-between p-3'>
        <Button color='light'>Войти через <i className="fab fa-vk ms-1"/></Button>
        <Button color='light' onClick={() => dispatch(SIGN_IN_GOOGLE())}>Войти через <i className="fab fa-google ms-1"/></Button>
      </FormGroup>
      <FormGroup className='d-flex justify-content-between p-3 pt-0'>
        <Link to='/registration'>
          <Button color='link'>Регистрация</Button>
        </Link>
        <Link to='/forgot'>
          <Button color='link'>Забыли пароль?</Button>
        </Link>
      </FormGroup>
    </FormLayout>
  )
}

export default Login