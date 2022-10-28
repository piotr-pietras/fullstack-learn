import { combineReducers, configureStore } from "@reduxjs/toolkit";
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
import { RegisterSlice, RegisterSaga } from "../register.store";

function* sagaRoot() {
  yield fork(AppSaga);
  yield fork(LoginSaga);
  yield fork(RegisterSaga);
  yield fork(PostBoardSaga);
}

const request = combineReducers({
  [LoginSlice.name]: LoginSlice.reducer,
  [RegisterSlice.name]: RegisterSlice.reducer,
  [PostBoardSlice.name]: PostBoardSlice.reducer,
});

export const createStore = () => {
  const saga = createSagaMiddleware();

  const store = configureStore({
    reducer: {
      [AppSlice.name]: AppSlice.reducer,
      request,
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
