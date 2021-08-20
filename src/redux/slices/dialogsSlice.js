import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {}


export const CREATE_MESSAGE = createAction('dialogs/CREATE_MESSAGE')
export const FETCH_ALL_MESSAGE = createAction('dialogs/FETCH_ALL_MESSAGE')
export const FETCH_ALL_DIALOGS = createAction('dialogs/FETCH_ALL_DIALOGS')


const dialogsSlice = createSlice({
  name: 'dialogs',
  initialState,
  reducers: {
    CREATE_MESSAGE_SUCCESS: (state, action) => {

    },
    FETCH_MESSAGE_SUCCESS: (state, {payload}) => {
      // state.status = payload.status
      // state.operatorId = payload.operatorId
      const {data, idDialog} = payload

      // console.log(payload)
    },
    FETCH_ALL_DIALOGS_SUCCESS: (state, {payload}) => {
      const {topic, clientId, operatorId, status, messages} = payload.data
      const {id: dialogId} = payload
      return {
        ...state,
        [dialogId]: {topic, clientId, operatorId, status, messages}
      }
    }
  }
})

export const {FETCH_MESSAGE_SUCCESS, FETCH_ALL_DIALOGS_SUCCESS} = dialogsSlice.actions

export default dialogsSlice.reducer