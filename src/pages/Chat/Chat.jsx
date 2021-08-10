import React from 'react';
import { useDispatch } from "react-redux";

import { SIGN_OUT } from "../../redux/slices/dataSlice";

const Chat = () => {
  const dispatch = useDispatch()

  return (
    <div>
      <h1>Chat</h1>
      <button onClick={() => dispatch(SIGN_OUT())}>Выход</button>
    </div>
  );
};

export default Chat;
