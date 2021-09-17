import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Input, Row } from "reactstrap";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";

import { SIGN_OUT } from "../redux/slices/dataSlice";
import { SEARCH_DATA } from "../redux/slices/dialogsSlice";
import EdditingModal from "./EdittigModal";

//TODO: Поправить здесь!!!

const DialogsLayout = ({children}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const {data: user} = useSelector(state => state.users)
  const {email, displayName, photoURL} = user
  const dispatch = useDispatch()

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

  return (
    <Container>
      <EdditingModal isOpen={isOpen} closeModal={closeModal} user={user}/>
      <Row className='vh-100'>
        <Col className='col-3 d-flex flex-column'>
          <Link to='/active-dialogs'>
            Активные
          </Link>
          <Link to='/queue-dialogs'>
            В очереди
          </Link>
          <Link to='/completed-dialogs'>
            Завершенные
          </Link>
          <Link to='/saved-dialogs'>
            Сохраненные
          </Link>
        </Col>
        <Col>
          <div className='d-flex justify-content-end'>
            <h3 className='me-3'>{email} {displayName}</h3>
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
