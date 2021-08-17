import { all } from 'redux-saga/effects'
import {
  forgotWatcher,
  loggedWatcher,
  signInGoogleWatcher,
  signInWatcher,
  signOutWatcher,
  signUpWatcher,
  updatePasswordWatcher,
} from "./apiSaga";

export default function* rootSaga() {
  yield all([
    signUpWatcher(),
    signInWatcher(),
    signInGoogleWatcher(),
    forgotWatcher(),
    loggedWatcher(),
    signOutWatcher(),
    updatePasswordWatcher()
  ])
}
