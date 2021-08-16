import React from 'react';
import { toast, ToastContainer } from "react-toastify";

import { ChatLayout } from "../../components";

const Chat = () => {
  const notify = () => toast('Hello, World!')

  return (
    <ChatLayout>
      <h1>Chat</h1>
      <button onClick={notify}>Notify!</button>
      <ToastContainer />
    </ChatLayout>
  );
};

export default Chat;
