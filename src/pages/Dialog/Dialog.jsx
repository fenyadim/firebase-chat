import React from 'react';
import { Button, Container, Form, Input, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { CREATE_MESSAGE, FETCH_ALL_MESSAGE } from "../../redux/slices/dialogsSlice";

const Dialog = () => {
  const {messages} = useSelector(state => state.dialogs)
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      message: ''
    },
    onSubmit: values => {
      dispatch(CREATE_MESSAGE(values.message))
    }
  })

  React.useEffect(() => {
    dispatch(FETCH_ALL_MESSAGE())
  }, [dispatch])

  return (
    <Container>
      <Row style={{height: 300}}>
        {messages && (typeof messages === 'object' ? Object.keys(messages).map(key => (
          <p>{messages[key].content}</p>
        )) : <p>{messages.content}</p>)}
      </Row>
      <Row>
        <Form onSubmit={formik.handleSubmit}>
          <Input type='text' name='message' onChange={formik.handleChange} value={formik.values.message}/>
          <Button type='submit'>Отправить</Button>
        </Form>
      </Row>
    </Container>
  );
};

export default Dialog;
