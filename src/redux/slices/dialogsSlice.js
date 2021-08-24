import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  dialogs: [],
  currentDialogMessages: {
    messages: [],
    isLoading: false
  },
  isLoading: false
}


export const CREATE_MESSAGE = createAction('dialogs/CREATE_MESSAGE')
export const SWITCH_STATUS = createAction('dialogs/SWITCH_STATUS')
export const SEARCH_DATA = createAction('dialogs/SEARCH_DATA')

const reducerRequestDialog = (state) => {
  state.isLoading = true
}

const reducerRequestMessage = (state) => {
  state.currentDialogMessages.isLoading = true
}

const dialogsSlice = createSlice({
  name: 'dialogs',
  initialState,
  reducers: {
    FETCH_ALL_MESSAGE: reducerRequestMessage,
    FETCH_ALL_MESSAGE_SUCCESS: (state, {payload}) => {
      state.currentDialogMessages.messages = payload
      state.currentDialogMessages.isLoading = false
    },
    FETCH_ALL_DIALOGS: reducerRequestDialog,
    FETCH_ALL_DIALOGS_SUCCESS: (state, {payload}) => {
      state.dialogs = payload
      state.isLoading = false
    },
    SWITCH_STATUS_DIALOG_SUCCESS: (state, {payload}) => {
      const {ref, isSaved} = payload
      state.dialogs.map(item => {
        if (item.dialogId === ref) {
          item.isSaved = isSaved
        }
      })
    },
    SEARCH_DATA_SUCCESS: (state, action) => {
      console.log(action)
    }
  }
})

export const {
  FETCH_ALL_MESSAGE,
  FETCH_ALL_DIALOGS,
  FETCH_ALL_MESSAGE_SUCCESS,
  FETCH_ALL_DIALOGS_SUCCESS,
  SWITCH_STATUS_DIALOG_SUCCESS,
  SEARCH_DATA_SUCCESS
} = dialogsSlice.actions

export default dialogsSlice.reducer