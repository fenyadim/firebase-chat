import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  response: null,
  isAuthorized: false,
  isLoading: true
}

const reducerSuccess = (state, payload, response) => {
  const {uid, email} = payload
  state.data = {uid, email}
  state.response = response
  state.isAuthorized = true
  state.isLoading = false
}

const reducerRequest = (state, action) => {
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
    SIGN_OUT: reducerRequest,
    SIGN_OUT_SUCCESS: (state, {payload}) => {
      state.response = 'Вы успешно вышли!'
      state.isAuthorized = false
      state.isLoading = false
    },
    FETCH_AUTHORIZED_USER: reducerRequest,
    FETCH_AUTHORIZED_USER_SUCCESS: (state, {payload}) => {
      reducerSuccess(state, payload, 'Авторизированный пользователь получен!')
    },
    AUTHENTICATION_FAILED: (state, {payload}) => {
      state.response = payload
    }
  },
})

export const {
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_IN,
  SIGN_IN_SUCCESS,
  FETCH_AUTHORIZED_USER_SUCCESS,
  AUTHENTICATION_FAILED,
  SIGN_OUT,
  SIGN_OUT_SUCCESS,
  FETCH_AUTHORIZED_USER
} = usersSlice.actions

export default usersSlice.reducer