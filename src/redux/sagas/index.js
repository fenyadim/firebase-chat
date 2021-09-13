import { all } from 'redux-saga/effects'
import {
  forgotWatcher,
  loggedWatcher,
  signInGoogleWatcher,
  signInWatcher,
  signOutWatcher,
  signUpWatcher,
  updatePasswordWatcher,
  updateUserWatcher,
} from "./authSaga";

import {
  createMessageWatcher,
  fetchAllDialogsWatcher,
  fetchAllMessageWatcher,
  fetchCurrentDialogWatcher,
  saveDialogWatcher,
  searchDataWatcher,
  switchStatusDialogWatcher
} from "./dialogsSaga";

export default function* rootSaga() {
  yield all([
    signUpWatcher(),
    signInWatcher(),
    signInGoogleWatcher(),
    forgotWatcher(),
    loggedWatcher(),
    signOutWatcher(),
    updatePasswordWatcher(),
    updateUserWatcher(),
    createMessageWatcher(),
    fetchAllMessageWatcher(),
    fetchCurrentDialogWatcher(),
    fetchAllDialogsWatcher(),
    saveDialogWatcher(),
    searchDataWatcher(),
    switchStatusDialogWatcher()
  ])
}
