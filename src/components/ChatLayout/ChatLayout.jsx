import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { SIGN_OUT } from "../../redux/slices/dataSlice";

import styles from './ChatLayout.module.scss'

const ChatLayout = ({children}) => {
  const {data} = useSelector(state => state.users)
  const {email} = data
  const dispatch = useDispatch()

  return (
    <div className={styles.chatWrapper}>
      <div className={styles.tabs}>
        <Link to='/active-chat'>
          <a>Активные</a>
        </Link>
        <Link to='/completed-chat'>
          <a>Завершенные</a>
        </Link>
        <Link to='/saved-chat'>
          <a>Сохраненные</a>
        </Link>
      </div>
      <div className={styles.mainScreen}>
        <div className={styles.header}>
          <h3>{email}</h3>
          <button onClick={() => dispatch(SIGN_OUT())}>Выход</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ChatLayout;
