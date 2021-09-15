import React from 'react';
import moment from "moment";
import { Button, Form, Input, Row } from "reactstrap";
import Picker from "emoji-picker-react";
import { useFormik } from "formik";
import { usePubNub } from "pubnub-react";
import { useDispatch, useSelector } from "react-redux";
import { DialogsLayout, Loader } from "./index";
import { CREATE_MESSAGE } from "../redux/slices/dialogsSlice";

const ChatWrapper = ({isLoading, messages, status, idRef}) => {
  const {data: user} = useSelector(state => state.users)
  const [isTyping, setIsTyping] = React.useState(false)
  const pubnub = usePubNub()
  const [toggleEmojiMenu, setToggleEmojiMenu] = React.useState(false)
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      message: ''
    },
    onSubmit: (values, {resetForm}) => {
      dispatch(CREATE_MESSAGE({content: values.message, id: idRef}))
      resetForm({message: ''})
    }
  })
  const onEmojiClick = (event, emojiObject) => {
    formik.handleChange(formik.values.message + emojiObject.emoji)
  };
  const toggleEmoji = () => {
    setToggleEmojiMenu(prevState => !prevState)
  }


  React.useEffect(() => {
    const input = document.querySelector('#message')
    const typingChannel = 'is-typing'
    pubnub.subscribe({channels: [typingChannel]})
    const handleChange = () => {
      if (input.value.length === 0) {
        pubnub.signal({
          message: {
            type: 'typing_off',
            id: user.displayName
          },
          channel: typingChannel
        })
      } else {
        pubnub.signal({
          message: {
            type: 'typing_on',
            id: user.displayName
          },
          channel: typingChannel
        })
      }
    }
    const fetchSignal = {
      signal: function (s) {
        if (s.message.type === 'typing_on') {
          setIsTyping(true)
        } else {
          setIsTyping(false)
        }
      }
    }
    input?.addEventListener('keyup', handleChange)
    pubnub.addListener(fetchSignal)
    return () => {
      input?.removeEventListener('keyup', handleChange)
      pubnub.removeListener(fetchSignal)
    }
  }, [pubnub])

  console.log(isTyping)

  return (
    <DialogsLayout>
      <div className='border p-3 rounded position-relative vh-75 d-flex flex-column justify-content-between'>
        <div className='overflow-auto border w-100 d-block mb-3 p-3 rounded h-100' id='chat'>
          {!isLoading ? (messages ? messages.map((item, index) => (
            <div className='ms-auto border rounded p-2 mb-3 w-50' key={index}>
              <p key={index}>{item.content}</p>
              <span className='text-secondary'
                    style={{fontSize: 11}}>{moment(item.timestamp, 'D MMM YY, HH:mm').fromNow()}</span>
            </div>
          )) : <p>Сообщений нет</p>) : <Loader/>}
          {isTyping ? <p>{user.displayName} печатает...</p> : ''}
        </div>
        <Row>
          {status && status !== 'completed' ?
            <Form onSubmit={formik.handleSubmit}>
              {toggleEmojiMenu && <div className='position-absolute ms-3 start-0' style={{bottom: '16%'}}><Picker
                onEmojiClick={onEmojiClick}/></div>}
              <Input id='message' className='mb-3' type='text' name='message' onChange={formik.handleChange}
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

export default ChatWrapper;
