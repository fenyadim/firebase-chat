import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdversal } from "@fortawesome/free-brands-svg-icons";
import { useDispatch } from "react-redux";

import { SIGN_OUT } from "../../redux/slices/dataSlice";

const Chat = () => {
  const dispatch = useDispatch()

  return (
    <div>
      <h1>Chat</h1>
      <FontAwesomeIcon icon={faAdversal} size='10x'/>
      <button onClick={() => dispatch(SIGN_OUT())}>Выход</button>
    </div>
  );
};

export default Chat;
