import React from 'react';
import { Button, Form, Input } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";

import { CREATE_MESSAGE, FETCH_ALL_MESSAGE } from "../../redux/slices/dialogsSlice";
import { DialogsLayout, Loader } from "../../components";
import { useQuery } from "../../hooks";
import moment from "moment";


const Chat = () => {
  const state = useSelector(state => state.dialogs)
  const messages = state?.currentDialogMessages?.messages
  const isLoading = state?.currentDialogMessages?.isLoading
  const dispatch = useDispatch()
  const query = useQuery()
  const ref = query.get('id')

  const formik = useFormik({
    initialValues: {
      message: ''
    },
    onSubmit: (values, {resetForm}) => {
      dispatch(CREATE_MESSAGE({content: values.message, id: ref}))
      resetForm({message: ''})
    }
  })

  React.useEffect(() => {
    dispatch(FETCH_ALL_MESSAGE(ref))
  }, [dispatch])

  return (
    <DialogsLayout>
      <div className='border p-3 rounded'>
        <div className='overflow-auto border w-100 d-block mb-3 p-3 rounded' style={{height: 300}}>
          {!isLoading ? (messages ? messages.map((item, index) => (
            <div className='ms-auto border rounded p-2 mb-3 w-50' key={index}>
              <p key={index}>{item.content}</p>
              <span className='text-secondary'
                    style={{fontSize: 11}}>{moment(item.timestamp, 'D MMM YY, HH:mm').fromNow()}</span>
            </div>
          )) : <p>Сообщений нет</p>) : <Loader/>}
        </div>
        <div>
          <Form onSubmit={formik.handleSubmit}>
            <Input className='mb-3' type='text' name='message' onChange={formik.handleChange}
                   value={formik.values.message} placeholder='Введите сообщение'/>
            <Button type='submit'>Отправить</Button>
          </Form>
        </div>
      </div>
    </DialogsLayout>
  );
};

export default Chat;
