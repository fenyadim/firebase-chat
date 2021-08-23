import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SWITCH_STATUS } from "../../redux/slices/dialogsSlice";

const DialogCard = ({topic, dialogId, isSaved}) => {
  const dispatch = useDispatch()

  return (
    <div className='border-dark border p-3 mb-2'>
      <h3>{topic}</h3>
      <Link to={`/dialog?id=${dialogId}`}>
        <button>Продожить</button>
      </Link>
      <button onClick={() => dispatch(SWITCH_STATUS(dialogId))}>{!isSaved ? 'Сохранить' : 'Удалить'}</button>
    </div>
  );
};

export default DialogCard;
