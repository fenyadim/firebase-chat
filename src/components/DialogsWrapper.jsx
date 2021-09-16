import React from 'react';
import { useDispatch, useSelector } from "react-redux";

import { ChatCard, DialogsLayout, Loader } from "./index";
import { FETCH_ALL_DIALOGS } from "../redux/slices/dialogsSlice";

// TODO: Подключить бесконечный скролл!!!
// TODO: Сделать поиск!

const DialogsWrapper = ({name, status, type}) => {
  const state = useSelector(state => state.dialogs)
  const dispatch = useDispatch()
  const dialogs = state?.dialogs
  const isLoading = state?.isLoading

  React.useEffect(() => {
    dispatch(FETCH_ALL_DIALOGS(status))
  }, [dispatch, status])

  return (
    <DialogsLayout>
      <h1>{name}</h1>
      {!isLoading ? (
        <>
          {status === 'queue' && <h3>{`Клиентов в очереди: ${dialogs ? dialogs.length : 0}`}</h3>}
          {dialogs && Array.isArray(dialogs) && dialogs.map((item, index) =>
            type !== 'saved' ? (
              <ChatCard key={index}
                        topic={item.topic}
                        status={item.status}
                        dialogId={item.dialogId}
                        lastTime={item.lastTime}
                        isSaved={item.isSaved}/>
            ) : item.isSaved ? (
              <ChatCard key={index}
                        topic={item.topic}
                        status={item.status}
                        dialogId={item.dialogId}
                        lastTime={item.lastTime}
                        isSaved={item.isSaved}/>
            ) : '')}
        </>
      ) : (<Loader/>)}
    </DialogsLayout>
  );
};

export default DialogsWrapper;
