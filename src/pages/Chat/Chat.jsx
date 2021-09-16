import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import PubNub from 'pubnub'
import { PubNubProvider } from "pubnub-react";

import { FETCH_ALL_MESSAGE, FETCH_CURRENT_DIALOG } from "../../redux/slices/dialogsSlice";
import { ChatWrapper } from "../../components";
import { useQuery } from "../../hooks";

const Chat = () => {
  const state = useSelector(state => state.dialogs)
  const messages = state?.currentDialogMessages?.messages
  const isLoading = state?.currentDialogMessages?.isLoading
  const status = state?.currentDialogMessages?.dialog?.status
  const dispatch = useDispatch()
  const query = useQuery()
  const ref = query.get('id')
  const uuid = PubNub.generateUUID()
  const pubnub = new PubNub({
    publishKey: "pub-c-6689343e-e888-4c7b-82c5-4b0fdb937fa4",
    subscribeKey: "sub-c-d9ad422e-15b9-11ec-9d3c-1ae560ca2970",
    uuid: uuid
  })

  React.useEffect(() => {
    dispatch(FETCH_ALL_MESSAGE(ref))
    dispatch(FETCH_CURRENT_DIALOG(ref))
  }, [dispatch, ref])

  return (
    <PubNubProvider client={pubnub}>
      <ChatWrapper isLoading={isLoading} messages={messages} status={status} idRef={ref}/>
    </PubNubProvider>
  );
};

export default Chat;
