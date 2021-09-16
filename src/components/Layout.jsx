import React from "react";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { Container } from "reactstrap";

const Layout = ({children}) => {
  const {status} = useSelector(state => state.users)

  return (
    <>
      <Container className='vh-100' fluid='xl'>
        {children}
      </Container>
      {(status === 'success' || status === 'error') && <ToastContainer/>}
    </>
  )
}

export default Layout