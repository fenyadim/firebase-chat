import React from 'react';
import { Button, Form, Input, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import Picker from 'emoji-picker-react'

import { CREATE_MESSAGE, FETCH_ALL_MESSAGE, FETCH_CURRENT_DIALOG } from "../../redux/slices/dialogsSlice";
import { DialogsLayout, Loader } from "../../components";
import { useQuery } from "../../hooks";
import moment from "moment";


const Chat = () => {
  const state = useSelector(state => state.dialogs)
  const messages = state?.currentDialogMessages?.messages
  const isLoading = state?.currentDialogMessages?.isLoading
  const status = state?.currentDialogMessages?.dialog?.status
  const dispatch = useDispatch()
  const query = useQuery()
  const ref = query.get('id')
  const [toggleEmojiMenu, setToggleEmojiMenu] = React.useState(false)

  const formik = useFormik({
    initialValues: {
      message: ''
    },
    onSubmit: (values, {resetForm}) => {
      dispatch(CREATE_MESSAGE({content: values.message, id: ref}))
      resetForm({message: ''})
    }
  })

  const onEmojiClick = (event, emojiObject) => {
    formik.values.message = formik.values.message + emojiObject.emoji
    console.log(formik.values.message)
  };

  const toggleEmoji = () => {
    setToggleEmojiMenu(prevState => !prevState)
  }

  React.useEffect(() => {
    dispatch(FETCH_ALL_MESSAGE(ref))
    dispatch(FETCH_CURRENT_DIALOG(ref))
  }, [dispatch])

  return (
    <DialogsLayout>
      <div className='border p-3 rounded position-relative vh-75 d-flex flex-column justify-content-between'>
        <div className='overflow-auto border w-100 d-block mb-3 p-3 rounded h-100'>
          {!isLoading ? (messages ? messages.map((item, index) => (
            <div className='ms-auto border rounded p-2 mb-3 w-50' key={index}>
              <p key={index}>{item.content}</p>
              <span className='text-secondary'
                    style={{fontSize: 11}}>{moment(item.timestamp, 'D MMM YY, HH:mm').fromNow()}</span>
            </div>
          )) : <p>Сообщений нет</p>) : <Loader/>}
        </div>
        <Row>
          {status && status !== 'completed' ?
            <Form onSubmit={formik.handleSubmit}>
              {toggleEmojiMenu && <div className='position-absolute ms-3 start-0' style={{bottom: '16%'}}><Picker
                onEmojiClick={onEmojiClick}/></div>}
              <Input className='mb-3' type='text' name='message' onChange={formik.handleChange}
                     value={formik.values.message} placeholder='Введите сообщение'/>
              <Button color='primary' type='submit'>Отправить</Button>
              <Button color="link" onClick={toggleEmoji}><i className="far fa-smile"/></Button>
            </Form> :
            <h5 className='text-center'>Диалог завершен</h5>
          }
        </Row>
      </div>
    </DialogsLayout>
  );
};

export default Chat;
