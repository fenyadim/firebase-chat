import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";

import { Layout } from "../index";
import { SIGN_OUT } from "../../redux/slices/dataSlice";

import styles from './ChatLayout.module.scss'

const ChatLayout = ({children}) => {
  const {data} = useSelector(state => state.users)
  const {email} = data
  const dispatch = useDispatch()

  return (
    <Container>
      <Row className='vh-100'>
        <Col className='col-3 d-flex flex-column'>
          <Link to='/active-chat'>
            <a>Активные</a>
          </Link>
          <Link to='/completed-chat'>
            <a>Завершенные</a>
          </Link>
          <Link to='/saved-chat'>
            <a>Сохраненные</a>
          </Link>
        </Col>
        <Col>
          <div className={styles.header}>
            <h3>{email}</h3>
            <button onClick={() => dispatch(SIGN_OUT())}>Выход</button>
          </div>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default ChatLayout;
