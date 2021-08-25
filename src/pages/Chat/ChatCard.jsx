import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_DIALOG, SWITCH_STATUS } from "../../redux/slices/dialogsSlice";
import moment from "moment";

const ChatCard = ({topic, dialogId, isSaved, lastTime, status}) => {
  const {data: user} = useSelector(state => state.users)
  const dispatch = useDispatch()
  const diffTime = moment(lastTime, 'D MMM YY, HH:mm').fromNow()

  return (
    <div className='border-dark border p-3 mb-2'>
      <h3>{topic}</h3>
      <span>{lastTime ? diffTime : 'Новый'}</span>
      {status !== 'completed' ?
        <Link to={`/chat?id=${dialogId}`}>
          <button onClick={() => dispatch(SWITCH_STATUS({
            dialogId,
            status: 'active',
            operatorId: user.uid
          }))}>{lastTime ? 'Продолжить' : 'Войти в диалог'}</button>
        </Link> : ''}
      <button
        onClick={() => dispatch(SAVE_DIALOG(dialogId))}>{!isSaved ? 'Сохранить' : 'Удалить из сохраненных'}</button>
    </div>
  );
};

export default ChatCard;
