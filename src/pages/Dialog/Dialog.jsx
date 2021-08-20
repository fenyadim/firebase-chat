import React from 'react';
import { Button, Container, Form, Input, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";

import { CREATE_MESSAGE, FETCH_ALL_MESSAGE } from "../../redux/slices/dialogsSlice";
import { ChatLayout } from "../../components";
import { useQuery } from "../../hooks";


const Dialog = () => {
  const state = useSelector(state => state.dialogs)
  const dispatch = useDispatch()
  const query = useQuery()
  const ref = query.get('id')
  const currentElem = state[ref].messages

  const formik = useFormik({
    initialValues: {
      message: ''
    },
    onSubmit: values => {
      dispatch(CREATE_MESSAGE({content: values.message, id: ref}))
    }
  })

  React.useEffect(() => {
    dispatch(FETCH_ALL_MESSAGE(ref))
  }, [])


  return (
    <ChatLayout>
      <Container>
        <Row className='overflow-auto' style={{height: 300}}>
          {Object.keys(currentElem).map(idDialog => (
            <p>{currentElem[idDialog].content}</p>
          ))}
        </Row>
        <Row>
          <Form onSubmit={formik.handleSubmit}>
            <Input type='text' name='message' onChange={formik.handleChange} value={formik.values.message}/>
            <Button type='submit'>Отправить</Button>
          </Form>
        </Row>
      </Container>
    </ChatLayout>
  );
};

export default Dialog;
