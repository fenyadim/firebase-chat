import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  dialogs: [],
  currentDialogMessages: {
    dialog: [],
    messages: [],
    isLoading: false
  },
  isLoading: false
}

export const CREATE_MESSAGE = createAction('dialogs/CREATE_MESSAGE')
export const SWITCH_STATUS = createAction('dialogs/SWITCH_STATUS')
export const SEARCH_DATA = createAction('dialogs/SEARCH_DATA')
export const SAVE_DIALOG = createAction('dialogs/SAVE_DIALOG')
export const FETCH_CURRENT_DIALOG = createAction('dialogs/FETCH_CURRENT_DIALOG')

const reducerRequestDialog = (state) => {
  state.isLoading = true
  state.dialogs = []
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
    FETCH_CURRENT_DIALOG_SUCCESS: (state, {payload}) => {
      state.currentDialogMessages.dialog = payload
    },
    SEARCH_DATA_SUCCESS: (state, {payload}) => {
      console.log(payload)
    },
    DIALOGS_FAILED: (state, {payload}) => {
      console.log(payload)
    }
  }
})

export const {
  FETCH_ALL_MESSAGE,
  FETCH_ALL_DIALOGS,
  FETCH_ALL_MESSAGE_SUCCESS,
  FETCH_ALL_DIALOGS_SUCCESS,
  FETCH_CURRENT_DIALOG_SUCCESS,
  SEARCH_DATA_SUCCESS,
  DIALOGS_FAILED
} = dialogsSlice.actions

export default dialogsSlice.reducer