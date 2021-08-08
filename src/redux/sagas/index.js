import { all } from 'redux-saga/effects'
import { apiWatcher, signInWatcher } from "./apiSaga";

export default function* rootSaga() {
  yield all([
    apiWatcher(),
    signInWatcher()
  ])
}
