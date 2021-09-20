import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'

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
  UPDATE_DIALOGS_SETTINGS,
  UPDATE_DIALOGS_SETTINGS_SUCCESS,
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_SUCCESS
} from "../slices/usersSlice";
import { rsf } from "../../index";

export const onAuthStateChanged = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const {uid, email, displayName, photoURL} = user
        resolve({uid, email, displayName, photoURL})
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
    const settings = yield call(rsf.database.read, `settings/${user.uid}`)
    yield put(SIGN_IN_GOOGLE_SUCCESS({...user, settings}))
  } catch (e) {
    yield put(AUTHENTICATION_FAILED(e.message))
  }
}

function* forgotWorker(action) {
  try {
    const {email} = action.payload
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
    const settings = yield call(rsf.database.read, `settings/${user.uid}`)
    yield put(SIGN_IN_SUCCESS({...user, settings}))
  } catch (e) {
    yield put(AUTHENTICATION_FAILED(e.message))
  }
}

function* loggedWorker() {
  try {
    const response = yield call(onAuthStateChanged)
    const settings = yield call(rsf.database.read, `settings/${response.uid}`)
    yield put(FETCH_AUTHORIZED_USER_SUCCESS({...response, settings}))
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
    const {displayName, email, password, imageUrl, uid} = action.payload
    yield call(rsf.auth.signInWithEmailAndPassword, email, password)
    if (imageUrl) {
      const ref = `users/${uid}/profile`
      yield call(rsf.storage.uploadFile, ref, imageUrl)
      const url = yield call(rsf.storage.getDownloadURL, ref)
      yield call(rsf.auth.updateProfile, {
        displayName,
        photoURL: url
      })
      yield put(UPDATE_USER_SUCCESS({displayName, url}))
    } else {
      yield call(rsf.auth.updateProfile, {
        displayName,
      })
      yield put(UPDATE_USER_SUCCESS(displayName))
    }
  } catch (e) {
    yield put(AUTHENTICATION_FAILED('Не удалось обновить профиль. Неправильный пароль'))
    console.log(e.message)
  }
}

function* updateDialogSettings(action) {
  try {
    const {uid, phrases, themes, subtopics, autoGreetings} = action.payload
    console.log(action.payload)
    yield call(rsf.database.update, `settings/${uid}`, {
      phrases,
      themes,
      subtopics,
      autoGreetings
    })
    yield put(UPDATE_DIALOGS_SETTINGS_SUCCESS({phrases, themes, subtopics, autoGreetings}))
  } catch (e) {
    console.log(e)
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

export function* updateDialogSettingsWatcher() {
  yield takeLatest(UPDATE_DIALOGS_SETTINGS.type, updateDialogSettings)
}