import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fork } from "redux-saga/effects";
import { State } from "./services/store";

export enum Category {
  all = "all",
  sport = "sport",
  fun = "fun",
  news = "news",
}

interface InitialState {
  category: keyof typeof Category;
  appLoading: boolean;
}

const initialState: InitialState = {
  category: "all",
  appLoading: false,
};

export const AppSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    categorySelected: (
      state,
      { payload }: PayloadAction<keyof typeof Category>
    ) => {
      state.category = payload;
    },
    appLoaded: (state, { payload }: PayloadAction<boolean>) => {
      state.appLoading = payload;
    },
  },
});

export const AppActions = AppSlice.actions;
const selectAppSlice = (state: State) => state.appSlice;

export const selectAllCategories = () => Object.values(Category);
export const selectChosenCategory = createSelector(
  selectAppSlice,
  (app) => app.category
);

export const selectAppLoading = createSelector(
  selectAppSlice,
  (app) => app.appLoading
);
