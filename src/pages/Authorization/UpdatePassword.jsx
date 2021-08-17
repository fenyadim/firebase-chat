import React from 'react';
import { Link, useLocation } from "react-router-dom";

import { UPDATE_PASSWORD } from "../../redux/slices/dataSlice";
import { FormLayout } from "../../components";

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
      <Link to='/login'>
        <button>Войти</button>
      </Link>
      <Link to='/registration'>
        <button>Регистрация</button>
      </Link>
    </FormLayout>
  );
};

export default UpdatePassword;
