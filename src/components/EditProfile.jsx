import React from 'react';
import { Field, Form } from 'react-final-form'
import { useDispatch } from "react-redux";
import { Button, Form as FormWrapper, FormFeedback, FormGroup, Input, Label } from "reactstrap";

import { UPDATE_USER } from "../redux/slices/usersSlice";

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

const EditProfile = ({user}) => {
  const {displayName: name, email, photoURL, uid} = user
  const [uploadUrlImage, setUploadUrlImage] = React.useState(photoURL)
  const dispatch = useDispatch()
  let formData = {
    imageUrl: '',
    displayName: name && name,
    password: '',
    confirmPassword: ''
  }

  const handleChange = (target, onChange) => {
    const files = target.files[0]
    const reader = new FileReader()
    reader.onloadend = function (e) {
      setUploadUrlImage(e.target.result)
    }
    reader.readAsDataURL(files)
    onChange(target.files)
  }

  return (
    <Form
      onSubmit={(values) => {
        const imageUrl = values.imageUrl[0]
        dispatch(UPDATE_USER({
          displayName: values.displayName,
          email,
          password: values.password,
          uid,
          imageUrl
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
      render={({handleSubmit}) => (
        <FormWrapper onSubmit={handleSubmit}>
          <Field
            name='imageUrl'
            type='file'
          >
            {({input: {value, onChange, ...input}, meta}) => (
              <FormGroup className="mb-3">
                <Label className='d-block ms-2'>Аватар:</Label>
                <img className='rounded-circle me-3 mt-3 center-cropped'
                     src={!uploadUrlImage ? '/images/no-avatar.png' : uploadUrlImage}
                     alt="Аватар"/>
                <Input {...input} onChange={({target}) => handleChange(target, onChange)}/>
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
  );
};

export default EditProfile;