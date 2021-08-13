import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  status: null,
  response: null,
  isAuthorized: false,
  isLoading: true
}

const reducerSuccess = (state, payload, response) => {
  const {uid, email} = payload
  state.status = 'success'
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
    SIGN_IN_GOOGLE: reducerRequest,
    SIGN_IN_GOOGLE_SUCCESS: (state, {payload}) => {
      reducerSuccess(state, {payload}, 'Вы успешно авторизовались через Google!')
    },
    SIGN_OUT: reducerRequest,
    SIGN_OUT_SUCCESS: (state, {payload}) => {
      state.status = 'success'
      state.response = 'Вы успешно вышли!'
      state.isAuthorized = false
      state.isLoading = false
    },
    FORGOT: reducerRequest,
    FORGOT_SUCCESS: (state, {payload}) => {
      state.response = payload
      state.isLoading = false
    },
    FETCH_AUTHORIZED_USER: reducerRequest,
    FETCH_AUTHORIZED_USER_SUCCESS: (state, {payload}) => {
      reducerSuccess(state, payload, 'Авторизированный пользователь получен!')
    },
    AUTHENTICATION_FAILED: (state, {payload}) => {
      state.status = 'error'
      state.isLoading = false
      state.response = payload
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
  FETCH_AUTHORIZED_USER_SUCCESS,
  AUTHENTICATION_FAILED,
  SIGN_OUT,
  SIGN_OUT_SUCCESS,
  FETCH_AUTHORIZED_USER
} = usersSlice.actions

export default usersSlice.reducer