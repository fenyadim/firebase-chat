import React from "react";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

import styles from './Layout.module.scss'

const Layout = ({children}) => {
  const {status} = useSelector(state => state.users)

  return (
    <div className={styles.layout}>
      {children}
      {status === 'success' && <ToastContainer/>}
    </div>
  )
}

export default Layout