import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from "redux-persist";

import usersReducer from './slices/usersSlice'
import dialogsReducer from "./slices/dialogsSlice";
import rootSaga from "./sagas";
import hardSet from "redux-persist/es/stateReconciler/hardSet";

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
  users: usersReducer,
  dialogs: dialogsReducer
})

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['users'],
  blacklist: ['dialogs', 'users'],
  stateReconciler: hardSet,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware]
})

sagaMiddleware.run(rootSaga)