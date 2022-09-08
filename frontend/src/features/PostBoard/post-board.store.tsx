import { createSlice } from "@reduxjs/toolkit";
import { fork } from "redux-saga/effects";
import { env } from "../../services/env";
import { httpReduxAdapter } from "../../services/httpReduxAdapter";
import { State } from "../../services/store";
import { Post } from "../../../../types/post.type";

const { getRequestInitialState, getRequestReducers, getRequestSaga } =
  httpReduxAdapter<Post[]>();

interface InitialState extends ReturnType<typeof getRequestInitialState> {}

const initialState: InitialState = {
  ...getRequestInitialState(),
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
    url: `${env.backendURL}posts?quantity=20`,
  },
  PostBoardActions
);

export function* PostBoardSaga() {
  yield fork(RequestSaga);
}
