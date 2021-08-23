import React from 'react';
import { ChatLayout } from "../../components";
import { useSelector } from "react-redux";
import { DialogCard } from "../index";

const SavedChat = () => {
  const state = useSelector(state => state.dialogs)
  const dialogs = state?.dialogs

  return (
    <ChatLayout>
      <h1>SavedChat</h1>
      {dialogs && Array.isArray(dialogs) && dialogs.map((item, index) => (
        item.isSaved ? <DialogCard key={index} topic={item.topic} dialogId={item.dialogId} isSaved={item.isSaved}/> : ''
      ))}
    </ChatLayout>
  );
};

export default SavedChat;
