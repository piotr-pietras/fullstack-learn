import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State } from "../services/store";

export enum Category {
  all = "all",
  sport = "sport",
  fun = "fun",
  news = "news",
}

interface InitialState {
  category: keyof typeof Category;
}

const initialState: InitialState = {
  category: "all",
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
  },
});

export const AppActions = AppSlice.actions;

const selectAppSlice = (state: State) => state.appSlice;

export const selectAllCategories = () => Object.values(Category);
export const selectChosenCategory = createSelector(
  selectAppSlice,
  (app) => app.category
);
