import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SWITCH_STATUS } from "../../redux/slices/dialogsSlice";
import moment from "moment";

const ChatCard = ({topic, dialogId, isSaved, lastTime}) => {
  const dispatch = useDispatch()

  const diffTime = moment(lastTime, 'D MMM YY, HH:mm').fromNow()

  return (
    <div className='border-dark border p-3 mb-2'>
      <h3>{topic}</h3>
      <span>{diffTime}</span>
      <Link to={`/dialog?id=${dialogId}`}>
        <button>Продожить</button>
      </Link>
      <button onClick={() => dispatch(SWITCH_STATUS(dialogId))}>{!isSaved ? 'Сохранить' : 'Удалить'}</button>
    </div>
  );
};

export default ChatCard;
