import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { call, fork, put, takeLatest } from "redux-saga/effects";
import { env } from "../../services/env";
import { State } from "../../services/store";

const name = "postBoard";

interface RequestState {
  response?: unknown;
  status?: "pending" | "success" | "failure";
}

interface InitialState {
  request: RequestState;
}

const initialState: InitialState = {
  request: {},
};

export const PostBoardSlice = createSlice({
  name,
  initialState,
  reducers: {
    dataFetched: (state) => {},
    requestUpdated: (state, { payload }: PayloadAction<RequestState>) => {
      if (payload.response) state.request.response = payload.response;
      if (payload.status) state.request.status = payload.status;
    },
  },
});

export const PostBoardActions = PostBoardSlice.actions;
export const selectPostBoard = (state: State) => state.postBoard;

function* DataFecthedSaga() {
  yield takeLatest(PostBoardActions.dataFetched, function* () {
    yield put(PostBoardActions.requestUpdated({ status: "pending" }));
    try {
      const response: Response = yield call(fetch, `${env.backendURL}posts`, {
        method: "POST",
      });
      const json: unknown = yield response.json();
      yield put(
        PostBoardActions.requestUpdated({ status: "success", response: json })
      );
    } catch (err) {
      yield put(PostBoardActions.requestUpdated({ status: "failure" }));
    }
  });
}

export function* PostBoardSaga() {
  yield fork(DataFecthedSaga);
}
