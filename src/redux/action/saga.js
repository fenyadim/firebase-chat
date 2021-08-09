import { createAction } from "@reduxjs/toolkit";

export const sagaCreateUser = createAction('saga/SIGN_UP_USER')
export const sagaSignInUser = createAction('saga/SIGN_IN_USER')
export const sagaLoggedUser = createAction('saga/FETCH_AUTHORIZED_USER')
export const sagaSignOutUser = createAction('saga/SIGN_OUT_USER')