import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppSlice } from "../app.slice";
import {
  PostBoardSaga,
  PostBoardSlice,
} from "../features/PostBoard/post-board.store";
import createSagaMiddleware from "redux-saga";
import { fork } from "redux-saga/effects";
import { AppSaga } from "../app.saga";
import { LoginSaga, LoginSlice } from "../login.store";

function* sagaRoot() {
  yield fork(AppSaga);
  yield fork(LoginSaga);
  yield fork(PostBoardSaga);
}

export const createStore = () => {
  const saga = createSagaMiddleware();

  const store = configureStore({
    reducer: {
      [AppSlice.name]: AppSlice.reducer,
      [LoginSlice.name]: LoginSlice.reducer,
      [PostBoardSlice.name]: PostBoardSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: false }).concat(saga),
  });

  saga.run(sagaRoot);

  return store;
};

type StoreType = ReturnType<typeof createStore>;

export type State = ReturnType<StoreType["getState"]>;
export const useAppDispatch = () => useDispatch<StoreType["dispatch"]>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
