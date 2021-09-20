import { createAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  data: {},
  settings: {
    phrases: [],
    themes: [],
    subtopics: [],
    autoGreetings: ''
  },
  status: null,
  response: null,
  isAuthorized: false,
  isLoading: true
}

export const UPDATE_DIALOGS_SETTINGS = createAction('users/UPDATE_DIALOGS_SETTINGS')

const reducerSuccess = (state, payload, response) => {
  const {uid, email, displayName, photoURL, settings} = payload
  state.status = 'success'
  state.settings = settings
  state.data = {uid, email, displayName, photoURL}
  state.response = response
  state.isAuthorized = true
  state.isLoading = false
  toast.success(state.response)
}

const reducerRequest = (state) => {
  state.isLoading = true
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    SIGN_UP: reducerRequest,
    SIGN_UP_SUCCESS: (state, {payload}) => {
      reducerSuccess(state, payload, 'Вы успешно зарегистрировались!')
    },
    SIGN_IN: reducerRequest,
    SIGN_IN_SUCCESS: (state, {payload}) => {
      reducerSuccess(state, payload, 'Вы успешно авторизовались!')
    },
    SIGN_IN_GOOGLE: reducerRequest,
    SIGN_IN_GOOGLE_SUCCESS: (state, {payload}) => {
      reducerSuccess(state, payload, 'Вы успешно авторизовались через Google!')
    },
    SIGN_OUT: reducerRequest,
    SIGN_OUT_SUCCESS: (state) => {
      state.status = 'success'
      state.response = 'Вы успешно вышли!'
      state.isAuthorized = false
      state.isLoading = false
    },
    FORGOT: reducerRequest,
    FORGOT_SUCCESS: (state, {payload}) => {
      state.response = payload
      state.isLoading = false
      toast.success(state.response)
    },
    UPDATE_PASSWORD: reducerRequest,
    UPDATE_PASSWORD_SUCCESS: (state, {payload}) => {
      reducerSuccess(state, {payload}, 'Вы успешно сменили пароль!')
    },
    UPDATE_USER: reducerRequest,
    UPDATE_USER_SUCCESS: (state, {payload}) => {
      const {displayName, url: photoURL} = payload
      state.data = {
        ...state.data,
        displayName,
        photoURL
      }
      state.isLoading = false
      toast.success('Профиль успешно обновлен!')
    },
    UPDATE_DIALOGS_SETTINGS_SUCCESS: (state, {payload}) => {
      const {phrases, themes, subtopics, autoGreetings} = payload
      state.settings.phrases = phrases
      state.settings.themes = themes
      state.settings.subtopics = subtopics
      state.settings.autoGreetings = autoGreetings
    },
    FETCH_AUTHORIZED_USER: reducerRequest,
    FETCH_AUTHORIZED_USER_SUCCESS: (state, {payload}) => {
      reducerSuccess(state, payload)
    },
    AUTHENTICATION_FAILED: (state, {payload}) => {
      state.status = 'error'
      state.isLoading = false
      state.response = payload
      toast.error(payload)
    }
  },
})

export const {
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_GOOGLE,
  SIGN_IN_GOOGLE_SUCCESS,
  FORGOT,
  FORGOT_SUCCESS,
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_DIALOGS_SETTINGS_SUCCESS,
  FETCH_AUTHORIZED_USER_SUCCESS,
  AUTHENTICATION_FAILED,
  SIGN_OUT,
  SIGN_OUT_SUCCESS,
  FETCH_AUTHORIZED_USER
} = usersSlice.actions

export default usersSlice.reducer