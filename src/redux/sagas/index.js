import { all } from 'redux-saga/effects'
import {
  forgotWatcher,
  loggedWatcher,
  signInGoogleWatcher,
  signInWatcher,
  signOutWatcher,
  signUpWatcher,
  updateDialogSettingsWatcher,
  updatePasswordWatcher,
  updateUserWatcher,
} from "./usersSaga";

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
    switchStatusDialogWatcher(),
    updateDialogSettingsWatcher()
  ])
}
