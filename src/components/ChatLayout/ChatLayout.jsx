import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Input, Row } from "reactstrap";
import debounce from "lodash.debounce";

import { SIGN_OUT } from "../../redux/slices/dataSlice";
import { FETCH_ALL_DIALOGS, SEARCH_DATA } from "../../redux/slices/dialogsSlice";

const ChatLayout = ({children}) => {
  const {data} = useSelector(state => state.users)
  const {email} = data
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(FETCH_ALL_DIALOGS())
  }, [dispatch])

  const changeHandler = (e) => {
    dispatch(SEARCH_DATA(e.target.value))
  }

  const debouncedChangeHandler = React.useCallback(
    debounce(changeHandler, 250)
  )

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
          <div className='d-flex justify-content-end'>
            <h3 className='me-3'>{email}</h3>
            <button onClick={() => dispatch(SIGN_OUT())}>Выход</button>
          </div>
          <Input type='search' name='Поиск' placeholder='Поиск' onChange={debouncedChangeHandler}/>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default ChatLayout;
