import { CaseReducerActions, PayloadAction } from "@reduxjs/toolkit";
import { call, ForkEffect, put, takeLatest } from "redux-saga/effects";

export interface RequestState {
  request: {
    response?: unknown;
    status?: "pending" | "success" | "failure";
  };
}

export type RequestOption = {
  url: string;
  method: "GET" | "POST";
};

type DataFetchedReducer = () => void;
type RequestUpdatedReducer = (
  state: any,
  { payload }: PayloadAction<RequestState["request"]>
) => void;

interface SagaAdapter {
  requestInitialState: RequestState;
  getRequestReducers: () => {
    dataFetched: DataFetchedReducer;
    requestUpdated: RequestUpdatedReducer;
  };
  getRequestSaga: (
    options: RequestOption,
    actions: CaseReducerActions<{
      dataFetched: DataFetchedReducer;
      requestUpdated: RequestUpdatedReducer;
    }>
  ) => () => Generator<ForkEffect<never>, void, unknown>;
}

const buildReducers = () => ({
  dataFetched: () => {},
  requestUpdated: (
    state: any,
    { payload }: PayloadAction<RequestState["request"]>
  ) => {
    if (payload.response) state.request.response = payload.response;
    if (payload.status) state.request.status = payload.status;
  },
});

const buildSagaFunction = (
  { method, url }: RequestOption,
  {
    dataFetched,
    requestUpdated,
  }: CaseReducerActions<{
    dataFetched: DataFetchedReducer;
    requestUpdated: RequestUpdatedReducer;
  }>
) => {
  return function* () {
    yield takeLatest(dataFetched, function* () {
      yield put(requestUpdated({ status: "pending" }));
      try {
        const response: Response = yield call(fetch, url, {
          method,
        });
        const json: unknown = yield response.json();
        yield put(requestUpdated({ status: "success", response: json }));
      } catch (err) {
        yield put(requestUpdated({ status: "failure" }));
      }
    });
  };
};

export const httpSagaAdapter = () => {
  const adapter: SagaAdapter = {
    requestInitialState: { request: {} },
    getRequestReducers: buildReducers,
    getRequestSaga: buildSagaFunction,
  };
  return adapter;
};
