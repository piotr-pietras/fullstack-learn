import { createSelector, createSlice } from "@reduxjs/toolkit";
import { fork } from "redux-saga/effects";
import { User } from "../../types/user.type";
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
export const selectLogin = (state: State) => state.request.login;

export const selectIsLogged = createSelector(selectLogin, (login) => {
  if (!login.request.response) {
    return false;
  }
  return !!login.request.response.username;
});

const RequestSaga = getRequestSaga(LoginActions);

export function* LoginSaga() {
  yield fork(RequestSaga);
}
