import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppSlice } from "../app.store";
import {
  PostBoardSaga,
  PostBoardSlice,
} from "../features/PostBoard/post-board.store";
import createSagaMiddleware from "redux-saga";

export const createStore = () => {
  const saga = createSagaMiddleware();

  const store = configureStore({
    reducer: {
      [AppSlice.name]: AppSlice.reducer,
      [PostBoardSlice.name]: PostBoardSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: false }).concat(saga),
  });

  saga.run(PostBoardSaga);

  return store;
};

type StoreType = ReturnType<typeof createStore>;

export type State = ReturnType<StoreType["getState"]>;
export const useAppDispatch = () => useDispatch<StoreType["dispatch"]>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
