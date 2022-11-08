import { createSlice } from "@reduxjs/toolkit";
import { fork } from "redux-saga/effects";
import { httpReduxAdapter } from "../../services/httpReduxAdapter";
import { State } from "../../services/store";
import { Post } from "../../../../types/post.type";

const { getRequestInitialState, getRequestReducers, getRequestSaga } =
  httpReduxAdapter<Post[]>();

interface InitialState extends ReturnType<typeof getRequestInitialState> {}

const initialState: InitialState = {
  ...getRequestInitialState(),
};

export const PostGetSlice = createSlice({
  name: "post/get",
  initialState,
  reducers: {
    ...getRequestReducers(),
  },
});

export const PostGetActions = PostGetSlice.actions;
export const selectPostBoard = (state: State) => state.request['post/get'];

const RequestSaga = getRequestSaga(PostGetActions);

export function* PostGetSaga() {
  yield fork(RequestSaga);
}
