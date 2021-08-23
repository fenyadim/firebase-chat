import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  dialogs: [],
  currentDialogMessages: {}
}


export const CREATE_MESSAGE = createAction('dialogs/CREATE_MESSAGE')
export const FETCH_ALL_MESSAGE = createAction('dialogs/FETCH_ALL_MESSAGE')
export const FETCH_ALL_DIALOGS = createAction('dialogs/FETCH_ALL_DIALOGS')
export const SWITCH_STATUS = createAction('dialogs/SWITCH_STATUS')


const dialogsSlice = createSlice({
  name: 'dialogs',
  initialState,
  reducers: {
    // CREATE_MESSAGE_SUCCESS: (state, action) => {
    //   console.log('TEST TEST TEST')
    // },
    FETCH_MESSAGE_SUCCESS: (state, {payload}) => {
      state.currentDialogMessages.messages = payload
    },
    FETCH_ALL_DIALOGS_SUCCESS: (state, {payload}) => {
      state.dialogs = payload
    },
    SWITCH_STATUS_DIALOG_SUCCESS: (state, {payload}) => {
      const {ref, isSaved} = payload
      state.dialogs.map(item => {
        if (item.dialogId === ref) {
          item.isSaved = isSaved
        }
      })
    }
  }
})

export const {FETCH_MESSAGE_SUCCESS, FETCH_ALL_DIALOGS_SUCCESS, SWITCH_STATUS_DIALOG_SUCCESS} = dialogsSlice.actions

export default dialogsSlice.reducer