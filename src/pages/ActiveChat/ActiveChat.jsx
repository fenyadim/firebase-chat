import React from 'react';
import { ChatLayout } from "../../components";
import { DialogCard } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_ALL_DIALOGS } from "../../redux/slices/dialogsSlice";
import { Link } from "react-router-dom";

const ActiveChat = () => {
  const dialogs = useSelector(state => state.dialogs)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(FETCH_ALL_DIALOGS())
  }, [])

  return (
    <ChatLayout>
      <h1>ActiveChat</h1>
      {dialogs && Object.keys(dialogs).map((item, index) => (
        <Link key={index} to={`/dialog?id=${item}`}><DialogCard topic={dialogs[item].topic}/></Link>
      ))}
    </ChatLayout>
  );
};

export default ActiveChat;
