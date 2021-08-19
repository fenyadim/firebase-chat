import firebase from 'firebase/app'
import 'firebase/auth'
import { call, put, takeLatest } from "redux-saga/effects";
import { CREATE_MESSAGE, FETCH_ALL_MESSAGE, FETCH_ALL_MESSAGE_SUCCESS } from "../slices/dialogsSlice";


function* createMessageWorker(action) {
  try {
    const data = {
      content: action.payload
    }
    const database = firebase.database()
    const test = yield database.ref('/messages')
    console.log(test)
    const ref = yield call([database, database.ref], '/messages')
    const fetch = yield call([ref, ref.once], 'value')
    const newPost = yield call([ref, ref.push], data)
    // console.log(fetch.val().length)
  } catch (e) {
    console.log(e)
  }
}

function* fetchAllWorker() {
  try {
    const database = firebase.database()
    const ref = yield call([database, database.ref], '/')
    const response = yield call([ref, ref.once], 'value')
    const data = response.val()
    yield put(FETCH_ALL_MESSAGE_SUCCESS(data))
  } catch (e) {

  }
}

export function* createMessageWatcher() {
  yield takeLatest(CREATE_MESSAGE.type, createMessageWorker)
}

export function* fetchAllWatcher() {
  yield takeLatest(FETCH_ALL_MESSAGE.type, fetchAllWorker)
}