import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'

import usersReducer from './slices/dataSlice'
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {users: usersReducer},
  middleware: [sagaMiddleware]
})

sagaMiddleware.run(rootSaga)