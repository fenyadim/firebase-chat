import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'

import usersReducer from './slices/dataSlice'
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {usersReducer},
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga)