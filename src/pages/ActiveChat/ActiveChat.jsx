import React from 'react';
import { ChatLayout } from "../../components";
import { DialogCard } from "../index";
import { useSelector } from "react-redux";

const ActiveChat = () => {
  const state = useSelector(state => state.dialogs)
  const dialogs = state?.dialogs

  return (
    <ChatLayout>
      <h1>ActiveChat</h1>
      {dialogs && Array.isArray(dialogs) && dialogs.map((item, index) => (
        <DialogCard key={index} topic={item.topic} dialogId={item.dialogId}/>
      ))}
    </ChatLayout>
  );
};

export default ActiveChat;
