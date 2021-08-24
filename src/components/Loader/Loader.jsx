import React from 'react';
import { Row, Spinner } from "reactstrap";

const Loader = () => {
  return (
    <Row className='d-flex align-items-center justify-content-center h-100'>
      <Spinner color='primary'
               style={{width: '3rem', height: '3rem'}}/>
    </Row>
  );
};

export default Loader;
