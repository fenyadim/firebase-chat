import React from 'react';
import { Link, useLocation } from "react-router-dom";

import { UPDATE_PASSWORD } from "../../redux/slices/dataSlice";
import { FormLayout } from "../../components";
import { Button, FormGroup } from "reactstrap";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const UpdatePassword = () => {
  let query = useQuery()
  console.log()

  return (
    <FormLayout dispatchType={UPDATE_PASSWORD} additionalParam={query.get('oobCode')} name='Обновить пароль' inputs={[{
      name: 'Пароль',
      nameInput: 'password',
      type: 'password',
      password: ''
    }, {
      name: 'Подтверждение пароля',
      nameInput: 'confirmPassword',
      type: 'password',
      confirmPassword: ''
    }]} nameSubmitBtn='Сменить пароль'>
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

export default UpdatePassword;
