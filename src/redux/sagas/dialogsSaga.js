import firebase from 'firebase/app'
import 'firebase/database'
import { call, cancel, fork, put, take, takeLatest } from "redux-saga/effects";

import {
  CREATE_MESSAGE,
  FETCH_ALL_DIALOGS,
  FETCH_ALL_DIALOGS_SUCCESS,
  FETCH_ALL_MESSAGE,
  FETCH_ALL_MESSAGE_SUCCESS,
  SEARCH_DATA,
  SWITCH_STATUS,
  SWITCH_STATUS_DIALOG_SUCCESS
} from "../slices/dialogsSlice";
import { rsf } from "../../index";
import moment from "moment";

const messageTransformData = ({value}) => {
  const response = []
  Object.keys(value).map(index => {
    response.push(value[index])
  })
  return response
}

const dialogTransformData = ({value}, lastTime) => {
  const response = []
  Object.keys(value).map(index => {
    response.push({
      ...value[index],
      dialogId: index,
      lastTime: lastTime[index]
    })
  })
  return response
}

// Workers
function* createMessageWorker(action) {
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
        transform: messageTransformData
      }
    )
    yield take(FETCH_ALL_MESSAGE)
    yield cancel(syncData)
  } catch (e) {
    console.log(e)
  }
}

function* lastTimeMessage() {
  const ref = firebase.database().ref('messages')
  const response = yield call([ref, ref.get])
  const obj = response.val()
  let lastTimeDialogs = {}
  Object.keys(obj).map(index => {
    const lenght = Object.keys(obj[index]).length
    const key = Object.keys(obj[index])[lenght - 1]
    lastTimeDialogs = {
      ...lastTimeDialogs,
      [index]: obj[index][key].timestamp
    }
  })
  return lastTimeDialogs
}

function* fetchAllDialogs() {
  try {
    const lastTime = yield call(lastTimeMessage)
    const syncData = yield fork(
      rsf.database.sync,
      '/dialogs',
      {
        successActionCreator: FETCH_ALL_DIALOGS_SUCCESS,
        transform: value => dialogTransformData(value, lastTime)
      }
    )
    yield take(FETCH_ALL_DIALOGS)
    yield cancel(syncData)
  } catch (e) {
    console.log(e)
  }
}

function* switchStatusDialog(action) {
  try {
    const {payload} = action
    const ref = firebase.database().ref('/dialogs/' + payload + '/isSaved')
    const savedField = yield call([ref, ref.once], 'value')
    const isSaved = savedField.val()
    yield call([ref, ref.set], !isSaved)
    yield put(SWITCH_STATUS_DIALOG_SUCCESS({ref: payload, isSaved: !isSaved}))
  } catch (e) {
    console.log(e)
  }
}

function* searchData(action) {
  try {
    const {payload} = action
    console.log(payload)
    const test = yield call(
      rsf.database.read,
      firebase.database().ref('dialogs').orderByChild('clientName').startAt(payload)
    )
    console.log(test)
  } catch (e) {
    console.log(e)
  }
}

// Watchers
export function* createMessageWatcher() {
  yield takeLatest(CREATE_MESSAGE.type, createMessageWorker)
}

export function* fetchAllMessageWatcher() {
  yield takeLatest(FETCH_ALL_MESSAGE.type, fetchAllMessage)
}

export function* fetchAllDialogsWatcher() {
  yield takeLatest(FETCH_ALL_DIALOGS.type, fetchAllDialogs)
}

export function* switchStatusDialogWatcher() {
  yield takeLatest(SWITCH_STATUS.type, switchStatusDialog)
}

export function* searchDataWatcher() {
  yield takeLatest(SEARCH_DATA.type, searchData)
}