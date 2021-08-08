import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: null,
  errorDetail: null,
  data: {}
}

export const sagaCreateUser = createAction('saga/sagaCreateUsers')
export const sagaSignInUser = createAction('saga/sagaSignInUser')

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    createUser: (state, action) => {
      state.status = 'success'
      state.errorDetail = null
    },
    errorCreateUser: (state, action) => {
      state.status = 'error'
      state.errorDetail = action.payload
    },
    signIn: (state, {payload}) => {
      if (payload.status === 'error') {
        state.status = 'error'
        state.errorDetail = payload.errorDetail
      } else {
        state.status = 'success'
        state.errorDetail = null
        state.data = payload
      }
    }
  },
})

export const {createUser, errorCreateUser, signIn} = usersSlice.actions

export default usersSlice.reducer