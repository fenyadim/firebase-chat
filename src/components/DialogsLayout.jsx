import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Form, Input, Label, Row } from "reactstrap";
import Modal from 'react-modal'
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";

import { SIGN_OUT } from "../redux/slices/dataSlice";
import { SEARCH_DATA } from "../redux/slices/dialogsSlice";
import { useFormik } from "formik";

const DialogsLayout = ({children}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const {data} = useSelector(state => state.users)
  const {email} = data
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
      confirmPassword: ''
    },
    onSubmit: values => {

    }
  })

  const changeHandler = (e) => {
    dispatch(SEARCH_DATA(e.target.value))
  }

  const debouncedChangeHandler = React.useCallback(
    debounce(changeHandler, 250)
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
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <Container>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <h1>Обновить профиль</h1>
        <Form>
          <Label for='name'>Имя:</Label>
          <Input id='name' type='text' name='name' onChange={formik.handleChange} value={formik.values.name}/>
          <Label for='password'>Пароль:</Label>
          <Input id='password' type='password' name='password' onChange={formik.handleChange}
                 value={formik.values.password}/>
          <Label for='confirmPassword'>Подтверждение пароля:</Label>
          <Input id='confirmPassword' type='password' name='confirmPassword' onChange={formik.handleChange}
                 value={formik.values.confirmPassword}/>
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
            <button onClick={() => openModal()}>Редактировать профиль</button>
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
