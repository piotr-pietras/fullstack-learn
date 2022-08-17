import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State } from "../services/store";
interface InitialState {}

const initialState: InitialState = {};

export const AppSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {},
});

export const AppActions = AppSlice.actions;

const selectAppSlice = (state: State) => state.appSlice;
