import { all } from 'redux-saga/effects'
import { loggedWatcher, registrationWatcher, signInWatcher, signOutWatcher, } from "./apiSaga";

export default function* rootSaga() {
  yield all([
    registrationWatcher(),
    signInWatcher(),
    loggedWatcher(),
    signOutWatcher()
  ])
}
