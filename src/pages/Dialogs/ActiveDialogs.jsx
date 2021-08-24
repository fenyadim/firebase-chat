import React from 'react';
import { ChatLayout } from "../../components";
import { ChatCard } from "../index";
import { useSelector } from "react-redux";

const ActiveDialogs = () => {
  const state = useSelector(state => state.dialogs)
  const dialogs = state?.dialogs

  return (
    <ChatLayout>
      <h1>ActiveChat</h1>
      {dialogs && Array.isArray(dialogs) && dialogs.map((item, index) => (
        <ChatCard key={index} topic={item.topic} dialogId={item.dialogId} lastTime={item.lastTime}/>
      ))}
    </ChatLayout>
  );
};

export default ActiveDialogs;
