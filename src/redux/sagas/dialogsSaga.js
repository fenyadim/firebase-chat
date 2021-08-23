import firebase from 'firebase/app'
import 'firebase/database'
import { call, fork, put, take, takeLatest } from "redux-saga/effects";
import {
  CREATE_MESSAGE, CREATE_MESSAGE_SUCCESS,
  FETCH_ALL_DIALOGS,
  FETCH_ALL_DIALOGS_SUCCESS,
  FETCH_ALL_MESSAGE,
  FETCH_MESSAGE_SUCCESS,
  SWITCH_STATUS,
  SWITCH_STATUS_DIALOG_SUCCESS
} from "../slices/dialogsSlice";
import { rsf } from "../../index";

const dataTransform = ({value}) => {
  const response = []
  Object.keys(value).map(index => {
    response.push(value[index])
  })
  return response
}

function* createMessageWorker(action) {
  try {
    const {id, content} = action.payload
    yield call(rsf.database.create, `/messages/${id}`, {
      content
    })
  } catch (e) {
    console.log(e)
  }
}

function* fetchAllMessage(action) {
  try {
    const {payload} = action
    yield fork(
      rsf.database.sync,
      `/messages/${payload}`,
      {
        successActionCreator: FETCH_MESSAGE_SUCCESS,
        transform: dataTransform
      }
    )
  } catch (e) {
    console.log(e)
  }
}

function* fetchAllDialogs() {
  try {
    const channel = yield call(rsf.database.channel, '/dialogs');
    const response = []
    while (true) {
      const {value: dialogs} = yield take(channel)
      Object.keys(dialogs).map(item => {
        response.push({
          ...dialogs[item],
          dialogId: item
        })
      })
      yield put(FETCH_ALL_DIALOGS_SUCCESS(response))
    }
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

export function* createMessageWatcher() {
  yield takeLatest(CREATE_MESSAGE.type, createMessageWorker)
}

export function* fetchAllWatcher() {
  yield takeLatest(FETCH_ALL_MESSAGE.type, fetchAllMessage)
}

export function* fetchAllDialogsWatcher() {
  yield takeLatest(FETCH_ALL_DIALOGS.type, fetchAllDialogs)
}

export function* switchStatusDialogWatcher() {
  yield takeLatest(SWITCH_STATUS.type, switchStatusDialog)
}