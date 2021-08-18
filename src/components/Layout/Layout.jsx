import React from "react";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { Col, Container } from "reactstrap";

const Layout = ({children}) => {
  const {status} = useSelector(state => state.users)

  return (
    <Container>
      <Col className='vh-100 d-flex justify-content-center align-items-center'>
        {children}
        {status === 'success' && <ToastContainer/>}
      </Col>
    </Container>
  )
}

export default Layout