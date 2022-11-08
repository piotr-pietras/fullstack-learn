import { createSlice } from "@reduxjs/toolkit";
import { fork, put, select, takeLatest } from "redux-saga/effects";
import { AddPostResponse } from "../../../../types/post.type";
import { AppActions, Category, selectChosenCategory } from "../../app.slice";
import { Backend } from "../../services/backend";
import { httpReduxAdapter } from "../../services/httpReduxAdapter";
import { State } from "../../services/store";
import { PostGetActions } from "./post-get.store";

const { getRequestInitialState, getRequestReducers, getRequestSaga } =
  httpReduxAdapter<AddPostResponse>();

interface InitialState extends ReturnType<typeof getRequestInitialState> {}

const initialState: InitialState = {
  ...getRequestInitialState(),
};

export const PostAddSlice = createSlice({
  name: "post/add",
  initialState,
  reducers: {
    ...getRequestReducers(),
  },
});

export const PostAddActions = PostAddSlice.actions;
export const selectPostAdd = (state: State) => state.request["post/add"];

const RequestSaga = getRequestSaga(PostAddActions);

function* AfterRequestSaga() {
  yield takeLatest(PostAddActions.requestUpdated, function* ({ payload }) {
    if (payload.status === "success" && payload.response?.isSuccessful) {
      const type: Category = yield select(selectChosenCategory) || "all";
      yield put(PostGetActions.dataFetched(Backend.getPosts(type)));
      yield put(AppActions.modalOpened({ isOpened: false }));
    }
  });
}

export function* PostAddSaga() {
  yield fork(RequestSaga);
  yield fork(AfterRequestSaga);
}
