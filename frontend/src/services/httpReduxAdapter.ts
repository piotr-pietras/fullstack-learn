import {
  ActionCreatorWithPayload,
  CaseReducerActions,
  PayloadAction,
} from "@reduxjs/toolkit";
import { call, ForkEffect, put, takeLatest } from "redux-saga/effects";

type RequestStatus = "pending" | "success" | "failure";
export interface RequestState<T> {
  request: {
    response?: T;
    status?: RequestStatus;
  };
}

export type RequestOption = {
  url: string;
  method: string;
};

type DataFetchedReducer = (
  _: any,
  { payload }: PayloadAction<RequestOption>
) => void;
type RequestUpdatedReducer = (
  state: any,
  { payload }: PayloadAction<RequestState<unknown>["request"]>
) => void;

interface SagaAdapter<T> {
  getRequestInitialState: () => RequestState<T>;
  getRequestReducers: () => {
    dataFetched: DataFetchedReducer;
    requestUpdated: RequestUpdatedReducer;
  };
  getRequestSaga: (
    actions: CaseReducerActions<{
      dataFetched: DataFetchedReducer;
      requestUpdated: RequestUpdatedReducer;
    }>,
    globalLoading?: ActionCreatorWithPayload<boolean, string>
  ) => () => Generator<ForkEffect<never>, void, unknown>;
}

const buildReducers = () => ({
  dataFetched: (_: any, { payload }: PayloadAction<RequestOption>) => {},
  requestUpdated: (
    state: any,
    { payload }: PayloadAction<RequestState<unknown>["request"]>
  ) => {
    if (payload.response) state.request.response = payload.response;
    if (payload.status) state.request.status = payload.status;
  },
});

const buildSagaFunction = (
  {
    dataFetched,
    requestUpdated,
  }: CaseReducerActions<{
    dataFetched: DataFetchedReducer;
    requestUpdated: RequestUpdatedReducer;
  }>,
  globalLoading?: ActionCreatorWithPayload<boolean, string>
) => {
  return function* () {
    yield takeLatest(dataFetched, function* ({ payload: { method, url } }) {
      yield put(requestUpdated({ status: "pending" }));
      if (globalLoading) yield put(globalLoading(true));

      try {
        const response: Response = yield call(fetch, url, {
          method,
        });
        const json: unknown = yield response.json();
        
        yield put(requestUpdated({ status: "success", response: json }));
        if (globalLoading) yield put(globalLoading(false));
      } catch (err) {
        yield put(requestUpdated({ status: "failure" }));
        if (globalLoading) yield put(globalLoading(false));
      }
    });
  };
};

export const httpReduxAdapter = <T>() => {
  const adapter: SagaAdapter<T> = {
    getRequestInitialState: () => ({ request: {} }),
    getRequestReducers: buildReducers,
    getRequestSaga: buildSagaFunction,
  };
  return adapter;
};
