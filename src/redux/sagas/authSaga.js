import firebase from 'firebase/app'
import 'firebase/auth'

import { call, put, takeLatest } from 'redux-saga/effects'

import {
  AUTHENTICATION_FAILED,
  FETCH_AUTHORIZED_USER,
  FETCH_AUTHORIZED_USER_SUCCESS,
  FORGOT,
  FORGOT_SUCCESS,
  SIGN_IN,
  SIGN_IN_GOOGLE,
  SIGN_IN_GOOGLE_SUCCESS,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
  SIGN_OUT_SUCCESS,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_SUCCESS
} from "../slices/dataSlice";
import { rsf } from "../../index";

export const onAuthStateChanged = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const {uid, email, displayName} = user
        resolve({uid, email, displayName})
      } else {
        reject({message: 'Нет авторизированного пользователя!'})
      }
    })
  })
}

// Workers
function* signUpWorker(action) {
  const {email, password} = action.payload
  try {
    const auth = firebase.auth()
    const {user} = yield call([auth, auth.createUserWithEmailAndPassword], email, password)
    yield put(SIGN_UP_SUCCESS(user))
  } catch (e) {
    yield put(AUTHENTICATION_FAILED(e.message))
  }
}

function* signInGoogleWorker() {
  const provider = new firebase.auth.GoogleAuthProvider()
  try {
    const auth = firebase.auth()
    const {user} = yield call([auth, auth.signInWithPopup], provider)
    yield put(SIGN_IN_GOOGLE_SUCCESS(user))
  } catch (e) {
    yield put(AUTHENTICATION_FAILED(e.message))
  }
}

function* forgotWorker(action) {
  try {
    const {email} = action.payload
    const actionCodeSettings = {
      url: 'http://localhost:3000/update-password?email=' + email
    }
    const auth = firebase.auth()
    yield call([auth, auth.sendPasswordResetEmail], email)
    yield put(FORGOT_SUCCESS('Вам на почту придет письмо с указаниями для сброса пароля'))
  } catch (e) {
    yield put(AUTHENTICATION_FAILED(e.message))
  }
}

function* signInWorker(action) {
  const {email, password} = action.payload
  try {
    const auth = firebase.auth()
    const {user} = yield call([auth, auth.signInWithEmailAndPassword], email, password)
    yield put(SIGN_IN_SUCCESS(user))
  } catch (e) {
    yield put(AUTHENTICATION_FAILED(e.message))
  }
}

function* loggedWorker() {
  try {
    const response = yield call(onAuthStateChanged)
    yield put(FETCH_AUTHORIZED_USER_SUCCESS(response))
  } catch (e) {
    yield put(SIGN_OUT_SUCCESS())
  }
}

function* signOutWorker() {
  try {
    const auth = firebase.auth()
    yield call([auth, auth.signOut])
    yield put(SIGN_OUT_SUCCESS())
  } catch (e) {
    yield put(AUTHENTICATION_FAILED('Что-то пошло не так'))
  }
}

function* updatePasswordWorker(action) {
  try {
    const {password, additional} = action.payload
    const auth = firebase.auth()
    const email = yield call([auth, auth.verifyPasswordResetCode], additional)
    yield call([auth, auth.confirmPasswordReset], additional, password)
    const {user} = yield call([auth, auth.signInWithEmailAndPassword], email, password)
    yield put(UPDATE_PASSWORD_SUCCESS(user))
  } catch (e) {
    yield put(AUTHENTICATION_FAILED('Пользователь не найден'))
  }
}

function* updateUser(action) {
  try {
    const {displayName, email, password} = action.payload
    yield call(rsf.auth.signInWithEmailAndPassword, email, password)
    yield call(rsf.auth.updateProfile, {
      displayName
    })
    yield put(UPDATE_USER_SUCCESS(displayName))
  } catch (e) {
    yield put(AUTHENTICATION_FAILED('Не удалось обновить профиль. Неправильный пароль'))
  }
}


// Watchers
export function* signUpWatcher() {
  yield takeLatest(SIGN_UP.type, signUpWorker)
}

export function* signInWatcher() {
  yield takeLatest(SIGN_IN.type, signInWorker)
}

export function* signInGoogleWatcher() {
  yield takeLatest(SIGN_IN_GOOGLE.type, signInGoogleWorker)
}

export function* forgotWatcher() {
  yield takeLatest(FORGOT.type, forgotWorker)
}

export function* loggedWatcher() {
  yield takeLatest(FETCH_AUTHORIZED_USER.type, loggedWorker)
}

export function* signOutWatcher() {
  yield takeLatest(SIGN_OUT.type, signOutWorker)
}

export function* updatePasswordWatcher() {
  yield takeLatest(UPDATE_PASSWORD.type, updatePasswordWorker)
}

export function* updateUserWatcher() {
  yield takeLatest(UPDATE_USER.type, updateUser)
}