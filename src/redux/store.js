import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from "redux-persist";

import usersReducer from './slices/dataSlice'
import dialogsReducer from "./slices/dialogsSlice";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
  users: usersReducer,
  dialogs: dialogsReducer
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['users', 'dialogs'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware]
})

sagaMiddleware.run(rootSaga)