import { all } from 'redux-saga/effects'
import { loggedWatcher, signInWatcher, signOutWatcher, signUpWatcher, } from "./apiSaga";

export default function* rootSaga() {
  yield all([
    signUpWatcher(),
    signInWatcher(),
    loggedWatcher(),
    signOutWatcher()
  ])
}
