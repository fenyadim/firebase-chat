import React from 'react';

import { ChatLayout } from "../../components";
import { Dialog } from "../index";

const Chat = () => {
  React.useEffect(() => {
    const data = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).users)
  }, [])

  return (
    <ChatLayout>
      <h1>Chat</h1>
      <Dialog />
    </ChatLayout>
  );
};

export default Chat;
