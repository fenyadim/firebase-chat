import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Input, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import debounce from "lodash.debounce";

import { SIGN_OUT } from "../redux/slices/usersSlice";
import { SEARCH_DATA } from "../redux/slices/dialogsSlice";
import { DialogsSettings, EditProfile } from "./index";

//TODO: Поправить здесь!!!

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '650px',
    maxHeight: '640px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const DialogsLayout = ({children}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState('1')
  const {data: user} = useSelector(state => state.users)
  const {email, displayName} = user
  const dispatch = useDispatch()

  const toggleTabs = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }

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
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={modalStyle}
        contentLabel='Обновить профиль'
      >
        <h2 className='mb-4'>Редактирование профиля</h2>
        <Nav tabs>
          <NavItem>
            <NavLink className={`cursor-pointer ${activeTab === '1' ? 'active' : ''}`}
                     onClick={() => {
                       toggleTabs('1')
                     }}>
              Обновление профиля
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={`cursor-pointer ${activeTab === '2' ? 'active' : ''}`}
                     onClick={() => {
                       toggleTabs('2')
                     }}>
              Настройки диалогов
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId='1'>
            <EditProfile user={user}/>
          </TabPane>
          <TabPane tabId='2' className='overflow-auto'>
            <DialogsSettings/>
          </TabPane>
        </TabContent>
      </Modal>
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
