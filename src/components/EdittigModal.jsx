import React from 'react';
import { Field, Form } from 'react-final-form'
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { Button, Form as FormWrapper, FormFeedback, FormGroup, Input, Label } from "reactstrap";

import { UPDATE_USER } from "../redux/slices/dataSlice";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '450px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// const schema = Yup.object().shape({
//   displayName: Yup.string()
//     .required('Введите имя'),
//   password: Yup.string()
//     .required('Введите пароль')
//     .matches(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
//       "Пароль должен содержать цифру, буквы в нижнем и верхнем регистре и иметь длину не менее 8 знаков"
//     ),
//   confirmPassword: Yup.string()
//     .test('passwords-match', 'Пароль не совпадает', function (value) {
//       return this.parent.password === value
//     })
// })

const GroupInput = ({input, meta, nameInput}) => {
  return (
    <FormGroup className="mb-2">
      <Label className='ms-2'>{nameInput}:</Label>
      <Input {...input} invalid={meta.touched && meta.error !== undefined}/>
      {meta.touched && meta.error && <FormFeedback>{meta.error}</FormFeedback>}
    </FormGroup>
  )
}

const EdditingModal = ({isOpen, closeModal, user}) => {
  const {displayName: name, email, photoURL, uid} = user
  console.log(user)
  const dispatch = useDispatch()
  let formData = {
    imageUrl: '',
    displayName: name && name,
    password: '',
    confirmPassword: ''
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel='Обновить профиль'
    >
      <Form
        onSubmit={(values) => {
          const formData = new FormData()
          formData.append('file', values.imageUrl)
          console.log(values)
          dispatch(UPDATE_USER({
            displayName: values.displayName,
            email,
            password: values.password,
            uid,
            imageUrl: values.imageUrl
          }))
        }}
        validate={(values) => {
          const errors = {};
          const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/
          if (!values.displayName) {
            errors.displayName = "Введите имя";
          }
          if (!values.password) {
            errors.password = "Введите пароль";
          } else if (values.password.match(reg) === null) {
            errors.password = "Пароль должен содержать цифру, буквы в нижнем и верхнем регистре и иметь длину не менее 8 знаков"
          }
          if (values.confirmPassword !== values.password) {
            errors.confirmPassword = "Пароль не совпадает";
          }
          return errors;
        }}
        initialValues={{
          ...formData
        }}
        render={({handleSubmit, values}) => (
          <FormWrapper onSubmit={handleSubmit}>
            <Field
              name='imageUrl'
              type='file'
            >
              {({input, meta}) => (
                <FormGroup className="mb-3">
                  <Label className='d-block ms-2'>Аватар:</Label>
                  <img className='rounded-circle me-3 mt-3' src={!values.imageUrl ? photoURL : values.imageUrl}
                       alt="Аватар"/>
                  <Input {...input} onChange={(e) => {
                    values.imageUrl = e.target.files[0].name
                  }}/>
                  {meta.touched && meta.error && <FormFeedback>{meta.error}</FormFeedback>}
                </FormGroup>
              )}
            </Field>
            <Field
              name='displayName'
              type='text'
            >
              {({input, meta}) => (
                <GroupInput input={input} meta={meta} nameInput='Имя'/>
              )}
            </Field>
            <Field
              name='password'
              type='password'
            >
              {({input, meta}) => (
                <GroupInput input={input} meta={meta} nameInput='Пароль'/>
              )}
            </Field>
            <FormGroup className="mb-2">
              <Field
                name='confirmPassword'
                type='password'
              >
                {({input, meta}) => (
                  <GroupInput input={input} meta={meta} nameInput='Подтверждение пароля'/>
                )}
              </Field>
            </FormGroup>
            <Button className='mt-2' type='submit'>Сохранить</Button>
          </FormWrapper>
        )}
      />
    </Modal>
  );
};

export default EdditingModal;
