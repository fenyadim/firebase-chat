import firebase from 'firebase/app'
import 'firebase/auth'
import { call, put, take, takeLatest } from "redux-saga/effects";
import {
  CREATE_MESSAGE,
  FETCH_ALL_DIALOGS,
  FETCH_ALL_DIALOGS_SUCCESS,
  FETCH_ALL_MESSAGE,
  FETCH_MESSAGE_SUCCESS
} from "../slices/dialogsSlice";
import { eventChannel } from "redux-saga";

function createMessageEventChannel(ref) {
  const database = firebase.database()
  const listener = eventChannel(emit => {
    database.ref(ref)
      .on(
        'child_added',
        data => emit({data: data.val(), id: data.key})
      );
    return () => database.ref(ref).off(listener)
  })
  return listener
}

function createData(ref, data) {
  const database = firebase.database()
  database.ref(ref).push(data)
}


function* createMessageWorker(action) {
  try {
    const {id, content} = action.payload
    const data = {
      content
    }
    yield call(createData, `${id}/messages`, data)
  } catch (e) {
    console.log(e)
  }
}

function* fetchAllMessage(action) {
  try {
    const {payload} = action
    const updateChannel = createMessageEventChannel(`${payload}/messages`)
    while (true) {
      const {data} = yield take(updateChannel)
      yield put(FETCH_MESSAGE_SUCCESS({data, idDialog: payload}))
    }
  } catch (e) {
    console.log(e)
  }
}

function* fetchAllDialogs() {
  try {
    const updateChannel = createMessageEventChannel('/')
    while (true) {
      const item = yield take(updateChannel)
      yield put(FETCH_ALL_DIALOGS_SUCCESS(item))
    }
  } catch (e) {
    console.log(e)
  }
}

export function* createMessageWatcher() {
  yield takeLatest(CREATE_MESSAGE.type, createMessageWorker)
}

export function* fetchAllWatcher() {
  yield takeLatest(FETCH_ALL_MESSAGE.type, fetchAllMessage)
}

export function* fetchAllDialogsWatcher() {
  yield takeLatest(FETCH_ALL_DIALOGS.type, fetchAllDialogs)
}