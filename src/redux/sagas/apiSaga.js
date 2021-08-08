import firebase from 'firebase'
import { call, put, takeEvery } from 'redux-saga/effects'

import { createUser, errorCreateUser, sagaCreateUser, sagaSignInUser, signIn } from "../slices/dataSlice";

const registrationUser = async (data) => {
  const {email, password} = data
  return await firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
    return true
  }).catch((error) => {
    return error.message;
  })
}

const signInUser = async (data) => {
  const {email, password} = data
  return await firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
    const user = userCredential.user
    return {
      uid: user.uid,
      email: user.email,
      phoneNumber: user.phoneNumber
    }
  }).catch((error) => {
    return {
      status: 'error',
      errorDetail: error.message
    };
  })
}

export function* apiWorker(action) {
  const response = yield call(registrationUser, action.payload)
  if (response === true) {
    yield put(createUser())
  } else {
    yield put(errorCreateUser(response))
  }
}

export function* apiWatcher() {
  yield takeEvery(sagaCreateUser.type, apiWorker)
}

export function* signInWorker(action) {
  const response = yield call(signInUser, action.payload)
  yield put(signIn(response))
}

export function* signInWatcher() {
  yield takeEvery(sagaSignInUser.type, signInWorker)
}