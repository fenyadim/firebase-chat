import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: null,
  operatorId: null,
  clienId: null,
  messages: []
}

export const CREATE_MESSAGE = createAction('dialogs/CREATE_MESSAGE')
export const FETCH_ALL_MESSAGE = createAction('dialogs/FETCH_ALL_MESSAGE')

const dialogsSlice = createSlice({
  name: 'dialogs',
  initialState,
  reducers: {
    CREATE_MESSAGE_SUCCESS: (state, action) => {

    },
    FETCH_ALL_MESSAGE_SUCCESS: (state, {payload}) => {
      state.status = payload.status
      state.operatorId = payload.operatorId
      state.messages = payload.messages
    }
  }
})

export const {FETCH_ALL_MESSAGE_SUCCESS} = dialogsSlice.actions

export default dialogsSlice.reducer