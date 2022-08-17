import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { UnitsSlice } from "../stores/units.store";
import { AppSlice } from "../stores/app.store";

export const createStore = () => {
  const store = configureStore({
    reducer: {
      [UnitsSlice.name]: UnitsSlice.reducer,
      [AppSlice.name]: AppSlice.reducer,
    },
  });

  return store;
};

type StoreType = ReturnType<typeof createStore>;

export type State = ReturnType<StoreType["getState"]>;
export const useAppDispatch = () => useDispatch<StoreType["dispatch"]>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
