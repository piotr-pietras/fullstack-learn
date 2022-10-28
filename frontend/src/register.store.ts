import { createSlice } from "@reduxjs/toolkit";
import { fork, put, takeLatest } from "redux-saga/effects";
import { RegisterResponse } from "../../types/register.type";
import { LoginActions } from "./login.store";
import { Backend } from "./services/backend";
import { httpReduxAdapter } from "./services/httpReduxAdapter";
import { State } from "./services/store";

const { getRequestInitialState, getRequestReducers, getRequestSaga } =
  httpReduxAdapter<RegisterResponse>();

interface InitialState extends ReturnType<typeof getRequestInitialState> {}

const initialState: InitialState = {
  ...getRequestInitialState(),
};

export const RegisterSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    ...getRequestReducers(),
  },
});

export const RegisterActions = RegisterSlice.actions;
export const selectRegister = (state: State) => state.request.login;

function* AfterRequestSaga() {
  yield takeLatest(RegisterActions.requestUpdated, function* ({ payload }) {
    if (payload.status === "success" && payload.response?.isSuccessful) {
      const token = payload.response.token || "";
      window.localStorage.setItem("token", token);
      yield put(LoginActions.dataFetched(Backend.getLogin()));
    }
  });
}

const RequestSaga = getRequestSaga(RegisterActions);

export function* RegisterSaga() {
  yield fork(RequestSaga);
  yield fork(AfterRequestSaga);
}
