import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: null,
  response: null,
  data: {},
  setAuthorized: false
}

const reducerSuccess = (state, payload, response) => {
  const {uid, email} = payload
  state.status = 'success'
  state.data = {uid, email}
  state.response = response
  state.setAuthorized = true
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    SIGN_UP_SUCCESS: (state, {payload}) => {
      reducerSuccess(state, payload, 'Вы успешно зарегистрировались!')
    },
    SIGN_IN_SUCCESS: (state, {payload}) => {
      reducerSuccess(state, payload, 'Вы успешно авторизовались!')
    },
    SIGN_OUT_SUCCESS: (state, {payload}) => {
      state.setAuthorized = false
    },
    FETCH_AUTHORIZED_USER_SUCCESS: (state, {payload}) => {
      reducerSuccess(state, payload, 'Пользователи получены!')
    },
    AUTHENTICATION_FAILED: (state, {payload}) => {
      state.status = 'error'
      state.response = payload
    }
  },
})

export const {SIGN_UP_SUCCESS, SIGN_IN_SUCCESS, FETCH_AUTHORIZED_USER_SUCCESS, AUTHENTICATION_FAILED, SIGN_OUT_SUCCESS} = usersSlice.actions

export default usersSlice.reducer