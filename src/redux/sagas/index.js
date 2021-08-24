import { all } from 'redux-saga/effects'
import {
  forgotWatcher,
  loggedWatcher,
  signInGoogleWatcher,
  signInWatcher,
  signOutWatcher,
  signUpWatcher,
  updatePasswordWatcher,
} from "./authSaga";

import {
  createMessageWatcher,
  fetchAllDialogsWatcher,
  fetchAllMessageWatcher,
  switchStatusDialogWatcher,
  searchDataWatcher
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
    createMessageWatcher(),
    fetchAllMessageWatcher(),
    fetchAllDialogsWatcher(),
    switchStatusDialogWatcher(),
    searchDataWatcher()
  ])
}
