import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import { all, call, cancel, fork, put, take, takeLatest } from "redux-saga/effects";
import moment from "moment";

import {
  CREATE_MESSAGE,
  DIALOGS_FAILED,
  FETCH_ALL_DIALOGS,
  FETCH_ALL_DIALOGS_SUCCESS,
  FETCH_ALL_MESSAGE,
  FETCH_ALL_MESSAGE_SUCCESS,
  SAVE_DIALOG,
  SEARCH_DATA,
  SEARCH_DATA_SUCCESS,
  SWITCH_STATUS
} from "../slices/dialogsSlice";
import { rsf } from "../../index";
import { onAuthStateChanged } from "./authSaga";

const messageTransformData = ({value}) => {
  const response = []
  if (value) {
    Object.keys(value).map(index => {
      response.push(value[index])
    })
    return response
  }
}

const dialogTransformData = ({value}) => {
  const response = []
  if (value) {
    Object.keys(value).map(index => {
      response.push({
        ...value[index],
        dialogId: index,
      })
    })
    return response
  }
}

// Workers
function* createMessage(action) {
  try {
    const {id, content} = action.payload
    const date = moment().format('D MMM YY, HH:mm')
    yield call(rsf.database.create, `/messages/${id}`, {
      content,
      timestamp: date
    })
  } catch (e) {
    console.log(e)
  }
}

function* fetchAllMessage(action) {
  try {
    const {payload} = action
    const syncData = yield fork(
      rsf.database.sync,
      `/messages/${payload}`,
      {
        successActionCreator: FETCH_ALL_MESSAGE_SUCCESS,
        transform: messageTransformData,
        failureActionCreator: DIALOGS_FAILED
      }
    )
    yield take(FETCH_ALL_MESSAGE)
    yield cancel(syncData)
  } catch (e) {
    console.log(e)
  }
}

function* lastTimeMessage() {
  try {
    const obj = yield call(rsf.database.read, 'messages')
    yield all(Object.keys(obj).map(index => {
      const length = Object.keys(obj[index]).length
      const key = Object.keys(obj[index])[length - 1]
      return call(rsf.database.update, `/dialogs/${index}/lastTime`, obj[index][key].timestamp)
    }))
  } catch (e) {
    console.log(e)
  }
}

function* fetchAllDialogs(action) {
  try {
    let status = action.payload
    if (!status) {
      status = 'active'
    }
    yield call(lastTimeMessage)
    const {uid} = yield call(onAuthStateChanged)
    const child = status === 'queue' ? 'status' : 'operatorId_status'
    const equalItem = status === 'queue' ? status : `${uid}_${status}`
    const syncData = yield fork(
      rsf.database.sync,
      firebase.database().ref('dialogs').orderByChild(child).equalTo(equalItem),
      {
        successActionCreator: FETCH_ALL_DIALOGS_SUCCESS,
        transform: value => dialogTransformData(value),
        failureActionCreator: DIALOGS_FAILED
      }
    )
    yield take(FETCH_ALL_DIALOGS)
    yield take(FETCH_ALL_MESSAGE)
    yield cancel(syncData)
  } catch (e) {
    console.log(e)
  }
}

function* saveDialog(action) {
  try {
    const {payload} = action
    const ref = firebase.database().ref('/dialogs/' + payload + '/isSaved')
    const savedField = yield call([ref, ref.once], 'value')
    const isSaved = savedField.val()
    yield call([ref, ref.set], !isSaved)
  } catch (e) {
    console.log(e)
  }
}

function* switchStatusDialog(action) {
  try {
    const {dialogId, status, operatorId} = action.payload
    yield call(
      rsf.database.update,
      `/dialogs/${dialogId}/status`,
      status)
    yield call(
      rsf.database.update,
      `/dialogs/${dialogId}/operatorId`,
      operatorId
    )
    yield call(rsf.database.update,
      `/dialogs/${dialogId}/operatorId_status`,
      `${operatorId}_${status}`
    )
  } catch (e) {
    console.log(e)
  }
}

function* searchData(action) {
  try {
    const {payload} = action
    const findData = yield call(
      rsf.database.read,
      firebase.database().ref('dialogs').orderByChild('clientName').startAt(payload.toUpperCase()).endAt(payload.toLowerCase() + "\uf8ff")
    )
    yield put(SEARCH_DATA_SUCCESS(findData))
  } catch (e) {
    console.log(e)
  }
}

// Watchers
export function* createMessageWatcher() {
  yield takeLatest(CREATE_MESSAGE.type, createMessage)
}

export function* fetchAllMessageWatcher() {
  yield takeLatest(FETCH_ALL_MESSAGE.type, fetchAllMessage)
}

export function* fetchAllDialogsWatcher() {
  yield takeLatest(FETCH_ALL_DIALOGS.type, fetchAllDialogs)
}

export function* saveDialogWatcher() {
  yield takeLatest(SAVE_DIALOG.type, saveDialog)
}

export function* switchStatusDialogWatcher() {
  yield takeLatest(SWITCH_STATUS.type, switchStatusDialog)
}

export function* searchDataWatcher() {
  yield takeLatest(SEARCH_DATA.type, searchData)
}