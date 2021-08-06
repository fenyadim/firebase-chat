import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from "firebase";

const initialState = {
  status: null,
  errorDescription: null
}

export const addTest = createAsyncThunk('users/addUsers', async (data) => {
  const {email, password} = data
  const response = firebase.auth().createUserWithEmailAndPassword(email, password)
  try {
    return response.then()
  } catch (e) {
    console.log(e)
    return response.catch((error) => {
      return error.message
    })
  }
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // addUser: (state, action) => {
    //   console.log(state.status)
    //   const {email, password} = action.payload
    //   firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
    //     const errorMessage = error.message;
    //     state.status = 'error';
    //     state.errorDescription = errorMessage;
    //   })
    // }
  },
  extraReducers: {
    [addTest.pending]: (state, action) => {
      state.status = 'loading'
    },
    [addTest.fulfilled]: (state, action) => {
      state.status = 'success';
    },
    [addTest.rejected]: (state, action) => {
      state.status = 'error';
      state.errorDescription = action.payload;
    }
  }
})

export const {addUser} = usersSlice.actions

export default usersSlice.reducer