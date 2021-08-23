import React from 'react';
import { ChatLayout } from "../../components";
import { DialogCard } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_ALL_DIALOGS } from "../../redux/slices/dialogsSlice";

const ActiveChat = () => {
  const state = useSelector(state => state.dialogs)
  const dialogs = state?.dialogs

  return (
    <ChatLayout>
      <h1>ActiveChat</h1>
      {dialogs && Array.isArray(dialogs) && dialogs.map((item, index) => (
        <DialogCard key={index} topic={item.topic} dialogId={item.dialogId} />
      ))}
    </ChatLayout>
  );
};

export default ActiveChat;
