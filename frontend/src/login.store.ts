import { createSelector, createSlice } from "@reduxjs/toolkit";
import { fork } from "redux-saga/effects";
import { User } from "../../types/user.type";
import { AppActions } from "./app.slice";
import { httpReduxAdapter } from "./services/httpReduxAdapter";
import { State } from "./services/store";

const { getRequestInitialState, getRequestReducers, getRequestSaga } =
  httpReduxAdapter<User>();

interface InitialState extends ReturnType<typeof getRequestInitialState> {}

const initialState: InitialState = {
  ...getRequestInitialState(),
};

export const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    ...getRequestReducers(),
  },
});

export const LoginActions = LoginSlice.actions;
export const selectLogin = (state: State) => state.login;

export const selectIsLogged = createSelector(selectLogin, (login) => {
  if (!login.request.response) {
    return false;
  }
  return !!login.request.response.id;
});

const RequestSaga = getRequestSaga(LoginActions, AppActions.appLoaded);

export function* LoginSaga() {
  yield fork(RequestSaga);
}
