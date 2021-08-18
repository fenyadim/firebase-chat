import React from 'react';
import { Link } from "react-router-dom";

import { FormLayout } from "../../components";
import { FORGOT } from "../../redux/slices/dataSlice";
import { Button, FormGroup } from "reactstrap";

const ForgotPassword = () => {
  return (
    <FormLayout dispatchType={FORGOT} name='Забыл пароль' inputs={[{
      name: 'Email',
      nameInput: 'email',
      type: 'email'
    }]} nameSubmitBtn='Отправить ссылку для восстановления'>
      <FormGroup className='d-flex justify-content-between p-3 pt-0'>
        <Link to='/login'>
          <Button color='link'>Войти</Button>
        </Link>
        <Link to='/registration'>
          <Button color='link'>Регистрация</Button>
        </Link>
      </FormGroup>
    </FormLayout>
  );
};

export default ForgotPassword;
