import React from 'react';
import { ChatLayout } from "../../components";
import { useSelector } from "react-redux";
import { ChatCard } from "../index";

const SavedDialogs = () => {
  const state = useSelector(state => state.dialogs)
  const dialogs = state?.dialogs

  return (
    <ChatLayout>
      <h1>SavedChat</h1>
      {dialogs && Array.isArray(dialogs) && dialogs.map((item, index) => (
        item.isSaved ? <ChatCard key={index} topic={item.topic} dialogId={item.dialogId} isSaved={item.isSaved}/> : ''
      ))}
    </ChatLayout>
  );
};

export default SavedDialogs;
