import { CaseReducerActions, PayloadAction } from "@reduxjs/toolkit";
import { call, ForkEffect, put, takeLatest } from "redux-saga/effects";

type RequestStatus = "pending" | "success" | "failure";
export interface RequestState<T> {
  request: {
    response?: T | null;
    status?: RequestStatus;
  };
}

export type RequestOption = {
  url: string;
  method: string;
  auth: boolean;
  body?: string;
};

type DataFetchedReducer = (
  _: any,
  { payload }: PayloadAction<RequestOption>
) => void;
type RequestUpdatedReducer<T> = (
  state: any,
  { payload }: PayloadAction<RequestState<T>["request"]>
) => void;
type AdapterReducers<T> = {
  dataFetched: DataFetchedReducer;
  requestUpdated: RequestUpdatedReducer<T>;
};

interface SagaAdapter<T> {
  getRequestInitialState: () => RequestState<T>;
  getRequestReducers: () => AdapterReducers<T>;
  getRequestSaga: (
    actions: CaseReducerActions<AdapterReducers<T>>
  ) => () => Generator<ForkEffect<never>, void, unknown>;
}

const buildReducers =
  <T>() =>
  (): AdapterReducers<T> => ({
    dataFetched: () => {},
    requestUpdated: (state, { payload }) => {
      if (payload.response) state.request.response = payload.response;
      if (payload.status) state.request.status = payload.status;
    },
  });

const buildSagaFunction =
  <T>() =>
  ({ dataFetched, requestUpdated }: CaseReducerActions<AdapterReducers<T>>) => {
    return function* () {
      yield takeLatest(
        dataFetched,
        function* ({ payload: { method, url, auth, body } }) {
          yield put(requestUpdated({ status: "pending" }));

          const token = window.localStorage.getItem("token") || "";
          try {
            const response: Response = yield call(fetch, url, {
              method,
              credentials: auth ? "include" : "omit",
              headers: {
                Authorization: token,
              },
              body,
            });
            const json: T = yield response.json();

            yield put(requestUpdated({ status: "success", response: json }));
          } catch (err) {
            yield put(requestUpdated({ status: "failure" }));
          }
        }
      );
    };
  };

export const httpReduxAdapter = <T>() => {
  const adapter: SagaAdapter<T> = {
    getRequestInitialState: (): RequestState<T> => ({
      request: { response: null },
    }),
    getRequestReducers: buildReducers<T>(),
    getRequestSaga: buildSagaFunction<T>(),
  };
  return adapter;
};
