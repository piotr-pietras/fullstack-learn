import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalList } from "./features/Modals/Modal";
import { State } from "./services/store";

export enum Category {
  all = "all",
  sport = "sport",
  fun = "fun",
  news = "news",
}

interface InitialState {
  category: keyof typeof Category | undefined;
  appLoading: boolean;
  isDrawerOpened: boolean;
  searchValue: string;
  isModalOpened: boolean;
  modalContent: ModalList;
}

const initialState: InitialState = {
  category: "all",
  appLoading: false,
  isDrawerOpened: false,
  searchValue: "",
  isModalOpened: false,
  modalContent: ModalList.register,
};

export const AppSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    categorySelected: (
      state,
      { payload }: PayloadAction<keyof typeof Category | undefined>
    ) => {
      state.category = payload;
    },
    drawerOpened: (state, { payload }: PayloadAction<boolean>) => {
      state.isDrawerOpened = payload;
    },
    appLoaded: (state, { payload }: PayloadAction<boolean>) => {
      state.appLoading = payload;
    },
    searchInputUpdated: (state, { payload }: PayloadAction<string>) => {
      state.searchValue = payload;
    },
    modalOpened: (
      state,
      { payload }: PayloadAction<{ isOpened: boolean; content?: ModalList }>
    ) => {
      state.isModalOpened = payload.isOpened;
      if (payload.content) state.modalContent = payload.content;
    },
  },
});

export const AppActions = AppSlice.actions;

const selectAppSlice = (state: State) => state.appSlice;
export const selectChosenCategory = createSelector(
  selectAppSlice,
  (app) => app.category
);
export const selectAppIsDrawerOpened = createSelector(
  selectAppSlice,
  (app) => app.isDrawerOpened
);
export const selectAppLoading = createSelector(
  selectAppSlice,
  (app) => app.appLoading
);
export const selectSearchValue = createSelector(
  selectAppSlice,
  (app) => app.searchValue
);
export const selectIsModalOpened = createSelector(
  selectAppSlice,
  (app) => app.isModalOpened
);

export const selectModalContent = createSelector(
  selectAppSlice,
  (app) => app.modalContent
);
