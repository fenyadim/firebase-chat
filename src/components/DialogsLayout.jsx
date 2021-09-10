import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
import Modal from 'react-modal'
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup'
import debounce from "lodash.debounce";

import { SIGN_OUT, UPDATE_USER } from "../redux/slices/dataSlice";
import { SEARCH_DATA } from "../redux/slices/dialogsSlice";

//TODO: Поправить здесь!!!

const schema = Yup.object().shape({
  displayName: Yup.string()
    .required('Введите имя'),
  password: Yup.string()
    .required('Введите пароль')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      "Пароль должен содержать цифру, буквы в нижнем и верхнем регистре и иметь длину не менее 8 знаков"
    ),
  confirmPassword: Yup.string()
    .test('passwords-match', 'Пароль не совпадает', function (value) {
      return this.parent.password === value
    })
})

const initialState = {
  displayName: false,
  password: false,
  confirmPassword: false
}

const reducerState = (state, action) => {
  switch (action.type) {
    case 'invalid_displayName':
      return {
        ...state,
        displayName: action.payload
      };
    case 'invalid_password':
      return {
        ...state,
        password: action.payload
      };
    case 'invalid_confirmPassword':
      return {
        ...state,
        confirmPassword: action.payload
      }
    default:
      throw new Error()
  }
}

const DialogsLayout = ({children}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [invalid, dispatchState] = React.useReducer(reducerState, initialState)
  const {data} = useSelector(state => state.users)
  const {email} = data
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      displayName: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(UPDATE_USER({displayName: values.name, email, password: values.password}))
    }
  })

  const changeHandler = (e) => {
    dispatch(SEARCH_DATA(e.target.value))
  }

  const debouncedChangeHandler = React.useCallback(
    debounce(changeHandler, 250), []
  )

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

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

  React.useEffect(() => {
    const validityCheck = (elem, type) => {
      if (elem) {
        dispatchState({type, payload: true})
      } else {
        dispatchState({type, payload: false})
      }
    }
    validityCheck(formik.errors.displayName, 'invalid_displayName')
    validityCheck(formik.errors.password, 'invalid_password')
    validityCheck(formik.errors.confirmPassword, 'invalid_confirmPassword')
  }, [formik.touched && formik.errors])

  return (
    <Container>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <h1>Обновить профиль</h1>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <Label for='displayName'>Имя:</Label>
            <Input id='displayName' type='text' name='displayName' onChange={formik.handleChange}
                   value={formik.values.displayName} invalid={invalid.displayName}/>
            {formik.touched.displayName && formik.errors.displayName &&
            <FormFeedback>{formik.errors.displayName}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for='password'>Пароль:</Label>
            <Input id='password' type='password' name='password' onChange={formik.handleChange}
                   value={formik.values.password} invalid={invalid.password}/>
            {formik.touched.password && formik.errors.password &&
            <FormFeedback>{formik.errors.password}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for='confirmPassword'>Подтверждение пароля:</Label>
            <Input id='confirmPassword' type='password' name='confirmPassword' onChange={formik.handleChange}
                   value={formik.values.confirmPassword} invalid={invalid.confirmPassword}/>
            {formik.touched.confirmPassword && formik.errors.confirmPassword &&
            <FormFeedback>{formik.errors.confirmPassword}</FormFeedback>}
          </FormGroup>
          <Button type='submit'>Сохранить</Button>
        </Form>
      </Modal>
      <Row className='vh-100'>
        <Col className='col-3 d-flex flex-column'>
          <Link to='/active-dialogs'>
            <a>Активные</a>
          </Link>
          <Link to='/queue-dialogs'>
            <a>В очереди</a>
          </Link>
          <Link to='/completed-dialogs'>
            <a>Завершенные</a>
          </Link>
          <Link to='/saved-dialogs'>
            <a>Сохраненные</a>
          </Link>
        </Col>
        <Col>
          <div className='d-flex justify-content-end'>
            <h3 className='me-3'>{email}</h3>
            <button onClick={openModal}>Редактировать профиль</button>
            <button onClick={() => dispatch(SIGN_OUT())}>Выход</button>
          </div>
          <Input type='search' name='Поиск' placeholder='Поиск' onChange={debouncedChangeHandler}/>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default DialogsLayout;
