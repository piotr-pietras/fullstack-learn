import { createSlice } from "@reduxjs/toolkit";
import { fork } from "redux-saga/effects";
import { env } from "../../services/env";
import { httpSagaAdapter, RequestState } from "../../services/httpReduxAdapter";
import { State } from "../../services/store";

const { requestInitialState, getRequestReducers, getRequestSaga } =
  httpSagaAdapter();

interface InitialState extends RequestState {}

const initialState: InitialState = {
  ...requestInitialState,
};

export const PostBoardSlice = createSlice({
  name: "postBoard",
  initialState,
  reducers: {
    ...getRequestReducers(),
  },
});

export const PostBoardActions = PostBoardSlice.actions;
export const selectPostBoard = (state: State) => state.postBoard;

const RequestSaga = getRequestSaga(
  {
    method: "POST",
    url: `${env.backendURL}posts`,
  },
  PostBoardActions
);

export function* PostBoardSaga() {
  yield fork(RequestSaga);
}
