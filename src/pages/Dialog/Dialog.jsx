import React from 'react';
import { Button, Form, Input } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";

import { CREATE_MESSAGE, FETCH_ALL_MESSAGE } from "../../redux/slices/dialogsSlice";
import { ChatLayout } from "../../components";
import { useQuery } from "../../hooks";


const Dialog = () => {
  const state = useSelector(state => state.dialogs)
  const messages = state?.currentDialogMessages?.messages
  const dispatch = useDispatch()
  const query = useQuery()
  const ref = query.get('id')

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
  }, [dispatch])

  return (
    <ChatLayout>
      <div className='border p-3 rounded'>
        <div className='overflow-auto border w-100 d-block mb-3 p-3 rounded' style={{height: 300}}>
          {messages && messages.map((item, index) => (
            <p key={index}>{item.content}</p>
          ))}
        </div>
        <div>
          <Form onSubmit={formik.handleSubmit}>
            <Input className='mb-3' type='text' name='message' onChange={formik.handleChange}
                   value={formik.values.message} placeholder='Введите сообщение'/>
            <Button type='submit'>Отправить</Button>
          </Form>
        </div>
      </div>
    </ChatLayout>
  );
};

export default Dialog;
