import firebase from 'firebase'
import { call, put, takeLatest } from 'redux-saga/effects'

import {
  AUTHENTICATION_FAILED,
  FETCH_AUTHORIZED_USER_SUCCESS,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
  SIGN_UP_SUCCESS
} from "../slices/dataSlice";
import { sagaCreateUser, sagaLoggedUser, sagaSignInUser, sagaSignOutUser } from "../action/saga";


const onAuthStateChanged = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const {uid, email} = user
        resolve({uid, email})
      } else {
        reject({message: 'Нет авторизированного пользователя!'})
      }
    })
  })
}

export function* signUpWorker(action) {
  const {email, password} = action.payload
  try {
    const auth = firebase.auth()
    const {user} = yield call([auth, auth.createUserWithEmailAndPassword], email, password)
    yield put(SIGN_UP_SUCCESS(user))
  } catch (e) {
    yield put(AUTHENTICATION_FAILED(e.message))
  }
}

export function* signInWorker(action) {
  const {email, password} = action.payload
  try {
    const auth = firebase.auth()
    const {user} = yield call([auth, auth.signInWithEmailAndPassword], email, password)
    yield put(SIGN_IN_SUCCESS(user))
  } catch (e) {
    yield put(AUTHENTICATION_FAILED(e.message))
  }
}

export function* loggedWorker() {
  try {
    const response = yield call(onAuthStateChanged)
    yield put(FETCH_AUTHORIZED_USER_SUCCESS(response))
  } catch (e) {
    yield put(SIGN_OUT_SUCCESS())
  }
}

export function* signOutWorker() {
  try {
    const auth = firebase.auth()
    yield call([auth, auth.signOut])
    yield put(SIGN_OUT_SUCCESS())
  } catch (e) {
    yield put(AUTHENTICATION_FAILED('Что-то пошло не так'))
  }
}


export function* registrationWatcher() {
  yield takeLatest(sagaCreateUser.type, signUpWorker)
}

export function* signInWatcher() {
  yield takeLatest(sagaSignInUser.type, signInWorker)
}

export function* loggedWatcher() {
  yield takeLatest(sagaLoggedUser.type, loggedWorker)
}

export function* signOutWatcher() {
  yield takeLatest(sagaSignOutUser.type, signOutWorker)
}